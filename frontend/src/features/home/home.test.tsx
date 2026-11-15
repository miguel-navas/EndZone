import { render, screen, fireEvent, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ContentRegion } from "./ContentRegion";
import { Hero } from "./Hero";
import { Home } from "../../pages/Home";
describe("contrato local das regiões", () => {
  it("inicia as seis regiões vazias, sem dados, loading ou imagens publicadas", () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Conteúdo ainda não disponível")).toHaveLength(
      6,
    );
    expect(screen.getAllByRole("region")).toHaveLength(7);
    expect(screen.queryByText("Carregando conteúdo")).not.toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).not.toMatch(
      /NFL Zone|ao vivo|202\d|\d{1,2}:\d{2}/i,
    );
  });
  it("mantém erro e loading isolados, sem ação inoperante", () => {
    render(
      <>
        <ContentRegion
          id="news"
          title="Últimas notícias"
          initialState="error"
        />
        <ContentRegion
          id="games"
          title="Jogos da semana"
          initialState="loading"
        />
        <ContentRegion id="teams" title="Equipes" />
      </>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível carregar este conteúdo",
    );
    expect(
      within(screen.getByRole("region", { name: "Jogos da semana" })).getByRole(
        "status",
      ),
    ).toHaveTextContent("Carregando conteúdo");
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("Conteúdo ainda não disponível")).toBeVisible();
  });
  it.each([false, true])(
    "executa recuperação uma vez, com estado intermediário e rejeição=%s",
    async (fail) => {
      let resolve!: () => void;
      let reject!: () => void;
      const recover = vi.fn(
        () =>
          new Promise<void>((yes, no) => {
            resolve = yes;
            reject = no;
          }),
      );
      render(
        <ContentRegion
          id="news"
          title="Últimas notícias"
          initialState="error"
          recover={recover}
        />,
      );
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Tentar novamente" }),
      );
      expect(screen.getByRole("status")).toHaveTextContent(
        "Últimas notícias: Carregando conteúdo",
      );
      expect(
        screen.getByRole("status").closest('[aria-busy="true"]'),
      ).toBeNull();
      expect(screen.getByRole("button")).toBeDisabled();
      await user.click(screen.getByRole("button"));
      expect(recover).toHaveBeenCalledTimes(1);
      await act(async () => (fail ? reject() : resolve()));
      expect(
        screen.getByText(
          fail
            ? "Não foi possível carregar este conteúdo"
            : "Conteúdo ainda não disponível",
        ),
      ).toBeVisible();
      if (!fail) expect(screen.getByRole("status")).toHaveFocus();
    },
  );
  it("não rouba foco movido para outra região durante recuperação", async () => {
    let resolve!: () => void;
    render(
      <>
        <ContentRegion
          id="news"
          title="Últimas notícias"
          initialState="error"
          recover={() =>
            new Promise<void>((yes) => {
              resolve = yes;
            })
          }
        />
        <button>Outra ação</button>
      </>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));
    await user.click(screen.getByRole("button", { name: "Outra ação" }));
    await act(async () => resolve());
    expect(screen.getByRole("button", { name: "Outra ação" })).toHaveFocus();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Últimas notícias: Conteúdo ainda não disponível",
    );
  });
  it("remove imagem quebrada e preserva texto, destino e espaço do hero", () => {
    const { container } = render(
      <MemoryRouter>
        <Hero imageSrc="/fixture.png" />
      </MemoryRouter>,
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
    expect(
      screen.getByRole("heading", { name: "A central do futebol americano" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Explorar temporada" }),
    ).toHaveAttribute("href", "/temporada");
    expect(screen.getByRole("region")).toHaveClass("hero");
  });
});
