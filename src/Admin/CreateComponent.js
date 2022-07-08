import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUser, editUser, impersonateUser} from "../Store/reduxFunctions";

export function CreateComponent() {

    let {token,
        createUserMessage,
        editing,
        selectedUser,
        impersonating,
        impersonateFailure
    } = useSelector(state => ({
        token: state.login.token,
        createUserMessage: state.admin.createUserMessage,
        editing: state.admin.editing,
        selectedUser: state.admin.selectedUser,
        impersonating: state.admin.impersonating,
        impersonateFailure: state.login.impersonateFailure
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
    const [impState, setImpState] = useState()

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [checked, setChecked] = useState(false)
    // console.log(checked)
    const dispatch = useDispatch();

    // console.log(editState)
    console.log(impState)

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
        // if (impersonating) {
        //     setImpState({
        //         ...impState,
        //         applicant: !impState.applicant
        //     })
        // } else
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
        // if (impersonating) {
        //     setImpState({
        //         ...impState,
        //         recruiter: !impState.recruiter
        //     })
        // } else
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
        // if (impersonating) {
        //     setImpState({
        //         ...impState,
        //         admin: !impState.admin
        //     })
        // } else
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
        if(formState.username === "") {
            return
        }
        dispatch(createUser({formState: formState, token: token}))
    }

    function onEditSubmit(e){
        e.preventDefault()
        if(editState.username === "") {
            return
        }
        dispatch(editUser(editState, selectedUser[0].username))
    }

    function handleRole(e){
        setImpState(e.target.value)
    }

    function onImpSubmit(e) {
        e.preventDefault();
        dispatch(impersonateUser(selectedUser[0].username, impState))
    }

    if (impersonating) {
        return <>
            <h2>Impersonate</h2>
            <form onSubmit={onImpSubmit}>
                <label>Username:
                    <input required value={selectedUser[0].username} type='text' disabled={true}/>
                </label>
                <label>Password:
                    <input value={selectedUser[0].password} type='text' disabled={true}/>
                </label>

                <input type="radio" onChange={handleRole} name="role" value="applicant"/> Applicant
                <input type="radio" onChange={handleRole} name="role" value="recruiter"/> Recruiter
                <input type="radio" onChange={handleRole} name="role" value="admin"/>  Admin

                <button  type='submit'>Submit</button>

                {impersonateFailure && <h3>Person you are trying to impersonate does not exist or have that role</h3>}

            </form>
        </>
    }

    console.log(selectedUser)
if (editing) {
    console.log(editState)
    return <>
        <h2>Edit</h2>
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
            <h2>Create</h2>
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