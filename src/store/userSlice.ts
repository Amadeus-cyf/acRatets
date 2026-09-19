import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialUser from "@/const/initialUser";
import { UserType } from "@/interface/UserType";

const isUser = (value: unknown): value is UserType => {
    if (typeof value !== "object" || value === null) return false;

    const user = value as Record<string, unknown>;
    return (
        typeof user._id === "string" &&
        typeof user.username === "string" &&
        typeof user.email === "string" &&
        typeof user.avatar === "string" &&
        typeof user.background === "string" &&
        typeof user.follower === "number" &&
        typeof user.following === "number"
    );
};

export const loadStoredUser = (): UserType => {
    if (typeof localStorage === "undefined") return initialUser;

    const storedUser = localStorage.getItem("user");
    if (storedUser === null) return initialUser;

    try {
        const user: unknown = JSON.parse(storedUser);
        if (isUser(user)) return user;
    } catch {
        // Invalid persisted data is cleared below.
    }

    localStorage.removeItem("user");
    return initialUser;
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        setUser: (_state, action: PayloadAction<UserType>) => action.payload,
        clearUser: () => initialUser,
    },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
