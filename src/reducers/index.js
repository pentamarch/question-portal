import { combineReducers } from "redux";
import submitReducer from "./submitReducer";
import urlReducer from "./url";

export default combineReducers({
  submit: submitReducer,
  url: urlReducer,
});
