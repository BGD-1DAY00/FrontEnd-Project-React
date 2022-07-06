import {GET_USERLIST, LOGIN_SUCCESS} from "./actions";


const initLogin = {
    role: null,
    token: null,
}
export function login(state = initLogin, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
            ...state,
            token: action.token,
            role: action.role
        }
        default:
            return{
                ...state
            }
    }
}

const initUser = {
    userList: [],
}

export function user(state = initUser, action) {
    switch(action.type) {
        case GET_USERLIST:
            return {
                ...state,
                userList: action.userList
            }
        default:
            return {
                ...state
            }
    }
}