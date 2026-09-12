import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export default store;
