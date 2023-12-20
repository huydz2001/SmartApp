import { ActionsTypes } from "../constants/action-type"
import { getUserById, saveImage } from "../../../api/userAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
global.atob = decode;
import { jwtDecode } from "jwt-decode";




export const fetchUsers = () => async (dispatch) => {
    const token = await AsyncStorage.getItem("AccessToken");
    const decodedToken = jwtDecode(token);
    await getUserById(decodedToken.UserId).then((result) => {
        console.log(result.data)
        const { userId, name, age, contact, dob, image, role } = result.data;
        const { email, phone } = contact;
        const infor = {
            id: userId,
            name: name,
            age: age,
            email: email,
            phone: phone,
            dob: dob,
            image: image,
            role: role
        };
        dispatch({ type: ActionsTypes.FETCH_USERS, payload: infor })
    })
};


export const setUser = (user) => {
    return {
        type: ActionsTypes.SET_USER,
        payload: user
    }
}

export const updateImage = (newImage) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("AccessToken");
        const decodedToken = jwtDecode(token)
        await saveImage(newImage, decodedToken.UserId)
            .then((result) => {
                dispatch({type: ActionsTypes.UPDATE_IMAGE, payload: result.data})
            })
    }
    catch(error){
        console.log(error)
    }

    // console.log("new image", newImage)
    // return {
    //     type: ActionsTypes.UPDATE_IMAGE,
    //     payload: newImage
    // }
}



