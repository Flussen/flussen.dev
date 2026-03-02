export type Locale = "en" | "es" | "de";

export const translations = {
  en: {
    "About me": "About me",
    Skills: "Skills",
    "Work Experience": "Work Experience",
    Education: "Education",
    Projects: "Projects",
    Languages: "Languages",
  },
  es: {
    "About me": "Sobre mí",
    Skills: "Habilidades",
    "Work Experience": "Experiencia Laboral",
    Education: "Educación",
    Projects: "Proyectos",
    Languages: "Idiomas",
  },
  de: {
    "About me": "Über mich",
    Skills: "Fähigkeiten",
    "Work Experience": "Berufserfahrung",
    Education: "Bildung",
    Projects: "Projekte",
    Languages: "Sprachen",
  },
} as const;

export function getTranslation(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale][key] || key;
}

export function getLocaleFromPath(path: string): Locale {
  const match = path.match(/^\/(en|es|de)/);
  return (match?.[1] as Locale) || "en";
}
