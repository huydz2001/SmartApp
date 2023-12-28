import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { homeReducer } from "./homeReducer";

const reducers = combineReducers({
    userInfor: userReducer,
    homeInfor: homeReducer
})

export default reducers;