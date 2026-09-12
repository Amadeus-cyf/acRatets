import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./api/bangumi", () => ({
    __esModule: true,
    default: {
        getBangumisBySeasonWithLimit: vi.fn(() => new Promise(() => undefined)),
    },
}));
vi.mock("./api/bangumi_list", () => ({
    __esModule: true,
    default: { getBangumiRank: vi.fn(() => new Promise(() => undefined)) },
}));
vi.mock("./api/auth", () => ({
    __esModule: true,
    default: { login: vi.fn(() => new Promise(() => undefined)) },
}));
vi.mock("./api/timeline", () => ({
    __esModule: true,
    default: {
        getTimelineInPage: vi.fn(() => new Promise(() => undefined)),
        getTimelineCount: vi.fn(() => new Promise(() => undefined)),
    },
}));
vi.mock("./api/bangumi_detail", () => ({
    __esModule: true,
    default: {
        getBangumiDetailV1: vi.fn(() => new Promise(() => undefined)),
        getBangumiDetailV2: vi.fn(() => new Promise(() => undefined)),
    },
}));
vi.mock("./containers/home", () => ({
    __esModule: true,
    default: () => <div>Home page</div>,
}));

test("renders the home route", async () => {
    render(<App />);
    expect(await screen.findByText("Home page")).toBeInTheDocument();
});
