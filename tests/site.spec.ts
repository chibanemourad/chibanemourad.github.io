import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const colorScheme of ["light", "dark"] as const) {
  for (const path of [
    "/",
    "/about/",
    "/design-system/",
    "/projects/",
    "/blog/",
    "/404.html",
    "/projects/shared-dotnet-builds/",
    "/projects/modular-point-of-care/",
    "/projects/carbon-management/",
  ]) {
    test(`${path} is accessible and navigable in ${colorScheme}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
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

test("theme follows system until toggled and persists overrides", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Switch to light theme" }),
  ).toBeVisible();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await page.goto("/about/");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
});

for (const preference of ["system", "dark"]) {
  test(`printing uses light colors with ${preference} dark appearance`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    if (preference === "dark") {
      await page.getByRole("button", { name: "Switch to light theme" }).click();
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    }
    await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
    await expect(page.locator("html")).toHaveCSS("color", "rgb(30, 41, 39)");
    await expect(page.locator("html")).toHaveCSS(
      "background-color",
      "rgb(247, 248, 242)",
    );
    await expect(page.locator(".theme-control")).toBeHidden();
  });
}

for (const colorScheme of ["light", "dark"] as const) {
  test(`catalog supports ${colorScheme} appearance and screenshots`, async ({
    page,
  }, info) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/design-system/");
    expect(
      (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await info.attach(`catalog-${colorScheme}-${width}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
  });
}

test("theme changes synchronize between tabs", async ({ page, context }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/about/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(other.locator("html")).toHaveCSS("color-scheme", "dark");
});

test("system theme works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/design-system/");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(page.locator(".theme-control")).toBeHidden();
  await context.close();
});

test("toggle remains usable when storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Blocked");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Switch to dark theme" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(
    page.getByRole("button", { name: "Switch to light theme" }),
  ).toBeFocused();
});
