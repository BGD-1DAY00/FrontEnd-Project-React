import {useDispatch, useSelector} from "react-redux";
import {QUIZ_EDITING} from "../Store/actions";
import {getQuizList} from "../Store/reduxFunctions";
import {useEffect} from "react";

export function Quiz({quizData}) {
    const dispatch = useDispatch();
    const quizList = useSelector(state => state.quiz.quizList)

    useEffect(() => {
        dispatch(getQuizList())
    }, [])


    console.log(quizData.quizQuestion)

    function editQuiz(e) {
        const selectedQuiz = quizList.filter(s => s.quizQuestion === quizData.quizQuestion && s.applicant === quizData.applicant)
        console.log("selected quiz" + JSON.stringify(selectedQuiz))
        dispatch({type: QUIZ_EDITING, selectedQuiz: selectedQuiz})

    }
    return <div className={"quiz"}>

        <span>{quizData.quizQuestion}</span>
        {/*might have to change this - its reading as function*/}
        <span>{quizData.grade}</span>
        <span>{quizData.applicant}</span>
        <span>{quizData.finished}</span>
        {/*not sure this needs to be here*/}

        <br/>
        <button onClick={(e) => {editQuiz(e)}}>Edit</button>
        {/*<button className={'message_btn2'}*/}
        {/*        onClick={() => dispatch({type: ON_QUIZ_DELETE, props})}>*/}
        {/*    Delete*/}
        {/*</button>*/}

    </div>

}

