import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loadingReducers";
import categoryReducer from "./reducers/categoryReducers";
import messageReducer from "./reducers/messageReducers";
import productReducer from "./reducers/productReducers";
import filterReducer from "./reducers/filterReducers";

const reducer = combineReducers({
  loading: loadingReducer,
  categories: categoryReducer,
  messages: messageReducer,
  products: productReducer,
  filters: filterReducer,
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({ reducer, initialState, middleware });

export default store;
