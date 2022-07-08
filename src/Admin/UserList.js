import {useEffect, useState} from "react";
import {deleteUser, getUserList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {EDITING, IMPERSONATING} from "../Store/actions";

export function UserList() {

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getUserList());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let userList = useSelector(state => state.user.userList)
    const [formState, setFormState] = useState({user: userList[0]})

    console.log(userList)
    console.log(userList[0])

    function onChangeUser(e) {
        setFormState({
            ...formState,
            user: e.target.value
        })
    }

    function dlUser(e) {
        dispatch(deleteUser(formState))
    }

    console.log(formState)

    function handleForm(e) {
        e.preventDefault();
    }


    function editUser() {
        if (formState.user === undefined || formState.user === 'Please select a user') {
            return;
        } else {
            const selectedUser = userList.filter(s => s.username === formState.user)
            dispatch({type: EDITING, selectedUser: selectedUser})
        }
}

    function impersonateUser() {
        if (formState.user === undefined || formState.user === 'Please select a user') {
            return;
        } else {
            const selectedUser = userList.filter(s => s.username === formState.user)
            // console.log(selectedUser)
            dispatch({type: IMPERSONATING, selectedUser: selectedUser})
        }
    }

    return (
        <>
            <h2>User List</h2>
            <form onSubmit={handleForm}>
                <select onChange={onChangeUser}>
                    <option>Please select a user</option>
                    {userList.map((user, idx) => {
                            return <option key={idx} value={user.username}>
                                {user.username}
                            </option>
                        }
                    )}}
                </select>
                <button onClick={(e) => {editUser(e)}}>Edit</button>
                <button onClick={(e) => {dlUser(e)}}>Delete</button>
                <button onClick={impersonateUser}>Impersonate</button>

                {/*{user && <h3>Please select a user</h3>}*/}
            </form>
        </>
    )
}