

import translations from "./translations";


 export const getTranslatedText = (key, locale='fi') => {
   if (translations[key] === undefined) {
      return key;
   }
    let translatedText = translations[key][locale]


    return translatedText;
 }

