

import translations from "./translations";
import store from "../redux/store";

 export const getTranslatedText = (key) => {

   const state = store.getState();
   const locale = state.language.language;
  
   if (translations[key] === undefined || translations[key][locale] === undefined) {
      return key;
   }
    let translatedText = translations[key][locale]


    return translatedText;
 }

