import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Timeline from ".";

const mocks = vi.hoisted(() => ({
    getTimelineCount: vi.fn(),
    getTimelineInPage: vi.fn(),
}));

vi.mock("@/api/timeline", () => ({
    default: {
        getTimelineCount: mocks.getTimelineCount,
        getTimelineInPage: mocks.getTimelineInPage,
    },
}));

vi.mock("@/utils/dateutil", () => ({
    getCurrentDate: () => ({ year: 2026, month: 7, season: "summer" }),
    getSeasonFromMonth: (month: number) => (month === 4 ? "spring" : "summer"),
}));

vi.mock("@/containers/navigation_section", () => ({
    default: () => <nav>Navigation</nav>,
}));

vi.mock("./date_section", () => ({
    default: ({
        switchDateListener,
    }: {
        switchDateListener: (year: number, month: number) => void;
    }) => (
        <button type="button" onClick={() => switchDateListener(2025, 4)}>
            Switch season
        </button>
    ),
}));

vi.mock("@/components/page_navigator", () => ({
    default: ({ onPageClicked }: { onPageClicked: (page: number) => void }) => (
        <button type="button" onClick={() => onPageClicked(2)}>
            Go next
        </button>
    ),
}));

vi.mock("@/containers/render", () => ({
    renderBangumiList: (items: Array<{ anime_id: string; title: string }>) =>
        items.map((item) => <span key={item.anime_id}>{item.title}</span>),
}));

const anime = (animeId: string, title: string) => ({
    anime_id: animeId,
    title,
    image_url: "/cover.jpg",
    synopsis: "Synopsis",
    episodes: 12,
});

const listResponse = (title: string) => ({
    data: { data: { bangumiList: [anime(title, title)] } },
});

describe("Timeline", () => {
    beforeEach(() => vi.clearAllMocks());

    test("changes pages and seasons", async () => {
        mocks.getTimelineInPage
            .mockResolvedValueOnce(listResponse("Initial"))
            .mockResolvedValueOnce(listResponse("Page two"))
            .mockResolvedValueOnce(listResponse("Spring"));
        mocks.getTimelineCount.mockResolvedValue({
            data: { data: { bangumiNumber: 40 } },
        });

        render(<Timeline />);

        expect(await screen.findByText("Initial")).toBeInTheDocument();
        fireEvent.click(await screen.findByRole("button", { name: "Go next" }));
        expect(await screen.findByText("Page two")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Switch season" }));
        expect(await screen.findByText("Spring")).toBeInTheDocument();
        expect(mocks.getTimelineInPage).toHaveBeenLastCalledWith(
            2025,
            "spring",
            1,
            expect.any(AbortSignal)
        );
    });

    test("recovers after a failed timeline request", async () => {
        mocks.getTimelineInPage
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValueOnce({ data: { data: { bangumiList: [] } } });
        mocks.getTimelineCount.mockResolvedValue({
            data: { data: { bangumiNumber: 0 } },
        });

        render(<Timeline />);

        fireEvent.click(
            await screen.findByRole("button", { name: "Try again" })
        );
        expect(
            await screen.findByText("No anime found for this period.")
        ).toBeInTheDocument();
    });

    test("reports a count failure beside loaded content", async () => {
        mocks.getTimelineInPage.mockResolvedValue(listResponse("Loaded"));
        mocks.getTimelineCount.mockRejectedValue(new Error("offline"));

        render(<Timeline />);

        expect(await screen.findByText("Loaded")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent(
            "Timeline pagination is unavailable."
        );
    });

    test("cancels timeline requests on unmount", async () => {
        mocks.getTimelineInPage.mockReturnValue(new Promise(() => undefined));
        mocks.getTimelineCount.mockReturnValue(new Promise(() => undefined));

        const { unmount } = render(<Timeline />);
        await waitFor(() =>
            expect(mocks.getTimelineCount).toHaveBeenCalledOnce()
        );
        const listSignal = mocks.getTimelineInPage.mock.calls[0][3];
        const countSignal = mocks.getTimelineCount.mock.calls[0][2];
        unmount();

        expect(listSignal.aborted).toBe(true);
        expect(countSignal.aborted).toBe(true);
    });
});
