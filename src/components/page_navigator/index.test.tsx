import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PageNavigator from ".";

test("moves forward and backward through pages", () => {
    const onPageClicked = vi.fn();
    const { rerender } = render(
        <PageNavigator
            pageNum={5}
            selectedPage={1}
            subkey="test"
            onPageClicked={onPageClicked}
        />
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onPageClicked).toHaveBeenCalledWith(2);

    rerender(
        <PageNavigator
            pageNum={5}
            selectedPage={2}
            subkey="test"
            onPageClicked={onPageClicked}
        />
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(onPageClicked).toHaveBeenLastCalledWith(1);
});
