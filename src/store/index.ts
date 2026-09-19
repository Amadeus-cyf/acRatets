import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { loadStoredUser } from "./userSlice";

export const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createAppStore = () => {
    const appStore = configureStore({
        reducer: rootReducer,
        preloadedState: { user: loadStoredUser() },
    });
    let previousUser = appStore.getState().user;

    appStore.subscribe(() => {
        const user = appStore.getState().user;
        if (user === previousUser || typeof localStorage === "undefined")
            return;

        previousUser = user;
        if (user._id === "") localStorage.removeItem("user");
        else localStorage.setItem("user", JSON.stringify(user));
    });

    return appStore;
};

const store = createAppStore();

export type AppDispatch = typeof store.dispatch;
export default store;
