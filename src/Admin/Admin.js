import {CreateComponent} from "./CreateComponent";
import {UserList} from "./UserList";
import {useSelector} from "react-redux";
import {Impersonate} from "./Impersonate";

export function Admin(){
    const {impersonate} = useSelector(state=>({
        impersonate: state.admin.impersonate
    }))
if(impersonate){
    return<>
        <Impersonate />
    </>
}
return <>
    <h1>Admin page</h1>
    <CreateComponent/>
    <UserList />
</>

}