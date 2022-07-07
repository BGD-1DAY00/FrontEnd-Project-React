import {useDispatch} from "react-redux";

export function Quiz(props) {

    const dispatch = useDispatch();

    return <div className={"quiz"}>

        {props.question}
        {/*might have to change this - its reading as function*/}
        {props.grade}
        {props.applicant}
        {props.finished}
        {/*not sure this needs to be here*/}

        <br/>
        <button className={'message_btn'}
                onClick={() => dispatch({type: ON_QUIZ_SELECT_TO_EDIT, quiz: props})}>
            Edit
        </button>
        <button className={'message_btn2'}
                onClick={() => dispatch({type: ON_QUIZ_DELETE, props})}>
            Delete
        </button>

    </div>

}