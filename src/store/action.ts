import { UserType } from "../interface/UserType";
import { UserActionType } from "../interface/ActionType";
import InitialUser from "../const/initialUser";

export const setUser = (user: UserType): UserActionType => {
    return {
        type: "GET_USER",
        payload: user,
    };
};

export const clearUser = (): UserActionType => {
    return {
        type: "DELETE_USER",
        payload: InitialUser,
    };
};

export const error = (): UserActionType => {
    return {
        type: "ERROR",
        payload: InitialUser,
    };
};
