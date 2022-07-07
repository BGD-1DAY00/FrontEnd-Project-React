import {Quiz} from "../Quiz/Quiz.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getQuizList} from "../Store/reduxFunctions";

export function QuizList() {

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getQuizList());
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    const quizList = useSelector(state => state.quiz.quizList)
    console.log(quizList)

    const ungradedQuizList = quizList.filter(quiz => quiz.finished === false)
    const gradedQuizList = quizList.filter(quiz => quiz.finished === true)

    return <>
        <div className={"hdr1"}><h1>Ungraded Quizzes</h1></div>
        <div className={'ungraded'}>

            {
                ungradedQuizList.map((quizData, idx) => {
                    return <div key={"ungraded" + idx} className={'ungradedQuizList'}>
                        <Quiz quizData={quizData}/>
                        {/*<_Quiz quiz={quizData} onEditSelect={onEditSelect} onDelete={onDelete}/>*/}
                                                    {/*questioning whether we will need this*/}
                    </div>
                })
            }
        </div>
        <div className={"hdr2"}><h1>Graded Quizzes</h1></div>
        <div className={'graded'}>
            {
                gradedQuizList.map((quizData, idx) => {
                    return <div key={"graded" + idx} className={'gradedQuizList'}>
                        <Quiz quizData={quizData}/>
                        {/*<_Quiz quiz={quizData} onEditSelect={onEditSelect} onDelete={onDelete}/>*/}
                                                    {/*questioning whether we will need this*/}
                    </div>
                })
            }
        </div>
    </>

}