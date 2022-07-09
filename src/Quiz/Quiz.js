import {useDispatch, useSelector} from "react-redux";
import {QUIZ_EDITING} from "../Store/actions";
import {deletingQuiz, getQuizList} from "../Store/reduxFunctions";
import {useEffect} from "react";
import {Button, Card} from "react-bootstrap";

export function Quiz({quizData}) {
    const dispatch = useDispatch();
    const quizList = useSelector(state => state.quiz.quizList)

    useEffect(() => {
        dispatch(getQuizList())
    }, [])

    function editQuiz(e) {
        const selectedQuiz = quizList.filter(s => s.quizQuestion === quizData.quizQuestion && s.applicant === quizData.applicant)
        dispatch({type: QUIZ_EDITING, selectedQuiz: selectedQuiz})

    }

    function deleteQuiz(e) {
        const selectedQuiz = quizList.filter(s => s.id === quizData.id)
        dispatch(deletingQuiz(selectedQuiz[0].id))
    }
    return <>

        <Card className={'d-flex float-start w-25 p-2 m-1 bg-secondary text-white'} border={'secondary'} >
        Quiz for: {quizData.applicant}
            <span> Quiz Question:  {quizData.quizQuestion} </span>
        {/*might have to change this - its reading as function*/}
        <span> Quiz Grade: {quizData.grade}</span>
        {/*<span>{quizData.applicant}</span>*/}
        <span>Completed: {quizData.finished}</span>
        {/*not sure this needs to be here*/}
        <div>
        <span className={'ml-2'}><Button onClick={(e) => {editQuiz(e)}}
                className={'m-2 text-white'}
                size={'sm'}
                variant={'warning'}
        >Edit</Button></span>
        <span className={'ml-2'}><Button
            className={'m-2  text-white'}
            size={'sm'}
            variant={'danger'}
            onClick={(e) => {deleteQuiz(e)}}
        >Delete</Button></span>
        </div>
        </Card>

        </>
}

