import { useState, useEffect } from "react";
import { Languages as LanguagesIcon, ChevronDown, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Detectar idioma de la URL
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(en|es|de)/);
    if (langMatch) {
      setCurrentLang(langMatch[1]);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.split("-")[0];
      if (["en", "es", "de"].includes(browserLang)) {
        setCurrentLang(browserLang);
      }
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(en|es|de)/, `/${langCode}`);

    // Si no hay idioma en la ruta, agregar el nuevo
    if (newPath === currentPath) {
      window.location.href = `/${langCode}`;
    } else {
      window.location.href = newPath;
    }

    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative z-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/60 backdrop-blur px-3 py-2
                   text-sm font-medium text-foreground shadow-sm transition-all hover:bg-card/80 hover:border-border/80"
        aria-label="Select language"
      >
        <LanguagesIcon className="h-4 w-4" />
        <span className="inline-flex sm:hidden">{currentLanguage.code.toUpperCase()}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-48 origin-top-right z-20
                       rounded-lg border border-border/60 bg-card/95 backdrop-blur-lg shadow-lg
                       ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm
                             transition-colors
                             ${
                               currentLang === lang.code
                                 ? "bg-primary/10 text-primary font-medium"
                                 : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                             }`}
                >
                  <span className="font-mono text-xs font-bold text-muted-foreground">
                    {lang.code.toUpperCase()}
                  </span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {currentLang === lang.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
