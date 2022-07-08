import {useEffect} from "react";
import {getQuizList, getUserList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";

export function Applicant(){

const dispatch =useDispatch()
    const quizList =useSelector(state=>state.quiz.quizList)

    useEffect(() => {
        dispatch(getUserList())
        dispatch(getQuizList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(quizList)
    const filteredList =quizList.filter(s =>s.finished === false && s.grade === "")
    console.log(filteredList)
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