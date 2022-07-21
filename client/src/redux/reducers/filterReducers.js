import { GET_NEW_ARRIVALS, SEARCH_PRODUCTS } from "../constants/filterConstants"

const INITIAL_STATE = {
    newArrivals: []
}

const filterReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NEW_ARRIVALS:
            return {
                newArrivals: [...action.payload]
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                search: action.payload,
              };
        
        default:
            return state;
    }
}

export default filterReducer