import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.route("**/api/**", async (route) => {
        const url = route.request().url();
        const payload = url.endsWith("/count")
            ? { data: { bangumiNumber: 0 } }
            : { data: { bangumiList: [] } };

        await route.fulfill({ json: payload });
    });
});

test("loads the application and navigates between lazy routes", async ({
    page,
}) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (error) => pageErrors.push(error));

    await page.goto("/");

    await expect(page).toHaveTitle("acRatets");
    await expect(page.getByRole("button", { name: "番剧" })).toBeVisible();

    await page.getByRole("button", { name: "番剧" }).click();

    await expect(page).toHaveURL(/\/bangumi$/);
    await expect(page.getByText("loading")).toBeVisible();
    expect(pageErrors).toEqual([]);
});
