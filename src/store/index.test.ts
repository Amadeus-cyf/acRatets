import { beforeEach, describe, expect, test } from "vitest";
import { createAppStore } from ".";
import { clearUser, setUser } from "./userSlice";
import { UserType } from "@/interface/UserType";

const user: UserType = {
    _id: "user-1",
    username: "Test user",
    email: "test@example.com",
    avatar: "avatar.jpg",
    background: "background.jpg",
    follower: 2,
    following: 3,
};

describe("store", () => {
    beforeEach(() => localStorage.clear());

    test("loads a valid persisted user", () => {
        localStorage.setItem("user", JSON.stringify(user));

        expect(createAppStore().getState().user).toEqual(user);
    });

    test("clears invalid persisted data", () => {
        localStorage.setItem("user", "not-json");

        expect(createAppStore().getState().user._id).toBe("");
        expect(localStorage.getItem("user")).toBeNull();
    });

    test("persists user changes outside the reducer", () => {
        const store = createAppStore();

        store.dispatch(setUser(user));

        expect(JSON.parse(localStorage.getItem("user") ?? "{}")).toEqual(user);
    });

    test("clears a persisted user", () => {
        const store = createAppStore();
        store.dispatch(setUser(user));

        store.dispatch(clearUser());

        expect(localStorage.getItem("user")).toBeNull();
    });
});
