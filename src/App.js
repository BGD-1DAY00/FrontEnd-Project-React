
import './App.css';
import {Login} from './Login/Login';
import {useSelector} from "react-redux";
import {Applicant} from "./Applicant/Applicant";
import {Recruiter} from "./Recruiter/Recruiter";
import {Admin} from "./Admin/Admin";
import {GO_HOME} from "./Store/actions";
import {useDispatch}  from "react-redux";


function App() {
    const role = useSelector(state => state.login.role)
    const userList = useSelector(state => state.user.userList)
    const dispatch = useDispatch()
    if(role === 'applicant'){
        return (
            <>
                <div style={{display: 'flex', justifyContent: "space-evenly"}}>
                    <h1>Applicant</h1>
                    <button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>
                </div>
                <Applicant />
            </>
        )
    }
    if(role === 'recruiter'){

        return <>
            <div style={{display: 'flex', justifyContent: "space-evenly"}}>
                <h1>Recruiter</h1>
                <button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>
            </div>

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
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <div><font color="blue"><center><h1>Admin Page</h1></center></font></div>
                <button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>
            </div>
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
