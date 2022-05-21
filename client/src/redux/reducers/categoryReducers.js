import { GET_CATEGORIES } from "../constants/categoryConstants"

const INITIAL_STATE = {
    categories: []
}

export const categoryReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}