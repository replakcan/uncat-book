import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import UncatReducer from "./reducers/uncatReducer";

const rootReducer = combineReducers({
  uncat: UncatReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
