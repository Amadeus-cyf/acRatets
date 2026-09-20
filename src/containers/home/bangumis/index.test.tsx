import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Bangumis from ".";

const mocks = vi.hoisted(() => ({
    getBangumisBySeasonWithLimit: vi.fn(),
}));

vi.mock("@/api/bangumi", () => ({
    default: {
        getBangumisBySeasonWithLimit: mocks.getBangumisBySeasonWithLimit,
    },
}));

vi.mock("@/containers/render", () => ({
    renderBangumiList: (items: Array<{ anime_id: string; title: string }>) =>
        items.map((item) => <span key={item.anime_id}>{item.title}</span>),
}));

const props = { year: 2026, month: 7, season: "summer" };

describe("home Bangumis", () => {
    beforeEach(() => vi.clearAllMocks());

    test("renders the season response", async () => {
        mocks.getBangumisBySeasonWithLimit.mockResolvedValue({
            data: {
                data: {
                    bangumiList: [{ anime_id: "1", title: "Season anime" }],
                },
            },
        });

        render(<Bangumis {...props} />);

        expect(await screen.findByText("Season anime")).toBeInTheDocument();
        expect(mocks.getBangumisBySeasonWithLimit).toHaveBeenCalledWith(
            2026,
            "summer",
            8,
            expect.any(AbortSignal)
        );
    });

    test("recovers from an error", async () => {
        mocks.getBangumisBySeasonWithLimit
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValueOnce({ data: { data: { bangumiList: [] } } });

        render(<Bangumis {...props} />);
        fireEvent.click(
            await screen.findByRole("button", { name: "Try again" })
        );

        expect(
            await screen.findByText("No anime found for this season.")
        ).toBeInTheDocument();
    });

    test("cancels an obsolete season request", () => {
        mocks.getBangumisBySeasonWithLimit.mockReturnValue(
            new Promise(() => undefined)
        );

        const { unmount } = render(<Bangumis {...props} />);
        const signal = mocks.getBangumisBySeasonWithLimit.mock.calls[0][3];
        unmount();

        expect(signal.aborted).toBe(true);
    });
});
