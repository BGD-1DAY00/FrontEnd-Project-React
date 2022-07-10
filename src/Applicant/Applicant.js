import {useEffect, useState} from "react";
import {findSpecificUser, getQuizList, getUserList, answerQuiz} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {GO_HOME} from "../Store/actions";

export function Applicant(){

    const quizAnswer = {
        quizAnswer: "",
    }

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

    //on submit button in progress for applicant to update quiz answer on submit.

    // let {selectedQuiz} = useSelector(state => ({
    //     selectedQuiz: state.quiz.selectedQuiz
    // }) )

    const [formState, setFormState] = useState('')

    console.log(formState)

    function Answer(e,s) {
        e.preventDefault()
        dispatch(answerQuiz(formState.toString(), s))
        setFormState('')
        // console.log("answer" + selectedQuiz)
    }

    function onAnswerChange(e) {
        setFormState(e.target.value)
    }

    console.log(filteredList)

    return(
        <>
            <div>
                <h2>Quiz to take</h2>
            </div>

            {filteredList.filter(s =>s.finished === false).map((p)=>{
                return <div key={p.id} style={{marginBottom: '1rem'}}>
                    <div style={{margin: '1rem', display:'inline'}}>{p.quizQuestion}</div>
                    {/*//this is part of the onsubmit functionality*/}
                    <input onChange={onAnswerChange}
                           // value={formState.quizAnswer}
                           type={'text'}/>
                    <button onClick = {(e) => Answer(e, p.id)} type={"button"}>Submit</button> <br />
                    </div>
            })}
             <h2>Completed Quiz</h2>
            {filteredList.filter(s =>s.finished === true ).map((s)=>{
                return <div key = {s.id}>
                    {s.quizQuestion}
                    {s.grade}
                    {s.finished? "finished" : "incomplete"}

                </div>
            })}
        </>
    )
}