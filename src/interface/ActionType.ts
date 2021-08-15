import { UserType } from './UserType';

export interface ActionType {
    type: "GET_USER" | "DELETE_USER" | "ERROR",
    payload: UserType,
}
