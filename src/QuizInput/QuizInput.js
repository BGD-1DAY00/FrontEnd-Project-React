

// Drop down - applicant - who's being assigned the quiz
// Input - Question? (title like)
// Buttons - Create quiz/template

import {editQuiz, editUser, getQuizList, getUserList, initiateCreateQuiz} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

export function QuizInput() {

    let newQuiz = {
            quizQuestion: "",
            grade: "",
            finished: false,
            applicant: ""
        }


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserList())
    }, [])
    let {userList, quizEditing, selectedQuiz} = useSelector(state => ({
        userList: state.user.userList,
        quizEditing: state.quiz.quizEditing,
        selectedQuiz: state.quiz.selectedQuiz
    }) )

    if (selectedQuiz) {
        newQuiz = selectedQuiz
    }
    const [formState, setFormState] = useState(newQuiz)

    function onFormSubmit(e) {
        e.preventDefault()
        //dispatch
        // dispatch(initiateCreateQuiz(formState.quizQuestion, formState.applicant, formState.finished, formState.grade))
        if(!quizEditing) {
            dispatch(initiateCreateQuiz(formState))
        }
        else {
            dispatch(editQuiz(formState, selectedQuiz[0].quizQuestion, selectedQuiz[0].applicant))
        }
        dispatch(getQuizList())
    }


    function onQuestionChange(e) {
        setFormState({
            ...formState,
            quizQuestion: e.target.value
        })
    }

    function onGradeChange(e) {
        setFormState({
            ...formState,
            grade: e.target.value
        })
    }

    function onFinishedChange(e) {
        setFormState({
            ...formState,
            finished: e.target.checked
        })
    }

    function onApplicantChange(e) {
        setFormState({
            ...formState,
            applicant: e.target.value
        })
    }

    return<>
        <form onSubmit={onFormSubmit}>
            <label>
                Question:
                <input onChange={onQuestionChange} value={formState.quizQuestion} type={'text'} placeholder={"Question"}/>
            </label>
            <label>
                Grade:
                <input onChange={onGradeChange} value={formState.grade} type={'text'} placeholder={"Grade"}/>
            </label>

            <label>
                Finished:
                <input onChange={onFinishedChange} checked={formState.finished} type={'checkbox'}/>
            </label>

            <label>
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
            </label>

            <button>Submit</button>
        </form>
    </>
}