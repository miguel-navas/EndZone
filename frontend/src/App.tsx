import { useEffect, useState } from 'react';
import { House, CalendarDays, Trophy, ChartColumn, Users, UserRound, ChartNoAxesCombined, Newspaper, GitMerge, Medal, BookOpen, Menu, X, type LucideIcon } from 'lucide-react';

type NavigationItem = { label: string; icon: LucideIcon; href: string };
const navigation: NavigationItem[] = [
  { label: 'Início', icon: House, href: '#inicio' },
  { label: 'Jogos', icon: CalendarDays, href: '#jogos' },
  { label: 'Temporada', icon: Trophy, href: '#jogos' },
  { label: 'Classificação', icon: ChartColumn, href: '#classificacao' },
  { label: 'Equipes', icon: Users, href: '#equipes' },
  { label: 'Jogadores', icon: UserRound, href: '#equipes' },
  { label: 'Estatísticas', icon: ChartNoAxesCombined, href: '#classificacao' },
  { label: 'Notícias', icon: Newspaper, href: '#noticias' },
  { label: 'NFL Playoffs', icon: GitMerge, href: '#jogos' },
  { label: 'Super Bowl', icon: Medal, href: '#jogos' },
  { label: 'História e Regras', icon: BookOpen, href: '#noticias' }
];

function Sidebar({ compact, mobileOpen, onNavigate }: { compact: boolean; mobileOpen: boolean; onNavigate: () => void }) {
  const [active, setActive] = useState('Início');
  return <aside id="sidebar" aria-label="Menu principal" className={['sidebar', compact ? 'compact' : '', mobileOpen ? 'mobile-open' : ''].join(' ')}>
    <nav>{navigation.map(({ label, icon: Icon, href }) =>
      <a key={label} href={href} title={compact ? label : undefined} aria-current={active === label ? 'page' : undefined} className={'nav-item' + (active === label ? ' active' : '')} onClick={() => { setActive(label); onNavigate(); }}>
        <Icon size={21} strokeWidth={1.9} aria-hidden="true" /><span>{label}</span>
      </a>)}</nav>
  </aside>;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section className="section" id={id}><h2>{title}</h2><div className="cards">{children}</div></section>;
}
function Card({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <article className="card"><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{children}</p></article>;
}

export function App() {
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const toggleMenu = () => {
    if (window.matchMedia('(max-width: 700px)').matches) setMobileOpen(open => !open);
    else setCompact(value => !value);
  };
  return <div className={'app' + (compact ? ' is-compact' : '')}>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <header className="topbar">
      <button className="menu-button" type="button" onClick={toggleMenu} aria-controls="sidebar" aria-expanded={mobileOpen || (!compact && !window.matchMedia('(max-width: 700px)').matches)} aria-label="Abrir ou recolher menu">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      <a className="brand" href="#inicio">END <span>ZONE</span></a>
      <span className="topbar-caption">Portal do Futebol Americano</span>
    </header>
    {mobileOpen && <button className="overlay" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}
    <Sidebar compact={compact} mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    <main id="conteudo" className="main">
      <section className="hero" id="inicio"><div className="hero-content"><span className="eyebrow">NFL 2026</span><h1>A emoção começa em cada jogada.</h1><p>Jogos, equipes, classificação e notícias do futebol americano em um só lugar.</p><a className="primary-action" href="#jogos">Explorar jogos</a></div></section>
      <Section id="jogos" title="Jogos da semana">
        <Card eyebrow="CALENDÁRIO" title="Próximos confrontos">Aguardando integração com a API de jogos da NFL.</Card>
        <Card eyebrow="RESULTADOS" title="Últimas partidas">Resultados serão apresentados a partir de uma fonte verificada.</Card>
        <Card eyebrow="AO VIVO" title="Acompanhe a rodada">A cobertura ao vivo dependerá do provedor escolhido.</Card>
      </Section>
      <Section id="classificacao" title="Classificação">
        <Card eyebrow="AFC" title="Conferência Americana">Divisões, campanhas e posições serão carregadas da API.</Card>
        <Card eyebrow="NFC" title="Conferência Nacional">Classificação oficial sem placares simulados.</Card>
      </Section>
      <Section id="noticias" title="Notícias">
        <Card eyebrow="EDITORIAL" title="Notícias em preparação">Conteúdo com fonte e data de publicação identificadas.</Card>
        <Card eyebrow="ANÁLISES" title="Destaques da temporada">Espaço reservado para cobertura editorial.</Card>
      </Section>
      <Section id="equipes" title="Equipes da NFL">
        <Card eyebrow="32 FRANQUIAS" title="Explore as equipes">Escudos, uniformes, elencos e estatísticas em futuras integrações.</Card>
      </Section>
      <p className="disclaimer">Protótipo visual. Dados esportivos em tempo real ainda não integrados.</p>
    </main>
  </div>;
}
