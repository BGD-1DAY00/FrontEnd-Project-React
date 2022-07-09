

// Drop down - applicant - who's being assigned the quiz
// Input - Question? (title like)
// Buttons - Create quiz/template

import {editQuiz, getQuizList, getUserList, initiateCreateQuiz} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {Button, Card, Dropdown, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";

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


    const [formState, setFormState] = useState(newQuiz)
    useEffect(() => {
        if (selectedQuiz) {
            setFormState(selectedQuiz[0])
        } else {
            setFormState(newQuiz)
        }
    }, [selectedQuiz])

    function onFormSubmit(e) {
        e.preventDefault()
        if(formState.quizQuestion === "") {
            return
        }
        //dispatch
        // dispatch(initiateCreateQuiz(formState.quizQuestion, formState.applicant, formState.finished, formState.grade))
        if(!quizEditing) {
            dispatch(initiateCreateQuiz(formState))
        }
        else {
            dispatch(editQuiz(formState, selectedQuiz[0].id))
        }
        dispatch(getQuizList())
        setFormState(newQuiz)
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
        <Card className={'m-2 bg-secondary border-secondary row '}>
            <CardHeader className={'h3 float-start text-white'}>Quiz Template</CardHeader>

        <form onSubmit={onFormSubmit}>

            <FormGroup>
            <FormLabel className={'text-secondary input-group-text'} >
                Question:
                <FormControl required onChange={onQuestionChange}
                             value={formState.quizQuestion}
                             type={'text'}
                             // placeholder={"Question"}

                />
            </FormLabel>
            </FormGroup>
            <Dropdown className={'text-white'}>
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

            <FormGroup>
                <FormLabel className={'mt-3 text-warning input-group-sm'}>
                    Grade:
                    <FormControl onChange={onGradeChange}
                                 value={formState.grade}
                                 type={'text'}
                                 // placeholder={"Grade"}
                    />
                </FormLabel>
            </FormGroup>

            <FormGroup>
                <FormLabel className={'text-warning'}>
                    Finished:
                    <input onChange={onFinishedChange} checked={formState.finished} type={'checkbox'} className={'m-1'}/>
                </FormLabel>
            </FormGroup>

            <Button className={'m-1'} variant={'primary'}>Submit</Button>
        </form>
        </Card>
    </>
}