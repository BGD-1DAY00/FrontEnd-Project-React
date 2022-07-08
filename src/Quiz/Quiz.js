import {useDispatch} from "react-redux";

export function Quiz({quizData}) {

    const dispatch = useDispatch();

    console.log(quizData.quizQuestion)
    return <div className={"quiz"}>

        <span>{quizData.quizQuestion}</span>
        {/*might have to change this - its reading as function*/}
        <span>{quizData.grade}</span>
        <span>{quizData.applicant}</span>
        <span>{quizData.finished}</span>
        {/*not sure this needs to be here*/}

        <br/>
        {/*<button className={'message_btn'}*/}
        {/*        onClick={() => dispatch({type: ON_QUIZ_SELECT_TO_EDIT, quiz: props})}>*/}
        {/*    Edit*/}
        {/*</button>*/}
        {/*<button className={'message_btn2'}*/}
        {/*        onClick={() => dispatch({type: ON_QUIZ_DELETE, props})}>*/}
        {/*    Delete*/}
        {/*</button>*/}

    </div>

}