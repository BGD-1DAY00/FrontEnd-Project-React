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

    let {selectedQuiz} = useSelector(state => ({
        selectedQuiz: state.quiz.selectedQuiz
    }) )

    const [formState, setFormState] = useState(quizAnswer)

    function Answer(e) {
        e.preventDefault()
        dispatch(answerQuiz(formState, selectedQuiz[0].id))
        setFormState(selectedQuiz)
        console.log("answer" + selectedQuiz)
    }

    function onAnswerChange(e) {
        setFormState({
            ...formState,
            quizAnswer: e.target.value
        })
    }

    return(
        <>
            <div>
                <h2>Quiz to take</h2>
            </div>

            {filteredList.filter(s =>s.finished === false).map((s)=>{
                return <div style={{marginBottom: '1rem'}}>
                    <div style={{margin: '1rem', display:'inline'}}>{s.quizQuestion}</div>
                    {/*//this is part of the onsubmit functionality*/}
                    <input onChange={onAnswerChange}
                           value={formState.quizAnswer}
                           type={'text'}/>
                    <button onSubmit={Answer}  type='submit'>Submit</button> <br />
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