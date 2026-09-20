import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import DateSection from ".";

vi.mock("@/utils/dateutil", () => ({
    getCurrentDate: () => ({ year: 2026, month: 7, season: "summer" }),
}));

test("uses the latest selected year and month", () => {
    const switchDate = vi.fn();
    render(<DateSection switchDateListener={switchDate} />);

    fireEvent.click(screen.getByRole("button", { name: "2025" }));
    expect(switchDate).toHaveBeenLastCalledWith(2025, 7);

    fireEvent.click(screen.getByRole("button", { name: "4月" }));
    expect(switchDate).toHaveBeenLastCalledWith(2025, 4);

    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(switchDate).toHaveBeenLastCalledWith(2025, -1);
});
