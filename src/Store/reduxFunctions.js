import {
	LOGIN_SUCCESS,
	LOGIN_REQUEST,
	LOGIN_FAIL,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	GET_USERLIST,
    GET_QUIZ_LIST, 
    CREATE_QUIZ
} from "./actions";


export function initiateLogin(cred) {
	return async function sideEffect(dispatch) {
		//sending data --> POST request
		// send it within the params
		// send it with the body
		dispatch({type: LOGIN_REQUEST})

		try {
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
		} catch (e) {
			dispatch({type: LOGIN_FAIL})
		}
	}
}

export function getUserList() {
	return async function sideEffect(dispatch) {
		//sending data --> POST request
		// send it within the params
		// send it with the body
		try {
			const response = await fetch("http://localhost:8080/getUserList")
			const data = await response.json();
			console.log(data);
			dispatch({type: GET_USERLIST, userList: data})
		} catch (e) {
		}
	}
}

export function createUser(cred) {
	return async function sideEffect(dispatch) {
		console.log(cred)
		console.log(cred.formState)
		try {
			const response = await fetch(`http://localhost:8080/createUser?token=${cred.token}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json', // willing to accept
					'Content-Type': 'application/json' //defining what we are sending
				},
				body: JSON.stringify(cred.formState)
			})
			if (response.ok)
				dispatch({type: CREATE_USER_SUCCESS})
			else
				dispatch({type: CREATE_USER_FAILED})
		} catch (e) {}
	}
}

export function initiateCreateQuiz(quiz) {
    return async function sideEffect(dispatch) {
        dispatch({type: CREATE_QUIZ})
        try {
            const response = await fetch("http://localhost:8080/createQuiz", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(quiz)
            })
        } catch (e) {console.log(e)}
    }
}

export function getQuizlist(){
    return async function sideEffect(dispatch, getState){
        try{
            const response = await fetch("http://localhost:8080/getQuizlist")
            const data = await response.json();
            console.log(data);
            dispatch({type: GET_QUIZ_LIST, quizList: data})
        }catch(e){
        }
    }
}