import {LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAIL} from "./actions";

export function initiateLogin(cred){
    return async function sideEffect(dispatch, getState){
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
            dispatch({type: LOGIN_SUCCESS})
        }catch(e){
            dispatch({type:LOGIN_FAIL})
        }
    }

}