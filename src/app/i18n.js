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
      "My movies": "My movies",
      "Log Out": "Log Out",
      Prev: "Prev",
      Next: "Next",
      "Create a new movie": "Create a new movie",
      Title: "Title",
      "Publishing year": "Publishing year",
      Cancel: "Cancel",
      Submit: "Submit",
      "Drop an image here": "Drop an image here",
      "Drop image here": "Drop image here",
      Update: "Update",
      Edit: "Edit",
      "Loggedin Successfully": "Loggedin Successfully",
      "Movie Created Successfully": "Movie Created Successfully",
      "Movie Updated Successfully": "Movie Updated Successfully",
      "Invalid Email Or Password": "Invalid Email Or Password",
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
      "My movies": "Mes films",
      "Log Out": "Se déconnecter",
      Prev: "Précédent",
      Next: "Suivant",
      "Create a new movie": "Créer un nouveau film",
      Title: "Titre",
      "Publishing year": "Année de publication",
      Cancel: "Annuler",
      Submit: "Soumettre",
      "Drop an image here": "Déposez une image ici",
      "Drop image here": "Déposez l'image ici",
      Update: "Mise à jour",
      Edit: "Modifier",
      "Loggedin Successfully": "Connecté avec succès",
      "Movie Created Successfully": "Film créé avec succès",
      "Movie Updated Successfully": "Film mis à jour avec succès",
      "Invalid Email Or Password": "Email ou mot de passe invalide",
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
