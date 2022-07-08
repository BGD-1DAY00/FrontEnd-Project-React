import {QuizInput} from "../QuizInput/QuizInput";
import {QuizList} from "../QuizList/QuizList";
import {getQuizList} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";


export function Recruiter(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuizList())
        }, [])
    //recruiter folder
    const selectedQuiz = useSelector(state => state.quiz.selectedQuiz)

    if(selectedQuiz){
        return <QuizInput newQuiz={selectedQuiz}/>
    }
    return <>
        <QuizInput/>
        <QuizList/>
    </>
}