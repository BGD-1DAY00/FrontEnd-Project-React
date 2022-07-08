import {useEffect} from "react";
import {findSpecificUser, getQuizList, getUserList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";

export function Applicant(){

const dispatch =useDispatch()
    const quizList =useSelector(state=>state.quiz.quizList)
    //filter the quizlist through the current User
    const currentUser = useSelector(state=>state.login.currentUser)

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

            {quizList.filter(s =>s.finished === false && s.grade === "").map((s)=>{
                return <>
                    {s.quizQuestion}
                    <input/>
                    <button  type='submit'>Submit</button>
                    </>
            })}
             <h2>Completed Quiz</h2>
            {quizList.filter(s =>s.finished === true || s.grade !== "").map((s)=>{
                return <>
                    {s.quizQuestion}
                    {s.grade}
                    {s.finished? "finished" : "incomplete"}

                </>
            })}
        </>
    )
}