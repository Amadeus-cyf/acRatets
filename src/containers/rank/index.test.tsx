import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Rank from ".";

const mocks = vi.hoisted(() => ({
    getBangumiRank: vi.fn(),
}));

vi.mock("@/api/bangumi_list", () => ({
    default: { getBangumiRank: mocks.getBangumiRank },
}));

vi.mock("@/containers/navigation_section", () => ({
    default: () => <nav>Navigation</nav>,
}));

describe("Rank", () => {
    beforeEach(() => vi.clearAllMocks());

    test("shows progress while the ranking is loading", () => {
        mocks.getBangumiRank.mockReturnValue(new Promise(() => undefined));

        render(<Rank />);

        expect(screen.getByRole("status")).toHaveTextContent(
            "Loading ranking…"
        );
    });

    test("shows an empty state when no ranking data exists", async () => {
        mocks.getBangumiRank.mockResolvedValue({
            data: { data: { bangumiList: [] } },
        });

        render(<Rank />);

        expect(
            await screen.findByText("No ranking data is available.")
        ).toBeInTheDocument();
    });

    test("shows an error when the ranking request fails", async () => {
        mocks.getBangumiRank.mockRejectedValue(new Error("offline"));

        render(<Rank />);

        expect(await screen.findByRole("alert")).toHaveTextContent(
            "The ranking could not be loaded."
        );
    });
});
