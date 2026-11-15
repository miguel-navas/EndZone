import { Hero } from "../features/home/Hero";
import { ContentRegion } from "../features/home/ContentRegion";
const regions = [
  ["standings", "Classificação AFC/NFC"],
  ["games", "Jogos da semana"],
  ["events", "Próximos eventos"],
  ["news", "Últimas notícias"],
  ["leaders", "Líderes da temporada"],
  ["teams", "Equipes"],
];
export function Home() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">BEM-VINDO AO END ZONE</p>
          <h1 tabIndex={-1}>Início</h1>
        </div>
        <span className="page-note">Futebol americano, em um só lugar.</span>
      </div>
      <Hero />
      <div className="home-regions">
        {regions.map(([id, title]) => (
          <ContentRegion key={id} id={id} title={title} />
        ))}
      </div>
    </>
  );
}
