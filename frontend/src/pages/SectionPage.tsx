import { Link } from "react-router-dom";
export function SectionPage({ title }: { title: string }) {
  return (
    <div className="section-page">
      <p className="eyebrow">EXPLORE O END ZONE</p>
      <h1 tabIndex={-1}>{title}</h1>
      <div className="preparation">
        <span aria-hidden="true">◇</span>
        <h2>Em preparação</h2>
        <p>
          Este espaço está sendo preparado para você acompanhar o futebol
          americano.
        </p>
        <Link className="text-link" to="/">
          Voltar ao Início <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="section-page">
      <p className="eyebrow">END ZONE</p>
      <h1 tabIndex={-1}>Página não encontrada</h1>
      <p>O destino que você procura não está disponível.</p>
      <Link className="button" to="/">
        Voltar ao Início
      </Link>
    </div>
  );
}
