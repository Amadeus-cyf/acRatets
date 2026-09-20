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
    await expect(page.getByText("No anime found.")).toBeVisible();
    expect(pageErrors).toEqual([]);
});

test("loads responsive WebP assets on a mobile viewport", async ({ page }) => {
    const imageRequests: string[] = [];
    page.on("request", (request) => {
        if (request.resourceType() === "image") {
            imageRequests.push(request.url());
        }
    });
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/", { waitUntil: "networkidle" });

    expect(
        imageRequests.some((url) => url.includes("home_background_mobile"))
    ).toBe(true);
    expect(
        imageRequests.every((url) => !/\.(?:jpe?g|png)(?:\?|$)/i.test(url))
    ).toBe(true);
});
