import {useState} from "react";
import {useDispatch} from "react-redux";

export function CreateComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    console.log(checked)
    //const dispatch = useDispatch();

    function addUsername(e){
        setUsername(e.target.value);
    }
    function addPassword(e){
        setPassword(e.target.value);
    }
    function addUser(e) {
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={addUser}>
                <label>Username:
                    <input onChange={addUsername} value={username} placeholder="username" type='text' />
                </label>

                <label>Password:
                    <input onChange={addPassword} value={password} placeholder="password" type='text' />
                </label>


                <input type="checkbox" onChange={() => setChecked(!checked)} checked='applicant' value="applicant" /> Applicant
                <input type="checkbox" onChange={() => setChecked(!checked)} checked='recruiter' value="recruiter" /> Recruiter
                <input type="checkbox" onChange={() => setChecked(!checked)} checked='admin' value="admin" />  Admin

                <button  type='submit'>Submit</button>
                </form>
        </>   )
}