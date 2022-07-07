import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUser, editUser} from "../Store/reduxFunctions";

export function CreateComponent() {

    let {token, createUserMessage, editing, selectedUser} = useSelector(state => ({
        token: state.login.token,
        createUserMessage: state.admin.createUserMessage,
        editing: state.admin.editing,
        selectedUser: state.admin.selectedUser
    }))
    console.log(editing)

    const newUser = {
        username: '',
        password: '',
        applicant: false,
        recruiter: false,
        admin: false
    }

    const [formState, setFormState] = useState(newUser)
	const [editState, setEditState] = useState(newUser)

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [checked, setChecked] = useState(false)
    // console.log(checked)
    const dispatch = useDispatch();

    console.log(editState)

    function updateUsername(e){
        if (editing) {
            setEditState({
                ...editState,
                username: e.target.value
            })
        } else {
            setFormState({
                ...formState,
                username: e.target.value
            })
        }
    }
    function updatePassword(e){
        if (editing) {
            setEditState({
                ...editState,
                password: e.target.value
            })
        } else {
            setFormState({
                ...formState,
                password: e.target.value
            })
        }
    }
    function updateApplicantRole() {
        if (editing) {
            setEditState({
                ...editState,
                applicant: !editState.applicant
            })
        } else {
            setFormState({
                ...formState,
                applicant: !formState.applicant
            })
        }
    }
    function updateRecruiterRole() {
        if (editing) {
            setEditState({
                ...editState,
                recruiter: !editState.recruiter
            })
        } else {
            setFormState({
                ...formState,
                recruiter: !formState.recruiter
            })
        }
    }
    function updateAdminRole() {
        if (editing) {
            setEditState({
                ...editState,
                admin: !editState.admin
            })
        } else {
            setFormState({
                ...formState,
                admin: !formState.admin
            })
        }
    }
    function addUser(e) {
        e.preventDefault()
        dispatch(createUser({formState: formState, token: token}))
    }

    function onEditSubmit(e){
        e.preventDefault()
        dispatch(editUser(editState, selectedUser[0].username))
    }

    console.log(selectedUser)
if (editing) {
    console.log(editState)
    return <>
        <form onSubmit={onEditSubmit}>
            <label>Username:
                <input onChange={updateUsername} value={editState.username} placeholder={selectedUser[0].username} type='text' />
            </label>
            <label>Password:
                <input onChange={updatePassword} value={editState.password} placeholder={selectedUser[0].password} type='text' />
            </label>

            <input type="checkbox" onChange={updateApplicantRole} checked={editState.applicant} /> Applicant
            <input type="checkbox" onChange={updateRecruiterRole} checked={editState.recruiter} /> Recruiter
            <input type="checkbox" onChange={updateAdminRole} checked={editState.admin} />  Admin

            <button  type='submit'>Submit</button>

        </form>
    </>
}
    return (
        <>
            <h2>Create User:</h2>
            <form onSubmit={addUser}>
                <label>Username:
                    <input onChange={updateUsername} value={formState.username} placeholder="username" type='text' />
                </label>
                <label>Password:
                    <input onChange={updatePassword} value={formState.password} placeholder="password" type='text' />
                </label>

                <input type="checkbox" onChange={updateApplicantRole} checked={formState.applicant} /> Applicant
                <input type="checkbox" onChange={updateRecruiterRole} checked={formState.recruiter} /> Recruiter
                <input type="checkbox" onChange={updateAdminRole} checked={formState.admin} />  Admin

                <button  type='submit'>Submit</button>

                {createUserMessage && <div>{createUserMessage}</div>}
                </form>
        </>   )
}