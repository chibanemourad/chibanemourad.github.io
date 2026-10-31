import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const path of [
  "/",
  "/about/",
  "/projects/",
  "/blog/",
  "/404.html",
  "/projects/shared-dotnet-builds/",
  "/projects/modular-point-of-care/",
  "/projects/carbon-management/",
]) {
  test(`${path} is accessible and navigable`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  });
}
test("discovery files are generated", async ({ request }) => {
  for (const path of ["/feed.xml", "/sitemap.xml"]) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});

test("profile and featured work reflect verified career details", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("Cross-Functional Technical Lead at Diagnostica Stago.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "From the notebook" }),
  ).toHaveCount(0);
  await expect(page.locator(".card h3 a")).toHaveText([
    "Bringing consistency to builds across 500 .NET projects",
    "Building a modular foundation for point-of-care software",
    "Turning carbon data into actionable insights at CO2 AI",
  ]);
  await expect(page.getByRole("link", { name: "View résumé" })).toHaveAttribute(
    "href",
    "https://cvdesignr.com/p/5fe1cfcb33f89",
  );
  const person = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(person.worksFor.name).toBe("Diagnostica Stago");
  await page.goto("/about/");
  const current = page
    .locator("article")
    .filter({ hasText: "March 2025–present" });
  await expect(current).toContainText("Cross-Functional Technical Lead");
  await expect(current).not.toContainText("MSBuild");
});
