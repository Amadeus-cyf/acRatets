import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("@/api/bangumi", () => ({
    __esModule: true,
    default: {
        getBangumisBySeasonWithLimit: vi.fn(() => new Promise(() => undefined)),
    },
}));
vi.mock("@/api/bangumi_list", () => ({
    __esModule: true,
    default: { getBangumiRank: vi.fn(() => new Promise(() => undefined)) },
}));
vi.mock("@/api/auth", () => ({
    __esModule: true,
    default: { login: vi.fn(() => new Promise(() => undefined)) },
}));
vi.mock("@/api/timeline", () => ({
    __esModule: true,
    default: {
        getTimelineInPage: vi.fn(() => new Promise(() => undefined)),
        getTimelineCount: vi.fn(() => new Promise(() => undefined)),
    },
}));
vi.mock("@/api/bangumi_detail", () => ({
    __esModule: true,
    default: {
        getBangumiDetailV1: vi.fn(() => new Promise(() => undefined)),
        getBangumiDetailV2: vi.fn(() => new Promise(() => undefined)),
    },
}));
vi.mock("@/containers/home", () => ({
    __esModule: true,
    default: () => <div>Home page</div>,
}));
vi.mock("@/containers/bangumis", () => ({
    __esModule: true,
    default: () => <div>Bangumis page</div>,
}));
vi.mock("@/containers/login", () => ({
    __esModule: true,
    default: () => <div>Login page</div>,
}));
vi.mock("@/containers/timeline", () => ({
    __esModule: true,
    default: () => <div>Timeline page</div>,
}));
vi.mock("@/containers/rank", () => ({
    __esModule: true,
    default: () => <div>Rank page</div>,
}));
vi.mock("@/containers/bangumi_detail", () => ({
    __esModule: true,
    default: () => <div>Bangumi detail page</div>,
}));

test.each([
    ["/", "Home page"],
    ["/bangumi", "Bangumis page"],
    ["/login", "Login page"],
    ["/timeline", "Timeline page"],
    ["/rank", "Rank page"],
    ["/bangumi_detail/1", "Bangumi detail page"],
])("renders the %s route", async (route, expectedText) => {
    window.history.pushState({}, "", route);
    render(<App />);
    expect(await screen.findByText(expectedText)).toBeInTheDocument();
});
