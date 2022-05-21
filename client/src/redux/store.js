import { combineReducers} from "redux"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import loadingReducer from "./reducers/loadingReducers"
import categoryReducer from "./reducers/categoryReducers"


const reducer = combineReducers({
    loading: loadingReducer,
    categories: categoryReducer,
})

const initialState = {}

const middleware = [thunk]

const store = configureStore({reducer, initialState, middleware })

export default store
