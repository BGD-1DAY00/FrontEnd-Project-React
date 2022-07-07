
import {GET_USERLIST, LOGIN_SUCCESS} from "./actions";

import {CREATE_USER_FAILED, CREATE_USER_SUCCESS, LOGIN_SUCCESS} from "./actions";



const initLogin = {
    role: null,
    token: null
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

const initCreateUser = {
    createUserMessage: ''
}

export function admin(state = initCreateUser, action) {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserMessage: 'You successfully added a user',
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                createUserMessage: 'User already exists'
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