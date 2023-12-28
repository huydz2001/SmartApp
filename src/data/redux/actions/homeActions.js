import { ActionsTypes } from "../constants/action-type"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
global.atob = decode;
import { jwtDecode } from "jwt-decode";
import { getHomeByUserId } from "../../../api/userAPI";
import { addMemberApi } from "../../../api/homeAPI";

export const setHome = (home) => {
    return {
        type: ActionsTypes.SET_HOME,
        payload: home
    }
}

export const deleteHome = ()=> {
    return {
        type: ActionsTypes.REMOVE_HOME,
        payload: null
    }
}
 
export const addMemberStore = (homeId,member) => async (dispatch) => {
    await addMemberApi(homeId,member).then((result) => {
        if(result.status == 200){
            dispatch({type: ActionsTypes.ADD_MEMBER, payload: member})
        }
    })
}



export const fetchHome = () => async (dispatch) => {
    const token = await AsyncStorage.getItem("AccessToken");
    const decodedToken = jwtDecode(token);
    await getHomeByUserId(decodedToken.UserId).then((result) => {
        const { homeId, createBy, name, slogan, members, image, isPublic } = result.data[0];
        const home = {
            id: homeId,
            createBy: createBy,
            name: name,
            slogan: slogan,
            members: members,
            image: image,
            isPublic: isPublic
        }
        dispatch({ type: ActionsTypes.FETCH_HOME, payload: home })
    })
};

