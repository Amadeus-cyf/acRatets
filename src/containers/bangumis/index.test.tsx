import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import BangumisView from ".";

const mocks = vi.hoisted(() => ({
    getBangumiCount: vi.fn(),
    getBangumiWithPagingOrderByDate: vi.fn(),
}));

vi.mock("@/api/bangumi_list", () => ({
    default: {
        getBangumiCount: mocks.getBangumiCount,
        getBangumiWithPagingOrderByDate: mocks.getBangumiWithPagingOrderByDate,
    },
}));

vi.mock("@/containers/navigation_section", () => ({
    default: () => <nav>Navigation</nav>,
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

const listResponse = (bangumiList: ReturnType<typeof anime>[]) => ({
    data: { data: { bangumiList } },
});

describe("BangumisView", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            value: vi.fn().mockReturnValue({
                matches: false,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            }),
        });
    });

    test("loads another page from the navigator", async () => {
        mocks.getBangumiWithPagingOrderByDate
            .mockResolvedValueOnce(listResponse([anime("1", "First page")]))
            .mockResolvedValueOnce(listResponse([anime("2", "Second page")]));
        mocks.getBangumiCount.mockResolvedValue({
            data: { data: { bangumiNumber: 48 } },
        });

        render(<BangumisView />);

        expect(await screen.findByText("First page")).toBeInTheDocument();
        fireEvent.click(await screen.findByRole("button", { name: "Go next" }));
        expect(await screen.findByText("Second page")).toBeInTheDocument();
        expect(mocks.getBangumiWithPagingOrderByDate).toHaveBeenLastCalledWith(
            2,
            -1,
            expect.any(AbortSignal)
        );
    });

    test("recovers from a list failure when retried", async () => {
        mocks.getBangumiWithPagingOrderByDate
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValueOnce(listResponse([]));
        mocks.getBangumiCount.mockResolvedValue({
            data: { data: { bangumiNumber: 0 } },
        });

        render(<BangumisView />);

        fireEvent.click(
            await screen.findByRole("button", { name: "Try again" })
        );
        expect(await screen.findByText("No anime found.")).toBeInTheDocument();
        expect(mocks.getBangumiWithPagingOrderByDate).toHaveBeenCalledTimes(2);
    });

    test("reports a pagination failure without hiding loaded content", async () => {
        mocks.getBangumiWithPagingOrderByDate.mockResolvedValue(
            listResponse([anime("1", "Loaded anime")])
        );
        mocks.getBangumiCount.mockRejectedValue(new Error("offline"));

        render(<BangumisView />);

        expect(await screen.findByText("Loaded anime")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent(
            "Anime pagination is unavailable."
        );
    });

    test("cancels list and count requests on unmount", async () => {
        mocks.getBangumiWithPagingOrderByDate.mockReturnValue(
            new Promise(() => undefined)
        );
        mocks.getBangumiCount.mockReturnValue(new Promise(() => undefined));

        const { unmount } = render(<BangumisView />);
        await waitFor(() =>
            expect(mocks.getBangumiCount).toHaveBeenCalledOnce()
        );
        const listSignal =
            mocks.getBangumiWithPagingOrderByDate.mock.calls[0][2];
        const countSignal = mocks.getBangumiCount.mock.calls[0][0];
        unmount();

        expect(listSignal.aborted).toBe(true);
        expect(countSignal.aborted).toBe(true);
    });
});
