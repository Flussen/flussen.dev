package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
)

type SteamResponse struct {
	Response struct {
		PublishedFileDetails []struct {
			PublishedFileID string `json:"publishedfileid"`
			Title           string `json:"title"`
			PreviewUrl      string `json:"preview_url"`
			Subscriptions   int    `json:"subscriptions"`
			Favorited       int    `json:"favorited"`
			Views           int    `json:"views"`
		} `json:"publishedfiledetails"`
	} `json:"response"`
}

func getModInfo(w http.ResponseWriter, r *http.Request) {
	apiURL := "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/"
	modID := "3257405296"

	data := url.Values{}
	data.Set("itemcount", "1")
	data.Set("publishedfileids[0]", modID)

	resp, err := http.Post(apiURL, "application/x-www-form-urlencoded", strings.NewReader(data.Encode()))
	if err != nil {
		http.Error(w, "Error al obtener la información del mod", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Error al leer la respuesta de la API", http.StatusInternalServerError)
		return
	}

	var steamResp SteamResponse
	if err := json.Unmarshal(body, &steamResp); err != nil {
		http.Error(w, "Error al parsear la respuesta JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(steamResp.Response.PublishedFileDetails[0])
}

func main() {
	http.HandleFunc("/api/mod-info", getModInfo)

	fmt.Println("Servidor escuchando en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
