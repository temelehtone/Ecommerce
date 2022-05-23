import { GET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT } from "../constants/productConstants"

const INITIAL_STATE = {
    products: []
}

const productReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload] 
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p => p._id !== action.payload)
            }
        default:
            return state;
    }
}

export default productReducer