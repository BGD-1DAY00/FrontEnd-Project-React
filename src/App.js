
import './App.css';
import {Login} from './Login/Login';
import {useSelector} from "react-redux";
import {Applicant} from "./Applicant/Applicant";
import {Recruiter} from "./Recruiter/Recruiter";
import {Admin} from "./Admin/Admin";


function App() {
    const role = useSelector(state => state.login.role)
    const userList = useSelector(state => state.user.userList)

    if(role === 'applicant'){
        return (
            <Applicant />
        )
    }
    if(role === 'recruiter'){

        return <>
            <h1>Recruiter</h1>
            <Recruiter />
        </>
    }
    if(role === 'Admin'){
        //return <Admin />

        //return <Recruiter />
    }
    if(role === 'admin'){
        return <>
            {/*<h1>Admin page</h1>*/}
            <div><font color="blue"><center><h1>Admin Page</h1></center></font></div>
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
