import {QuizInput} from "../QuizInput/QuizInput";
import {QuizList} from "../QuizList/QuizList";
import {getQuizList} from "../Store/reduxFunctions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";


export function Recruiter(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuizList())
        }, [])
    //recruiter folder

    return <>
        <QuizInput/>
        <QuizList/>
    </>
}