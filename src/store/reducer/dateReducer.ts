import { getCurrentDate } from "../../utils/dateutil";
import { DateActionType } from '../../interface/ActionType';

export default function dateReducer(state = getCurrentDate(), action : DateActionType) {
    switch(action.type) {
        case "SWITCH_YEAR":
            
    }
}