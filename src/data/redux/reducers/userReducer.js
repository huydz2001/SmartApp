import { ActionsTypes } from "../constants/action-type"

const initialSate = {
    user: {
        id: "",
        name: "",
        phone: "",
        dob: "",
        image: "",
        age: "",
        emai: "",
        role: "",
    }
}


export const userReducer = (state = initialSate, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_USER:
            return {
                ...state,
                user: payload
            }
            break
        case ActionsTypes.FETCH_USERS:
            return {
                ...state,
                user: payload
            }
            break
        case ActionsTypes.REMOVE_USER:
            return {
                ...state,
                user: {
                    id: "",
                    name: "",
                    phone: "",
                    dob: "",
                    image: "",
                    age: "",
                    emai: "",
                    role: "",
                }
            }
            break

        case ActionsTypes.UPDATE_IMAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    image: payload
                }
            }
            break
        default:
            return state;
    }
}