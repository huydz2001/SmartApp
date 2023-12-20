import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
    userInfor: userReducer,
})

export default reducers;