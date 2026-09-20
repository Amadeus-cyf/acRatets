import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { BangumiDetailType } from "@/interface/BangumiDetailType";
import BangumiDetail from ".";

const mocks = vi.hoisted(() => ({
    getBangumiDetailV1: vi.fn(),
    getBangumiDetailV2: vi.fn(),
}));

vi.mock("@/api/bangumi_detail", () => ({
    default: {
        getBangumiDetailV1: mocks.getBangumiDetailV1,
        getBangumiDetailV2: mocks.getBangumiDetailV2,
    },
}));

vi.mock("@/components/navbar", () => ({
    default: () => <nav>Navigation</nav>,
}));

vi.mock("@/components/bangumi_detail_label", () => ({
    default: ({ bangumiDetail }: { bangumiDetail: BangumiDetailType }) => (
        <div>{bangumiDetail.title}</div>
    ),
}));

const backendDetail: BangumiDetailType = {
    anime_id: 1,
    title: "Backend title",
    title_japanese: "",
    image_url: "/cover.jpg",
    episodes: 12,
    status: "Finished",
    airing: false,
    aired_from: "2026/01/01",
    aired_to: "2026/03/01",
    synopsis: "Synopsis",
    genres: ["Drama"],
    producers: ["Studio"],
};

const renderDetail = () =>
    render(
        <MemoryRouter initialEntries={["/bangumi_detail/1"]}>
            <Routes>
                <Route path="/bangumi_detail/:id" element={<BangumiDetail />} />
            </Routes>
        </MemoryRouter>
    );

describe("BangumiDetail", () => {
    beforeEach(() => vi.clearAllMocks());

    test("maps a Jikan response", async () => {
        mocks.getBangumiDetailV2.mockResolvedValue({
            data: {
                data: {
                    mal_id: 1,
                    title: "Jikan title",
                    title_japanese: null,
                    images: { jpg: { image_url: "/cover.jpg" } },
                    episodes: null,
                    status: null,
                    airing: true,
                    aired: { from: null, to: null },
                    synopsis: null,
                    genres: [{ name: "Drama" }],
                    producers: [{ name: "Studio" }],
                },
            },
        });

        renderDetail();

        expect(await screen.findByText("Jikan title")).toBeInTheDocument();
        expect(mocks.getBangumiDetailV1).not.toHaveBeenCalled();
    });

    test("falls back to the backend when Jikan fails", async () => {
        mocks.getBangumiDetailV2.mockRejectedValue(new Error("offline"));
        mocks.getBangumiDetailV1.mockResolvedValue({
            data: { data: { bangumi: backendDetail } },
        });

        renderDetail();

        expect(await screen.findByText("Backend title")).toBeInTheDocument();
        expect(mocks.getBangumiDetailV1).toHaveBeenCalledWith(
            "1",
            expect.any(AbortSignal)
        );
    });

    test("offers a retry when both detail sources fail", async () => {
        mocks.getBangumiDetailV2.mockRejectedValue(new Error("offline"));
        mocks.getBangumiDetailV1.mockRejectedValue(new Error("offline"));

        renderDetail();

        expect(await screen.findByRole("alert")).toHaveTextContent(
            "Anime details could not be loaded."
        );
        expect(screen.getByRole("button", { name: "Try again" })).toBeEnabled();
    });

    test("cancels an obsolete detail request", () => {
        mocks.getBangumiDetailV2.mockReturnValue(new Promise(() => undefined));

        const { unmount } = renderDetail();
        const signal = mocks.getBangumiDetailV2.mock.calls[0][1] as AbortSignal;
        unmount();

        expect(signal.aborted).toBe(true);
    });
});
