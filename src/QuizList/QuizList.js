import {Quiz} from "../Quiz/Quiz.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getQuizList} from "../Store/reduxFunctions";

export function QuizList(_Quiz = Quiz) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuizList())
    }, [])
    let quizList = useSelector(state => state.quiz.quizList)

    const ungradedQuizList = quizList.filter(q => !q.finished)
    const gradedQuizList = quizList.filter(q => q.finished)

    return <>
        <div className={"hdr1"}><h1>Ungraded Quizzes</h1></div>
        <div className={'ungraded'}>

            {
                ungradedQuizList.map((quizData, idx) => {
                    return <div key={idx} className={'ungradedQuizList'}>
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
                    return <div key={idx} className={'gradedQuizList'}>
                        {/*<_Quiz quiz={quizData} onEditSelect={onEditSelect} onDelete={onDelete}/>*/}
                                                    {/*questioning whether we will need this*/}
                    </div>
                })
            }
        </div>
    </>

}