import { useEffect, useState } from 'react';
import { House, CalendarDays, Trophy, ChartColumn, Users, UserRound, ChartNoAxesCombined, Newspaper, GitMerge, Medal, BookOpen, Menu, X, ChevronRight, Clock3, Radio, Shield, Info, type LucideIcon } from 'lucide-react';

type NavigationItem = { label: string; icon: LucideIcon; href: string };
const navigation: NavigationItem[] = [
  { label: 'Início', icon: House, href: '#inicio' },
  { label: 'Jogos', icon: CalendarDays, href: '#jogos' },
  { label: 'Temporada', icon: Trophy, href: '#jogos' },
  { label: 'Classificação', icon: ChartColumn, href: '#classificacao' },
  { label: 'Equipes', icon: Users, href: '#equipes' },
  { label: 'Jogadores', icon: UserRound, href: '#equipes' },
  { label: 'Estatísticas', icon: ChartNoAxesCombined, href: '#lideres' },
  { label: 'Notícias', icon: Newspaper, href: '#noticias' },
  { label: 'NFL Playoffs', icon: GitMerge, href: '#eventos' },
  { label: 'Super Bowl', icon: Medal, href: '#eventos' },
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

function SectionHeading({ title, eyebrow, icon: Icon }: { title: string; eyebrow?: string; icon: LucideIcon }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2><Icon size={22} aria-hidden="true" />{title}</h2></div><span className="section-status">Em preparação</span></div>;
}

function EmptyPanel({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return <div className="empty-panel" role="status"><Icon size={28} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></div>;
}

function StandingsPanel() {
  const [conference, setConference] = useState<'AFC' | 'NFC'>('AFC');
  return <section id="classificacao" className="dashboard-panel standings-panel" aria-label="Classificação">
    <SectionHeading title="Classificação" eyebrow="TEMPORADA NFL" icon={ChartColumn} />
    <div className="conference-tabs" role="group" aria-label="Conferência">
      {(['AFC', 'NFC'] as const).map(item => <button key={item} type="button" aria-pressed={conference === item} className={conference === item ? 'selected' : ''} onClick={() => setConference(item)}>{item}</button>)}
    </div>
    <div className="standings-table"><div className="standings-columns"><span>DIVISÃO / EQUIPE</span><span>V</span><span>D</span></div>
      <EmptyPanel icon={Shield} title={conference + ' — dados pendentes'} description="As posições e campanhas serão exibidas após a integração com uma fonte verificada." />
    </div>
  </section>;
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
      <div className="dashboard-topline"><span><Radio size={15} aria-hidden="true" /> CENTRAL END ZONE</span><span>Conteúdo em desenvolvimento</span></div>
      <div className="dashboard-intro"><div><span className="eyebrow">FUTEBOL AMERICANO • BRASIL</span><h1>Viva cada <em>jogada.</em></h1><p>Seu ponto de encontro com o universo da NFL.</p></div><span className="season-label">TEMPORADA 2026</span></div>
      <div className="dashboard-lead">
        <section className="hero" id="inicio" aria-label="Destaque EndZone"><div className="hero-content"><span className="hero-kicker">A EXPERIÊNCIA END ZONE</span><h2>O jogo vai<br/><strong>além do campo.</strong></h2><p>Jogos, equipes, classificação, notícias e estatísticas em um só lugar.</p><a className="primary-action" href="#jogos">Explorar jogos <ChevronRight size={18} aria-hidden="true" /></a></div><div className="hero-field" aria-hidden="true"><span>END</span><span>ZONE</span></div><div className="hero-caption">A PAIXÃO PELO FUTEBOL AMERICANO</div></section>
        <StandingsPanel />
      </div>
      <section className="dashboard-section" id="jogos"><SectionHeading title="Jogos da semana" eyebrow="CALENDÁRIO E RESULTADOS" icon={CalendarDays} />
        <div className="game-grid">{['Próximos jogos', 'Resultados', 'Ao vivo'].map((title, i) => <article className="game-card" key={title}><div className="game-card-top"><span>{['AGENDA', 'PLACARES', 'COBERTURA'][i]}</span>{i === 2 ? <Radio size={17} /> : <Clock3 size={17} />}</div><div className="game-matchup"><div className="team-placeholder">—</div><span>VS</span><div className="team-placeholder">—</div></div><h3>{title}</h3><p>{['Aguardando calendário de partidas verificado.', 'Aguardando resultados da fonte oficial.', 'Disponível após integração de dados ao vivo.'][i]}</p></article>)}</div>
      </section>
      <div className="dashboard-secondary">
        <section className="dashboard-panel" id="eventos"><SectionHeading title="Próximos eventos" eyebrow="FIQUE POR DENTRO" icon={Trophy} /><EmptyPanel icon={CalendarDays} title="Agenda em preparação" description="Datas dos playoffs, Super Bowl e eventos serão confirmadas antes da publicação." /></section>
        <section className="dashboard-panel" id="lideres"><SectionHeading title="Líderes da temporada" eyebrow="ESTATÍSTICAS" icon={ChartNoAxesCombined} /><EmptyPanel icon={ChartColumn} title="Rankings em preparação" description="Líderes por jardas, touchdowns e outras métricas, com fonte e período identificados." /></section>
      </div>
      <section className="dashboard-section" id="noticias"><SectionHeading title="Últimas notícias" eyebrow="EDITORIAL END ZONE" icon={Newspaper} /><div className="news-grid">{['Destaques da NFL', 'Análises e bastidores', 'História e regras'].map((title, i) => <article className="news-card" key={title}><div className={'news-visual news-visual-' + i}><Newspaper size={32} aria-hidden="true" /></div><div className="news-body"><span className="eyebrow">CONTEÚDO EM PREPARAÇÃO</span><h3>{title}</h3><p>Publicações com fonte, autoria e data verificadas.</p></div></article>)}</div></section>
      <section className="dashboard-section" id="equipes"><SectionHeading title="Equipes da NFL" eyebrow="CONHEÇA AS FRANQUIAS" icon={Users} /><div className="teams-placeholder"><Shield size={32} aria-hidden="true" /><div><h3>32 franquias. Uma paixão.</h3><p>Em breve: equipes, conferências, divisões, elencos e estatísticas.</p></div></div></section>
      <p className="disclaimer"><Info size={15} aria-hidden="true" /> Protótipo visual. Dados esportivos e imagens finais ainda não integrados. Nenhum placar ou ranking exibido é simulado como real.</p>
    </main>
  </div>;
}
