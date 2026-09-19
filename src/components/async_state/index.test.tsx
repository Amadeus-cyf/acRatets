import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AsyncState from ".";

describe("AsyncState", () => {
    test("announces loading progress", () => {
        render(<AsyncState status="loading" message="Loading anime…" />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading anime…");
    });

    test("announces an empty result", () => {
        render(<AsyncState status="empty" message="No anime found." />);

        expect(screen.getByRole("status")).toHaveTextContent("No anime found.");
    });

    test("renders failures as alerts", () => {
        render(
            <AsyncState status="error" message="Anime could not be loaded." />
        );

        expect(screen.getByRole("alert")).toHaveTextContent(
            "Anime could not be loaded."
        );
    });
});
