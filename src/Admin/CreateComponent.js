import {useState} from "react";
import {useDispatch} from "react-redux";

export function CreateComponent() {

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
    //const dispatch = useDispatch();

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
                </form>
        </>   )
}