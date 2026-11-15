import { test, expect, type Page, type Locator } from "@playwright/test";
// Normative expectation deliberately independent of the implementation catalog.
const destinations = [
  { path: "/", label: "Início" },
  { path: "/jogos", label: "Jogos" },
  { path: "/temporada", label: "Temporada" },
  { path: "/classificacao", label: "Classificação" },
  { path: "/equipes", label: "Equipes" },
  { path: "/jogadores", label: "Jogadores" },
  { path: "/estatisticas", label: "Estatísticas" },
  { path: "/noticias", label: "Notícias" },
  { path: "/playoffs", label: "NFL Playoffs" },
  { path: "/super-bowl", label: "Super Bowl" },
  { path: "/historia", label: "História" },
  { path: "/regras", label: "Regras" },
];
async function tabTo(page: Page, target: Locator, backwards = false) {
  for (let step = 0; step < 40; step++) {
    if (await target.evaluate((el) => el === document.activeElement)) return;
    await page.keyboard.press(backwards ? "Shift+Tab" : "Tab");
  }
  await expect(target).toBeFocused();
}
test("cliques modificados preservam drawer e foco da página atual", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const link = page
    .getByRole("dialog")
    .getByRole("link", { name: "Jogos", exact: true });
  await tabTo(page, link);
  await link.click({ modifiers: ["Control"] });
  await expect(page.getByRole("dialog")).toBeVisible();
  // Cancel only the browser's native default after React has handled bubbling,
  // so platform-specific Meta/Alt behavior cannot navigate this Windows tab.
  await page.evaluate(() =>
    document.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        event.preventDefault();
    }),
  );
  for (const modifier of ["ctrlKey", "metaKey", "shiftKey", "altKey"]) {
    await link.dispatchEvent("click", { button: 0, [modifier]: true });
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(link).toBeFocused();
    await expect(page).toHaveURL("/");
  }
});
test("histórico SPA fecha drawer aberto antes de focar destino", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("link", { name: "Explorar temporada" }).click();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Jogos", exact: true })
    .click();
  for (const direction of ["back", "forward"]) {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    if (direction === "back") await page.goBack();
    else await page.goForward();
    await expect(page).toHaveURL(
      direction === "back" ? "/temporada" : "/jogos",
    );
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  }
});
test("normaliza barras finais e preserva query/hash com título e ativo coerentes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/jogos///?origem=teste#conteudo");
  await expect(page).toHaveURL("/jogos?origem=teste#conteudo");
  await expect(page).toHaveTitle("Jogos | END ZONE");
  await expect(page.locator('.sidebar [aria-current="page"]')).toHaveCount(1);
  await expect(page.locator('.sidebar [aria-current="page"]')).toHaveAttribute(
    "href",
    "/jogos",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Jogos" }),
  ).toBeFocused();
});
test("header sem sobreposição no tablet com texto 200%", async ({ page }) => {
  for (const width of [601, 650, 768]) {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto("/");
    await page.addStyleTag({ content: "html { font-size: 200% }" });
    const brand = (await page.locator(".header-start").boundingBox())!;
    const search = (await page.locator(".search-unavailable").boundingBox())!;
    expect(
      brand.x + brand.width <= search.x || brand.y + brand.height <= search.y,
    ).toBeTruthy();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});
test("todas as rotas, acesso direto, recarga, item ativo, título e foco", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const item of destinations) {
    await page.goto(item.path);
    await expect(
      page.getByRole("heading", { level: 1, name: item.label, exact: true }),
    ).toBeFocused();
    await expect(page).toHaveTitle(`${item.label} | END ZONE`);
    await expect(page.locator('.sidebar [aria-current="page"]')).toHaveCount(1);
    await expect(
      page.locator('.sidebar [aria-current="page"]'),
    ).toHaveAttribute("href", item.path);
    if (item.path !== "/")
      await expect(
        page.getByRole("heading", { name: "Em preparação" }),
      ).toBeVisible();
    await page.reload();
    await expect(page).toHaveTitle(`${item.label} | END ZONE`);
  }
  await page.goto("/destino-inexistente");
  await expect(
    page.getByRole("heading", { name: "Página não encontrada" }),
  ).toBeFocused();
  await expect(page.locator('[aria-current="page"]')).toHaveCount(0);
  await page.getByRole("link", { name: "Voltar ao Início" }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});
