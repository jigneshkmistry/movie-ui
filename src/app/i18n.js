import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources (example)
const resources = {
  en: {
    translation: {
      "Sign In": "Sign In",
      Information: "Information",
      Email: "Email",
      Password: "Password",
      "Remember Me": "Remember Me",
      Login: "Login",
      "Error loading movies. Please try again later.":
        "Error loading movies. Please try again later.",
    },
  },
  fr: {
    translation: {
      "Sign In": "Se connecter",
      Information: "Information",
      Email: "Courriel",
      Password: "Mot de passe",
      "Remember Me": "Souviens-toi de moi",
      Login: "Se connecter",
      "Error loading movies. Please try again later.":
        "Erreur lors du chargement des films. Veuillez réessayer plus tard.",
    },
  },
};

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // language to use, or auto detect from browser
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
