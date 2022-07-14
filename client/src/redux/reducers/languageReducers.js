import { CHANGE_LANGUAGE } from "../constants/languageConstants"
  
  const INITIAL_STATE = {
    language: 'fi',
  };
  
  const languageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CHANGE_LANGUAGE:
        return {
          language: action.payload
        };
      default:
        return state;
    }
  };
  
  export default languageReducer;