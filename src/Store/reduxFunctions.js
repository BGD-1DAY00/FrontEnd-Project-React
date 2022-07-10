import {
	LOGIN_SUCCESS,
	LOGIN_REQUEST,
	LOGIN_FAIL,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	GET_USERLIST,

	GET_QUIZ_LIST,
	STOP_QUIZ_EDITING,


	CREATE_QUIZ,
	LOGIN_IMPERSONATE_FAILURE,
	LOGIN_IMPERSONATE_SUCCESS,
	ADMIN_IMPERSONATE_SUCCESS,
	EDIT_SUCCESS,
	EDIT_FAILURE

} from "./actions";
import {useSelector} from "react-redux";


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
			dispatch({type: LOGIN_SUCCESS, token: data, role: cred?.role, currentUser: cred.username})
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
        // dispatch({type: CREATE_QUIZ})
        try {
            await fetch("http://localhost:8080/createQuiz", {
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


export function getQuizList(){
    return async function sideEffect(dispatch, getState){
        try{
            const response = await fetch("http://localhost:8080/getQuizList")
            const data = await response.json();
            dispatch({type: GET_QUIZ_LIST, quizList: data})
        }catch(e){
        }
    }

}

export function deleteUser(user) {
	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/deleteUser/${user.user}`, {
				method: 'DELETE',
				headers: {
					"Access-Control-Allow-Origin" : "*"
				},
				// body: user
			})
			console.log(await response)
			if (response.ok)
				console.log("delete successful")
			else {
				console.log("delete not successful")
			}
			dispatch(getUserList())
		} catch(e) {
			console.log(e)
		}
	}
}
export function editUser(userObj, username) {

	// new object
	// the username for the user to update
	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/editUser/${username}`, {
				method: 'PUT',
				headers: {
						'Accept': 'application/json', // willing to accept
						'Content-Type': 'application/json', //defining what we are sending
					"Access-Control-Allow-Origin" : "*"


				},
				body: JSON.stringify(userObj)
			})
			console.log(await response)
			if (response.ok) {
				dispatch({type: EDIT_SUCCESS})
			}
			else {
				dispatch({type: EDIT_FAILURE})
				setTimeout(() => {
					dispatch({type: EDIT_SUCCESS})
				}, 3000)
			}
			dispatch(getUserList())
		} catch(e) {
			console.log(e)
		}
	}

}


export function editQuiz(quizObj, id) {

	// new object
	// the username for the user to update
	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/editQuiz/${id}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json', // willing to accept
					'Content-Type': 'application/json', //defining what we are sending
					"Access-Control-Allow-Origin" : "*"
				},
				body: JSON.stringify(quizObj)
			})
			if (response.ok)
				console.log("update successful")
			else {
				console.log("update not successful")
			}
			dispatch(getQuizList())
			dispatch({type: STOP_QUIZ_EDITING})

		} catch(e) {
			console.log(e)
		}
	}

}

export function answerQuiz(quizAnswer, questionID) {

	// new object
	// the username for the user to update

	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/answerQuiz/${questionID}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json', // willing to accept
					'Content-Type': 'application/json', //defining what we are sending
					"Access-Control-Allow-Origin" : "*"
				},
				body: JSON.stringify(quizAnswer)
			})
			if (response.ok)
				console.log("update successful")
			else {
				console.log("update not successful")
			}
			dispatch(getQuizList())

		} catch(e) {
			console.log(e)
		}
	}
}

export function deletingQuiz(id) {
	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/deleteQuiz/${id}`, {
				method: 'DELETE',
				headers: {
					"Access-Control-Allow-Origin" : "*"
				}
			})
			if (response.ok)
				console.log("delete successful")
			else {
				console.log("delete not successful")

			}
			dispatch(getQuizList())
		} catch(e) {
			console.log(e)
		}
	}
}

export function impersonateUser(username, role) {
	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/impersonateUser?username=${username}&role=${role}`)
			console.log(response)
			const data = await response.json();
			console.log(data)
			if (data === true) {
				dispatch({type: LOGIN_IMPERSONATE_SUCCESS, role})
				dispatch({type: ADMIN_IMPERSONATE_SUCCESS})
			} else {
				dispatch({type: LOGIN_IMPERSONATE_FAILURE})
			}
		} catch (e) {
			console.log(e)
		}
	}
}

export function findSpecificUser(token) {
	return async function sideEffect(dispatch) {
		try {
			const response = await fetch(`http://localhost:8080/findUser?token=${token}`)
			const data = await response.json();
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	}
}

