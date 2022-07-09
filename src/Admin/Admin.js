import {CreateComponent} from "./CreateComponent";
import {UserList} from "./UserList";
import {useDispatch, useSelector} from "react-redux";
import {Impersonate} from "./Impersonate";
import {GO_HOME, GO_TO_ADMIN} from "../Store/actions";

export function Admin(){
    const dispatch = useDispatch()
    const {impersonate} = useSelector(state=>({
        impersonate: state.admin.impersonate
    }))
if(impersonate){
    return<>
        <Impersonate />

    </>
}
return <>
    <div>
        <CreateComponent/>
    </div>
    <UserList />
</>

}