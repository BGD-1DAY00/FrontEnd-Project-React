import {useEffect} from "react";
import {findSpecificUser, getQuizList, getUserList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";

export function Applicant(){

const dispatch =useDispatch()
    const quizList =useSelector(state=>state.quiz.quizList)
    //filter the quizlist through the current User
    const currentUser = useSelector(state=>state.login.currentUser)
    const filteredList = quizList.filter(s=>s.applicant === currentUser)
    //user
    useEffect(() => {
        dispatch(getUserList())
        dispatch(getQuizList())
        // dispatch(findSpecificUser(token))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(quizList)

    return(
        <>
            <h2>Quiz to take</h2>

            {filteredList.filter(s =>s.finished === false).map((s)=>{
                return <div style={{marginBottom: '1rem'}}>
                    <div style={{margin: '1rem', display:'inline'}}>{s.quizQuestion}</div>
                    <input/>
                    <button  type='submit'>Submit</button> <br />
                    </div>
            })}
             <h2>Completed Quiz</h2>
            {filteredList.filter(s =>s.finished === true ).map((s)=>{
                return <>
                    {s.quizQuestion}
                    {s.grade}
                    {s.finished? "finished" : "incomplete"}

                </>
            })}
        </>
    )
}