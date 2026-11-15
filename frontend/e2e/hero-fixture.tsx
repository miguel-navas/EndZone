// Test-only entry: not imported by the production application or included in its build.
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "../src/features/home/Hero";
import "../src/styles/shell.css";
createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <main>
      <p>Teste isolado de apresentação</p>
      <Hero imageSrc="/test-hero.svg" />
    </main>
  </MemoryRouter>,
);
