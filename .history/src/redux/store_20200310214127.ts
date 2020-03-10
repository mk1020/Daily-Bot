import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { friendsReducer } from "./reducers/friendsReducer";


const reducers = combineReducers({ friendsReducer});

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    // other store enhancers if any
  ));

export default store;