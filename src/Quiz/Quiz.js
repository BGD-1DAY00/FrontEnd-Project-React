import {useDispatch} from "react-redux";

export function Quiz({quizQuestion, grade, applicant, finished}) {

    const dispatch = useDispatch();

    return <div className={"quiz"}>

        {quizQuestion}
        {/*might have to change this - its reading as function*/}
        {grade}
        {applicant}
        {finished}
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