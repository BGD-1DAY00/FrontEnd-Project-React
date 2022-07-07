
import './App.css';
import {Login} from './Login/Login';
import {useSelector} from "react-redux";
import {Applicant} from "./Applicant/Applicant";
import {Admin} from "./Admin/Admin";

function App() {
    const role = useSelector(state => state.login.role)
    if(role === 'applicant'){
        return (
            <Applicant />
        )
    }
    if(role === 'recruiter'){
        //return <Recruiter />
    }
    if(role === 'admin'){
        return <>
            <h1>Admin page</h1>
            <Admin />
        </>
    }


  return(
      <>
        <Login />
      </>
  )
}

export default App;
