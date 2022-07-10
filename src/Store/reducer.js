
import {
    CREATE_USER_FAILED,
    CREATE_USER_SUCCESS,
    GET_QUIZ_LIST,
    GET_USERLIST,
    LOGIN_SUCCESS,
    CREATE_QUIZ,
    EDITING,
    QUIZ_EDITING,
    STOP_QUIZ_EDITING,

    IMPERSONATING,
    LOGIN_IMPERSONATE_SUCCESS,
    LOGIN_IMPERSONATE_FAILURE,
    ADMIN_IMPERSONATE_SUCCESS,
    EDIT_SUCCESS,
    GO_HOME,
    GO_TO_ADMIN,
    SELECT_DEFAULT,
    EDIT_FAILURE

} from "./actions";



const initLogin = {
    role: null,
    token: null,
    impersonateFailure: false,
    currentUser: null,
}
export function login(state = initLogin, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                role: action.role,
                currentUser: action.currentUser
            }
        case LOGIN_IMPERSONATE_SUCCESS:
            return {
                ...state,
                role: action.role,
                impersonateFailure: false
            }
        case LOGIN_IMPERSONATE_FAILURE:
            return {
                ...state,
                impersonateFailure: true
            }
        case GO_HOME:
            return{
                ...state,
                role: null
            }
        // case GO_TO_ADMIN:
        //     return{
        //         ...state,
        //         role: "admin"
        //     }
        default:
            return{
                ...state
            }
    }
}

const initCreateUser = {
    createUserMessage: '',
    editing: null,
    impersonating: null,
    selectedUser: null,
    optionSelected: null,
    editFailed: null
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
        case EDITING:
            return {
                ...state,
                editing: true,
                selectedUser: action.selectedUser
            }
        case EDIT_SUCCESS:
            return {
                ...state,
                editing: false,
                selectedUser: null
            }
        case EDIT_FAILURE:
            return {
                ...state,
                editing: false,
                selectedUser: null,
                editFailed: true
            }
        case IMPERSONATING:
            return {
                ...state,
                impersonating: true,
                selectedUser: action.selectedUser
            }
        case ADMIN_IMPERSONATE_SUCCESS:
            return {
                ...state,
                impersonating: null,
                selectedUser: null
            }
        case SELECT_DEFAULT:return{
            ...state,
            optionSelected: action.select
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

const initQuiz = {
    quizList: [],
    quizEditing: false,
    selectedQuiz: null
}

export function quiz(state = initQuiz, action) {
    switch(action.type) {
        case GET_QUIZ_LIST:
            return {
                ...state,
                quizList: action.quizList
            }
        case CREATE_QUIZ:
            return{
                ...state,
                quizList: [...state.quizList, action.quiz]
            }
        case QUIZ_EDITING:
            return {
                ...state,
                quizEditing: true,
                selectedQuiz: action.selectedQuiz
            }
        case STOP_QUIZ_EDITING:
            return {
                ...state,
                quizEditing: false,
                selectedQuiz: null
            }
        default:
            return {
                ...state
            }
    }
}