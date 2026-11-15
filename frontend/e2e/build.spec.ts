import { test, expect } from "@playwright/test";
test("build de produção: home, seção direta e destino desconhecido", async ({
  page,
}) => {
  for (const [path, title] of [
    ["/", "Início"],
    ["/jogos", "Jogos"],
    ["/destino-inexistente", "Página não encontrada"],
  ]) {
    await page.goto(`http://127.0.0.1:4175${path}`);
    await expect(page).toHaveTitle(`${title} | END ZONE`);
    await expect(
      page.getByRole("heading", { level: 1, name: title, exact: true }),
    ).toBeVisible();
    if (path === "/")
      await expect(page.getByText("Conteúdo ainda não disponível")).toHaveCount(
        6,
      );
    if (path === "/jogos")
      await expect(
        page.getByRole("heading", { name: "Em preparação" }),
      ).toBeVisible();
    const scripts = await page
      .locator("script[src]")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("src")));
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toMatch(/^\/assets\/.*\.js$/);
    const bundle = await page.request.get(`http://127.0.0.1:4175${scripts[0]}`);
    expect(await bundle.text()).not.toContain("react.development.js");
  }
});
