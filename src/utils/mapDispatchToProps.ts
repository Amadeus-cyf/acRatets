import { UserType } from '../interface/UserType';
import { ActionType } from '../interface/ActionType';
import { setUser, clearUser } from '../store/action';
import { ACTION } from '../const/actions';
import { Dispatch } from 'redux'; 

export const mapUserDispatchToProps = (dispatch : Dispatch<ActionType>, action : String) : any => {
    switch(action) {
        case ACTION.SET_USER:
            return (user : UserType) => dispatch(setUser(user));
        case ACTION.DELETE_USER:
            return () => dispatch(clearUser());
    }
}
