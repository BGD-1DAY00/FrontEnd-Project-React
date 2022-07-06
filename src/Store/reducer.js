import {LOGIN_SUCCESS} from "./actions";


const initLogin = {
    role: 'admin',
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