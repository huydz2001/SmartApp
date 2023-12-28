import { ActionsTypes } from "../constants/action-type"

const initialSate = {
    home: {
        id: "",
        createBy: "",
        name: "",
        slogan: "",
        members: "",
        image: "",
        isPublic: ""
    }
}

export const homeReducer = (state = initialSate, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_HOME:
            return {
                ...state,
                home: payload
            }
            break
        case ActionsTypes.FETCH_HOME:
            return {
                ...state,
                home: payload
            }
            break
        case ActionsTypes.REMOVE_HOME:
            return {
                ...state,
                home: {
                    id: "",
                    createBy: "",
                    name: "",
                    slogan: "",
                    members: "",
                    image: "",
                    isPublic: ""
                }
            }
            break
        case ActionsTypes.UPDATE_IMAGE:
            return {
                ...state,
                home: {
                    ...state.home,
                    image: payload
                }
            }
            break
        case ActionsTypes.ADD_MEMBER:
            return {
                ...state,
                home: {
                    ...state.home,
                    members: [...state.home.members, payload]
                }
            }
        default:
            return state;
    }
}