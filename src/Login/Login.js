import {useState} from "react";
import {useDispatch} from 'react-redux';
export function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('');

    //const dispatch = useDispatch();
    function addUsername(e){
        setUsername(e.target.value);
    }
    function addPassword(e){
        setPassword(e.target.value);
    }
    function addUser(e){
      e.preventDefault()
    }
    function handleRole(e){
        setRole(e.target.value)
    }

    return(
        <>
            <form onSubmit={addUser}>
                <label>Username:
                <input onChange={addUsername} value={username} placeholder="username" type='text' />
                </label>

                <label>Password:
                <input onChange={addPassword} value={password} placeholder="password" type='text' />
                </label>


                <input type="radio" onChange={handleRole} name="role" value="applicant" /> Applicant
                <input type="radio" onChange={handleRole} name="role" value="recruiter" /> Recruiter
                <input type="radio" onChange={handleRole} name="role" value="admin" />  Admin

                <button  type='submit'>Submit</button>
            </form>
        </>
    );
}