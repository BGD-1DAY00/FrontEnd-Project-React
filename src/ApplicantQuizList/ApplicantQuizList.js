import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getQuizList, getUserList} from "../Store/reduxFunctions";
import {useState} from "react";
import {Card, Dropdown} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";


export function ApplicantQuizList () {
    const quizList =useSelector(state=>state.quiz.quizList)
    //filter the quizlist through the current User
    const dispatch = useDispatch()
    const userList = useSelector(state => state.user.userList)


    const [formState, setFormState] = useState("")
    //user
    useEffect(() => {
        const interval = setInterval ( () => {
            dispatch(getUserList());
            dispatch(getQuizList());
    }, 30000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
    console.log(quizList)

    function onApplicantChange(e) {
        setFormState({
            ...formState,
            applicant: e.target.value
        })
    }

    const filteredList = quizList.filter(s=>s.applicant === formState.applicant)
    return(
        <>
            <Card className={'m-2 col p-2'}>
                <CardHeader className={'h2 text-center'}>Quizzes by Applicant</CardHeader>
            <Dropdown className={'m-2'}>
                Applicant:
                <select onChange={onApplicantChange} defaultValue={"Applicant"}>
                    <option key={"applicant"} value={"Applicant"} disabled>
                        Applicant
                    </option>
                    {
                        userList.map((user, idx) => {
                            if (user.applicant) {
                                return <option key={"quizInput" + idx} value={user.username}>
                                    {user.username}
                                </option>
                            }
                        })
                    }
                </select>
            </Dropdown>



            <h2>Quizzes Assigned</h2>

            {filteredList.filter(s =>s.finished === false).map((s)=>{
                return <>
                    <Card style={{color:'seagreen', backgroundColor:'antiquewhite'}} className={'d-flex float-start w-25 p-2 m-1'} border={'secondary'} >
                        <span>Quiz: {s.quizQuestion}</span>
                        <span>Grade: {s.grade ?  s.grade : "not graded"}</span>
                        <span>Status: {s.finished? "completed" : "incomplete"}</span>

                    </Card>
                </>
                {/*<div style={{marginBottom: '1rem'}}>*/}
                {/*    <div style={{margin: '1rem', display:'inline'}}>{s.quizQuestion}</div>*/}
                {/*</div>*/}
            })}


                <h2>Completed Quizzes</h2>
            {filteredList.filter(s =>s.finished === true ).map((s)=>{
                return <>
                <Card style={{color:'seagreen', backgroundColor:'antiquewhite'}} className={'d-flex float-start w-25 p-2 m-1 '} border={'secondary'} >
                    <span>Quiz: {s.quizQuestion}</span>
                    <span>Grade: {s.grade ?  s.grade : "not graded"}</span>
                    <span>Status: {s.finished ? "completed" : "incomplete"}</span>

                </Card>
                </>
            })}

            </Card>
        </>

    )
}