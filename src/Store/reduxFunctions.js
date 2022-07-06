import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED
} from "./actions";
import {useSelector} from "react-redux";




export function initiateLogin(cred){
    return async function sideEffect(dispatch){
        //sending data --> POST request
        // send it within the params
        // send it with the body
        dispatch({type: LOGIN_REQUEST})
        try{
            const response = await fetch("http://localhost:8080/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(cred)

            })
            const data = await response.json();
            console.log(data);
            dispatch({type: LOGIN_SUCCESS, token: data, role: cred?.role})
        }catch(e){
            dispatch({type:LOGIN_FAIL})
        }
    }
}

export function createUser(cred) {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/createuser?token=${cred.token}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(cred.formState)
            })
            dispatch({type: CREATE_USER_SUCCESS})
            // dispatch({type: LOGIN_SUCCESS})
        } catch (e) {
            dispatch({type: CREATE_USER_FAILED})
        }
    }
}