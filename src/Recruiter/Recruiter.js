import {QuizInput} from "../QuizInput/QuizInput";
import {QuizList} from "../QuizList/QuizList";
import {getQuizList} from "../Store/reduxFunctions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {ApplicantQuizList} from "../ApplicantQuizList/ApplicantQuizList";
import {GO_HOME} from "../Store/actions";


export function Recruiter(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuizList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    //recruiter folder

    return <>

            <QuizInput/>

        <QuizList/>
        <br/>

        <br/>
        <ApplicantQuizList/>
    </>
}