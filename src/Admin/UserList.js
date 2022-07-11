import {useEffect, useRef, useState} from "react";
import {deleteUser, getUserList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {EDITING, IMPERSONATING, SELECT_DEFAULT} from "../Store/actions";
import {Button} from "react-bootstrap";

export function UserList() {

    const dispatch = useDispatch()
    const dropdown = useRef();
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getUserList());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const optionSelected = useSelector(state=>state.admin.optionSelected)
    const userList = useSelector(state => state.user.userList)
    const [formState, setFormState] = useState()

    if(optionSelected){
        dropdown.current.value = "default"
        dispatch({type: SELECT_DEFAULT, select: false})
    }
    function onChangeUser(e) {
        setFormState({
            ...formState,
            user: e.target.value
        })
    }

    function dlUser() {
        dispatch(deleteUser(formState))
        dropdown.current.value = "default"
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
            dispatch({type: IMPERSONATING, selectedUser: selectedUser})
        }
    }

    return (
        <>
            <div><font color="#663399"><h2>User List</h2></font></div>
            <form onSubmit={handleForm}>
                <select ref={dropdown}  onChange={onChangeUser} >
                    <option value="default">Please select a user</option>
                    {userList.map((user, idx) => {
                            return <option key={idx} value={user.username}>
                                {user.username}
                            </option>
                        }
                    )}}
                </select>
                <span className={'ml-2'}><Button onClick={(e) => {editUser()}}
                                                 className={'m-2'}
                                                 size={'sm'}
                                                 // variant={'warning'}
                >Edit</Button></span>
                <span className={'ml-2'}><Button onClick={(e) => {dlUser()}}
                                                 className={'m-2'}
                                                 size={'sm'}
                                                 // variant={'danger'}
                >Delete</Button></span>
                <Button onClick={impersonateUser}>Impersonate</Button>
            </form>
        </>
    )
}