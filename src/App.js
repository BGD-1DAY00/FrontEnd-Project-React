
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
                <div style={{backgroundColor: 'seagreen'}}><h1>Applicant</h1></div>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 10, right: 0}}>
                    <button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>
                </div>
                <Applicant />
            </>
        )
    }
    if(role === 'recruiter'){

        return <>
            <div style={{}}>
                <h1>Recruiter</h1>
            </div>
            <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 10, right: 0}}>
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
            <div style={{backgroundColor: 'lightblue'}}><font color="blue"><h1>Admin Page</h1></font></div>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 10, right: 0}}>
                    <button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button></div>
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
