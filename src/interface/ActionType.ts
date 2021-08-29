import { BangumiSeasonType } from './BangumiSeasonType';
import { UserType } from './UserType';

export interface UserActionType {
    type: "GET_USER" | "DELETE_USER" | "ERROR",
    payload: UserType,
}

export interface DateActionType {
    type: "SWITCH_YEAR" | "SWITCH_MONTH",
    payload: BangumiSeasonType,
}
