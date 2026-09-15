import { render, screen } from "@testing-library/react";
import {
    renderBangumiBriefRank,
    renderBangumiList,
    renderBangumiRank,
} from "./render";

test("renders and truncates anime list items", () => {
    render(
        <>
            {renderBangumiList([
                {
                    anime_id: "1",
                    image_url: "/anime.jpg",
                    title: "A very long anime title that exceeds thirty characters",
                    synopsis: "Synopsis",
                    episodes: 12,
                },
            ])}
        </>
    );

    expect(
        screen.getByText("A very long anime title that e...")
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
});

test("renders compact and detailed rankings", () => {
    const rankedAnime = {
        anime_id: "1",
        image_url: "/anime.jpg",
        title: "Ranked anime",
        synopsis: "A".repeat(220),
        score: 8.5,
        userNumber: 100,
        totalScore: 850,
        rank: 1,
    };

    const { rerender } = render(<>{renderBangumiBriefRank([rankedAnime])}</>);
    expect(screen.getByText(/8.5 分/)).toBeInTheDocument();
    expect(screen.getByText(/100人评分/)).toBeInTheDocument();

    rerender(<>{renderBangumiRank([rankedAnime])}</>);
    expect(screen.getByText(`${"A".repeat(200)}...`)).toBeInTheDocument();
});
