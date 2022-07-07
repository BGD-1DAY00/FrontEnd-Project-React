import {useEffect, useState} from "react";
import {deleteUser, getUserList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {EDITING} from "../Store/actions";

export function UserList() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserList())
    }, [])


    let userList = useSelector(state => state.user.userList)
    const [formState, setFormState] = useState({user: userList[0]})

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
function editUser(e) {
    const selectedUser = userList.filter(s => s.username === formState.user)
    console.log(selectedUser)
    dispatch({type: EDITING, selectedUser: selectedUser})
}
    return (
        <>
            <h2>User List</h2>
            <form onSubmit={handleForm}>
                <select onChange={onChangeUser}>
                    {userList.map((user, idx) => {
                            return <option key={idx} value={user.username}>
                                {user.username}
                            </option>
                        }
                    )}}
                </select>
                <button onClick={(e) => {editUser(e)}}>Edit</button>
                <button onClick={(e) => {dlUser(e)}}>Delete</button>
            </form>
        </>
    )
}