import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../Store/reduxFunctions";

export function CreateComponent() {

    let {token, createUserMessage} = useSelector(state => ({
        token: state.login.token,
        createUserMessage: state.admin.createUserMessage
    }))

    const newUser = {
        username: '',
        password: '',
        applicantRole: false,
        recruiterRole: false,
        adminRole: false
    }

    const [formState, setFormState] = useState(newUser)

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [checked, setChecked] = useState(false)
    // console.log(checked)
    const dispatch = useDispatch();

    function updateUsername(e){
        setFormState({
            ...formState,
            username: e.target.value
        })
    }
    function updatePassword(e){
        setFormState({
            ...formState,
            password: e.target.value
        })
    }
    function updateApplicantRole() {
        setFormState({
            ...formState,
            applicantRole: !formState.applicantRole
        })
    }
    function updateRecruiterRole() {
        setFormState({
            ...formState,
            recruiterRole: !formState.recruiterRole
        })
    }
    function updateAdminRole() {
        setFormState({
            ...formState,
            adminRole: !formState.adminRole
        })
    }
    function addUser(e) {
        e.preventDefault()
        dispatch(createUser({formState: formState, token: token}))
    }

    console.log(formState)

    return (
        <>
            <form onSubmit={addUser}>
                <label>Username:
                    <input onChange={updateUsername} value={formState.username} placeholder="username" type='text' />
                </label>
                <label>Password:
                    <input onChange={updatePassword} value={formState.password} placeholder="password" type='text' />
                </label>

                <input type="checkbox" onChange={updateApplicantRole} checked={formState.applicantRole} /> Applicant
                <input type="checkbox" onChange={updateRecruiterRole} checked={formState.recruiterRole} /> Recruiter
                <input type="checkbox" onChange={updateAdminRole} checked={formState.adminRole} />  Admin

                <button  type='submit'>Submit</button>

                {createUserMessage && <div>{createUserMessage}</div>}
                </form>
        </>   )
}