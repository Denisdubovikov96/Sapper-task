import { combineReducers } from "redux";
import { sapperReduser } from "./sapper/reducer";
export default combineReducers({
  sapper: sapperReduser,
});
