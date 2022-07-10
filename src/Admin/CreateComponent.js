import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUser, editUser, getUserList, impersonateUser} from "../Store/reduxFunctions";
import {Button, Card, Form} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {UserList} from "./UserList";
import {SELECT_DEFAULT} from "../Store/actions";

export function CreateComponent() {

    let {token,
        createUserMessage,
        editing,
        selectedUser,
        impersonating,
        impersonateFailure,
        editFailed
    } = useSelector(state => ({
        token: state.login.token,
        createUserMessage: state.admin.createUserMessage,
        editing: state.admin.editing,
        selectedUser: state.admin.selectedUser,
        impersonating: state.admin.impersonating,
        impersonateFailure: state.login.impersonateFailure,
        editFailed: state.admin.editFailed,
    }))
    console.log(editing)

    const newUser = {
        username: '',
        password: '',
        applicant: false,
        recruiter: false,
        admin: false
    }

    const [formState, setFormState] = useState(newUser)
	const [editState, setEditState] = useState(newUser)
    const [impState, setImpState] = useState()

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [checked, setChecked] = useState(false)
    // console.log(checked)
    const dispatch = useDispatch();

    // console.log(editState)
    console.log(impState)

    function updateUsername(e){
        if (editing) {
            setEditState({
                ...editState,
                username: e.target.value
            })
        } else {
            setFormState({
                ...formState,
                username: e.target.value
            })
        }
    }
    function updatePassword(e){
        if (editing) {
            setEditState({
                ...editState,
                password: e.target.value
            })
        } else {
            setFormState({
                ...formState,
                password: e.target.value
            })
        }
    }
    function updateApplicantRole() {
        // if (impersonating) {
        //     setImpState({
        //         ...impState,
        //         applicant: !impState.applicant
        //     })
        // } else
            if (editing) {
            setEditState({
                ...editState,
                applicant: !editState.applicant
            })
        } else {
            setFormState({
                ...formState,
                applicant: !formState.applicant
            })
        }
    }
    function updateRecruiterRole() {
        // if (impersonating) {
        //     setImpState({
        //         ...impState,
        //         recruiter: !impState.recruiter
        //     })
        // } else
            if (editing) {
            setEditState({
                ...editState,
                recruiter: !editState.recruiter
            })
        } else {
            setFormState({
                ...formState,
                recruiter: !formState.recruiter
            })
        }
    }
    function updateAdminRole() {
        // if (impersonating) {
        //     setImpState({
        //         ...impState,
        //         admin: !impState.admin
        //     })
        // } else
            if (editing) {
            setEditState({
                ...editState,
                admin: !editState.admin
            })
        } else {
            setFormState({
                ...formState,
                admin: !formState.admin
            })
        }
    }
    function addUser(e) {
        e.preventDefault()
        if(formState.username === "") {
            return
        }
        dispatch(createUser({formState: formState, token: token}))
    }

    function onEditSubmit(e){
        e.preventDefault()
        if(editState.username === "") {
            return
        }
        dispatch(editUser(editState, selectedUser[0].username))
        setEditState(newUser)
        dispatch({type: SELECT_DEFAULT, select: true})
    }

    function handleRole(e){
        setImpState(e.target.value)
    }

    function onImpSubmit(e) {
        e.preventDefault();
        dispatch(impersonateUser(selectedUser[0].username, impState))
        dispatch({type: SELECT_DEFAULT, select: true})
    }

    if (impersonating) {
        return <>
            <Card className={'w-50 text-center m-auto'}>
                <CardHeader style={{backgroundColor:"lightblue", color:'purple'}} className={'fs-3'}>Impersonate User</CardHeader>
            {/*<h2>Impersonate</h2>*/}
            <Form className={'p-3'} onSubmit={onImpSubmit} style={{backgroundColor:'lightcyan'}}>
                <Form.Group className={'mb-3'}>
                    <Form.Label>Username:</Form.Label>
                    <input required value={selectedUser[0].username} type='text' disabled={true}/>
                </Form.Group>
                <Form.Group className={'mb-3'}>
                <Form.Label>Password:</Form.Label>
                    <input value={selectedUser[0].password} type='text' disabled={true}/>
                </Form.Group>

                <input type="radio" onChange={handleRole} name="role" value="applicant"/> Applicant
                <input type="radio" onChange={handleRole} name="role" value="recruiter"/> Recruiter
                <input type="radio" onChange={handleRole} name="role" value="admin"/>  Admin
                <br/>
                <br/>
                <Button  type='submit'>Submit</Button>
            </Form>
                {/*{impersonateFailure && <h3>Person you are trying to impersonate does not exist or have that role</h3>}*/}
                <Card.Footer>
                    {impersonateFailure && <div><font color="red">Person you are trying to impersonate does not exist or have that role</font></div>}
                </Card.Footer>

            </Card>


        </>
    }

    console.log(selectedUser)
if (editing) {
    console.log(editState)
    return <>
        <Card className={'w-50 text-center m-auto'}>
            <CardHeader style={{backgroundColor:"lightblue", color:'purple'}} className={'fs-3'}>Edit User</CardHeader>
        {/*<h2>Edit</h2>*/}
        <Form className={'p-3'} onSubmit={onEditSubmit} style={{backgroundColor:'lightcyan'}}>
            <Form.Group className={'mb-3'}>
            <Form.Label>Username:</Form.Label>

                <input onChange={updateUsername} value={editState.username} placeholder={selectedUser[0].username} type='text' />
            </Form.Group>
            <Form.Group className={'mb-3'}>
            <Form.Label>Password:</Form.Label>
                <input onChange={updatePassword} value={editState.password} placeholder={selectedUser[0].password} type='text' />
            </Form.Group>

            <input type="checkbox" onChange={updateApplicantRole} checked={editState.applicant} /> Applicant
            <input type="checkbox" onChange={updateRecruiterRole} checked={editState.recruiter} /> Recruiter
            <input type="checkbox" onChange={updateAdminRole} checked={editState.admin} />  Admin
            <br/>
            <br/>
            <Button  type='submit'>Submit</Button>

        </Form>

        </Card>


    </>
}
    return (
        <Card className={'w-50 text-center m-auto'}>
            <CardHeader style={{backgroundColor:"lightblue", color:'purple'}} className={'fs-2'}>Create a new user</CardHeader>
            {/*<div><font color="#663399"><h3>Create a new user</h3></font></div>*/}

            <Form className={'p-3'} onSubmit={addUser} style={{backgroundColor:'lightcyan'}}>
                <Form.Group className={'mb-3'}>
                <Form.Label>Username: </Form.Label>
                    <input onChange={updateUsername} value={formState.username} placeholder="username" type='text' />
                </Form.Group>
                <Form.Group className={'mb-3'}>
                    <Form.Label>Password:</Form.Label>
                    <input onChange={updatePassword} value={formState.password} placeholder="password" type='text' />
                </Form.Group>


                <input type="checkbox" onChange={updateApplicantRole} checked={formState.applicant} /> Applicant

                <input type="checkbox" onChange={updateRecruiterRole} checked={formState.recruiter} /> Recruiter

                <input type="checkbox" onChange={updateAdminRole} checked={formState.admin} />  Admin
                <br/>
                <br/>

                <Button  type='submit'>Submit</Button>

            </Form>
            <Card.Footer>
                {createUserMessage && <div><font color="red">{createUserMessage}</font></div>}
                {editFailed && <div><font color="red">The name you have chosen already exists. Please choose a new name to edit for the selected user.</font></div>}
            </Card.Footer>

        </Card> )
}