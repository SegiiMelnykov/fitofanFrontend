import { bindActionCreators } from "@reduxjs/toolkit"; 
import { useDispatch } from "react-redux";
import { authActions } from "store/auth/auth.slice";



const actions = {
    ...authActions,
}

export const useAuthActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);

}