import type { AxiosResponse } from "axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import AuthApi from "@/api/auth";
import type { LoginResponse } from "@/api/types";
import { createAppStore } from "@/store";
import Login from ".";

vi.mock("@/api/auth", () => ({
    default: { login: vi.fn() },
}));

const successResponse: LoginResponse = {
    message: "Successfully Login",
    _id: "user-1",
    username: "Test user",
    email: "test@example.com",
    avatar: "",
    background: "",
    follower: ["one"],
    following: ["two"],
};

const renderLogin = () =>
    render(
        <Provider store={createAppStore()}>
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<div>Home page</div>} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

const enterCredentials = (): void => {
    fireEvent.change(screen.getByPlaceholderText("your email"), {
        target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
        target: { value: "secret" },
    });
};

describe("Login", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    test("stores the user and navigates after a successful login", async () => {
        vi.mocked(AuthApi.login).mockResolvedValue({
            data: successResponse,
        } as AxiosResponse<LoginResponse>);
        renderLogin();
        enterCredentials();

        fireEvent.click(screen.getByRole("button", { name: "Log in" }));

        expect(await screen.findByText("Home page")).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem("user") ?? "{}")).toMatchObject({
            _id: "user-1",
            follower: 1,
            following: 1,
        });
    });

    test("shows an error and clears the password when login fails", async () => {
        vi.mocked(AuthApi.login).mockRejectedValue(new Error("offline"));
        renderLogin();
        enterCredentials();

        fireEvent.click(screen.getByRole("button", { name: "Log in" }));

        await waitFor(() =>
            expect(
                screen.getByText(/Incorrect email or password/)
            ).toBeVisible()
        );
    });
});
