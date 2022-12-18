import { UserActionType } from "../../interface/ActionType";
import initialUser from "../../const/initialUser";
import { UserType } from "../../interface/UserType";

export default function userReducer(
    state = { user: initialUser },
    action: UserActionType
): UserType {
    switch (action.type) {
        case "GET_USER":
            if (localStorage.getItem("user") !== null) {
                return JSON.parse(localStorage.getItem("user")!);
            }
            localStorage.setItem("user", JSON.stringify(action.payload));
            return action.payload;
        case "DELETE_USER":
        case "ERROR":
            localStorage.removeItem("user");
            return initialUser;
        default:
            return state.user;
    }
}
