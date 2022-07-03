import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE } from "../constants/messageConstants";
import { ADD_TO_CART } from "../constants/cartConstants"


export const addToCart = (product) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const duplicates = cart.filter(cartItem => cartItem._id === product._id);
        
        if (duplicates.length === 0) {
            const productToAdd = {
                ...product,
                count: 1,
            }
            cart.push(productToAdd);
            // Add cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Add cart to redux
            dispatch({ type: ADD_TO_CART, payload: cart });
        } else {
            
        }

        
        dispatch({ type: STOP_LOADING });
      } catch (error) {
        console.log("addToCart api error:", error)
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
          });
        dispatch({ type: STOP_LOADING })
      }

}