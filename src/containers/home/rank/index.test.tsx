import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import RankSection from ".";

const mocks = vi.hoisted(() => ({
    getBangumiRank: vi.fn(),
}));

vi.mock("@/api/bangumi_list", () => ({
    default: { getBangumiRank: mocks.getBangumiRank },
}));

vi.mock("@/containers/render", () => ({
    renderBangumiBriefRank: (
        items: Array<{ anime_id: string; title: string }>
    ) => items.map((item) => <span key={item.anime_id}>{item.title}</span>),
}));

describe("home RankSection", () => {
    beforeEach(() => vi.clearAllMocks());

    test("renders ranking data", async () => {
        mocks.getBangumiRank.mockResolvedValue({
            data: {
                data: { bangumiList: [{ anime_id: "1", title: "Top anime" }] },
            },
        });

        render(<RankSection />);

        expect(await screen.findByText("Top anime")).toBeInTheDocument();
        expect(mocks.getBangumiRank).toHaveBeenCalledWith(
            10,
            expect.any(AbortSignal)
        );
    });

    test("recovers from an error", async () => {
        mocks.getBangumiRank
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValueOnce({ data: { data: { bangumiList: [] } } });

        render(<RankSection />);
        fireEvent.click(
            await screen.findByRole("button", { name: "Try again" })
        );

        expect(
            await screen.findByText("No ranking data is available.")
        ).toBeInTheDocument();
    });

    test("cancels an obsolete ranking request", () => {
        mocks.getBangumiRank.mockReturnValue(new Promise(() => undefined));

        const { unmount } = render(<RankSection />);
        const signal = mocks.getBangumiRank.mock.calls[0][1];
        unmount();

        expect(signal.aborted).toBe(true);
    });
});
