import { BangumiSeasonType } from "./BangumiSeasonType";
import { UserType } from "./UserType";
import { UnknownAction } from "redux";

export interface UserActionType extends UnknownAction {
    type: "GET_USER" | "DELETE_USER" | "ERROR";
    payload: UserType;
}

export interface DateActionType extends UnknownAction {
    type: "SWITCH_YEAR" | "SWITCH_MONTH";
    payload: BangumiSeasonType;
}