test("percurso integrado e sidebar por teclado sem persistência", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByText("Busca em preparação")).toBeVisible();
  await tabTo(page, page.getByRole("button", { name: "Recolher menu" }), true);
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("button", { name: "Expandir menu" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.locator(".sidebar").getByRole("link", { name: "Jogos", exact: true }),
  ).toHaveAccessibleName("Jogos");
  await page.keyboard.press("Tab");
  await expect(
    page.locator(".sidebar").getByRole("link", { name: "Início", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.locator(".sidebar").getByRole("link", { name: "Jogos", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/jogos");
  await tabTo(page, page.getByRole("button", { name: "Expandir menu" }), true);
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Recolher menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "END ZONE — Início" }).click();
  await tabTo(page, page.getByRole("link", { name: "Explorar temporada" }));
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await tabTo(
    page,
    page.locator(".sidebar").getByRole("link", { name: "Jogos", exact: true }),
    true,
  );
  await page.keyboard.press("Enter");
  await page.goBack();
  await expect(page).toHaveURL("/temporada");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL("/jogos");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Recolher menu" }),
  ).toBeVisible();
  await page.keyboard.press("Control+Home");
  await tabTo(
    page,
    page.getByRole("link", { name: "Pular para o conteúdo" }),
    true,
  );
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
});
test("drawer contém foco, fecha por Escape/ação/navegação e libera fundo no resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();
  await tabTo(page, trigger, true);
  await page.keyboard.press("Enter");
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((el) => el.matches(":modal"))).toBeTruthy();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.getByRole("button", { name: "Fechar menu" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Regras", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Fechar menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Fechar menu" }).click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Jogos", exact: true }).click();
  await expect(page).toHaveURL("/jogos");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.goBack();
  await page.getByRole("link", { name: "Explorar temporada" }).click();
  await expect(page).toHaveURL("/temporada");
  await page.goBack();
  await page.goForward();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Recolher menu" }),
  ).toBeFocused();
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(trigger).toBeFocused();
  await expect(dialog).not.toBeVisible();
  await page.getByRole("link", { name: "Voltar ao Início" }).click();
  await expect(page).toHaveURL("/");
});
test("modo normal sem requests externos nem dados fabricados e movimento reduzido", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173"))
      external.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByText("Conteúdo ainda não disponível")).toHaveCount(6);
  await expect(page.locator("img")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /login|notifica|usuário/i }),
  ).toHaveCount(0);
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  expect(await page.locator("body").innerText()).not.toMatch(
    /NFL Zone|ao vivo|\d{1,2}:\d{2}/i,
  );
  expect(external).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "Recolher menu" }).click();
  expect(
    await page
      .locator(".sidebar")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
});
for (const width of [320, 360, 768, 1024, 1440]) {
  test(`reflow e capturas home/seção em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const [path, name] of [
      ["/", "home"],
      ["/temporada", "temporada"],
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.screenshot({
        path: `../docs/evidence/${name}-${width}.png`,
        fullPage: true,
      });
    }
  });
}
test("texto a 200% em desktop preserva controles e regiões", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  for (const [path, name] of [
    ["/", "home"],
    ["/temporada", "temporada"],
  ]) {
    await page.goto(path);
    await page.addStyleTag({ content: "html { font-size: 200% }" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.screenshot({
      path: `../docs/evidence/${name}-text-200.png`,
      fullPage: true,
    });
  }
});
test("imagem decorativa controlada preserva composição e falha para fallback", async ({
  page,
}) => {
  const fixture =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#183646"/><path d="M900 0V900M1200 0V900M1500 0V900" stroke="#5b756c" stroke-width="8"/></svg>';
  await page.route("**/test-hero.svg", (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: fixture }),
  );
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/e2e/hero.html");
    await expect(page.locator(".hero-image")).toHaveJSProperty(
      "naturalWidth",
      1600,
    );
    expect(
      await page
        .locator(".hero-image")
        .evaluate((el) => getComputedStyle(el).objectFit),
    ).toBe("cover");
    await expect(
      page.getByRole("link", { name: "Explorar temporada" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page.screenshot({
      path: `../docs/evidence/hero-fixture-${width}.png`,
      fullPage: true,
    });
  }
  await page.unroute("**/test-hero.svg");
  await page.route("**/test-hero.svg", (route) => route.abort());
  await page.reload();
  await expect(page.locator(".hero-image")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "A central do futebol americano" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explorar temporada" }),
  ).toHaveAttribute("href", "/temporada");
  expect(
    (await page.locator(".hero").boundingBox())!.height,
  ).toBeGreaterThanOrEqual(360);
  await page.screenshot({
    path: "../docs/evidence/hero-image-failure.png",
    fullPage: true,
  });
});
