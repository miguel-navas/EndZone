import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronRight, Search, Shield, Users } from 'lucide-react';
import { teams, divisions, type Team } from './data/teams';
const labels = { East:'Leste', North:'Norte', South:'Sul', West:'Oeste' };
const tabs = ['Visão geral','Elenco','Jogos','Estatísticas','História','Estádio','Títulos'] as const;
function TeamMark({team}:{team:Team}) {
 return team.logoUrl ? <img className="team-mark" src={team.logoUrl} alt={team.name} /> : <span className="team-mark" aria-hidden="true">{team.code}</span>;
}
export function TeamsPage() {
 const [hash,setHash]=useState(window.location.hash);
 const [filter,setFilter]=useState<'Todas'|'AFC'|'NFC'>('Todas');
 const [query,setQuery]=useState('');
 const [tab,setTab]=useState<typeof tabs[number]>('Visão geral');
 useEffect(()=>{const update=()=>{setHash(window.location.hash);setTab('Visão geral');};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
 const code=hash.startsWith('#equipes/')?hash.slice(9):null;
 const team=teams.find(t=>t.code===code);
 const visible=teams.filter(t=>(filter==='Todas'||t.conference===filter)&&(t.name+' '+t.code).toLowerCase().includes(query.trim().toLowerCase()));
 if(code) return <section id="equipes" className="teams-module"><a className="teams-back" href="#equipes"><ArrowLeft size={18}/> Todas as equipes</a>{team?<><div className="team-profile"><TeamMark team={team}/><div><span className="eyebrow">{team.conference} • {labels[team.division]}</span><h2>{team.name}</h2><p>Franquia da National Football League</p></div></div><div className="team-tabs" role="group" aria-label="Seções da equipe">{tabs.map(t=><button key={t} type="button" aria-pressed={tab===t} onClick={()=>setTab(t)}>{t}</button>)}</div><div className="team-detail" aria-live="polite"><h3>{tab}</h3>{tab==='Visão geral'?<><dl><dt>Nome</dt><dd>{team.name}</dd><dt>Sigla</dt><dd>{team.code}</dd><dt>Conferência</dt><dd>{team.conference}</dd><dt>Divisão</dt><dd>{labels[team.division]}</dd></dl><p>Demais informações cadastrais e imagens oficiais aguardam verificação.</p></>:<p>Conteúdo aguardando integração com fonte verificada.</p>}</div></>:<p role="status">Equipe não encontrada.</p>}</section>;
 return <section id="equipes" className="teams-module"><div className="teams-title"><Users size={28}/><div><span className="eyebrow">CONHEÇA AS FRANQUIAS</span><h2>Equipes da NFL</h2><p>32 equipes • 2 conferências • 8 divisões</p></div></div><div className="teams-controls"><div className="team-tabs" role="group" aria-label="Conferência">{(['Todas','AFC','NFC'] as const).map(c=><button type="button" key={c} aria-pressed={filter===c} onClick={()=>setFilter(c)}>{c}</button>)}</div><label className="team-search"><Search size={18}/><input aria-label="Buscar equipe" placeholder="Buscar equipe ou sigla" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><p className="teams-count" role="status">{visible.length} equipes encontradas</p>{(['AFC','NFC'] as const).map(c=>visible.some(t=>t.conference===c)&&<div key={c} className={'team-conference '+c.toLowerCase()}><h3>{c} — {c==='AFC'?'American Football Conference':'National Football Conference'}</h3><div className="team-divisions">{divisions.map(d=>{const list=visible.filter(t=>t.conference===c&&t.division===d);return list.length>0&&<section key={d} className="team-division"><h4>{labels[d]}</h4>{list.map(t=><a className="team-link" key={t.code} href={'#equipes/'+t.code}><TeamMark team={t}/><span>{t.name}</span><ChevronRight size={16}/></a>)}</section>})}</div></div>)}{!visible.length&&<p>Nenhuma equipe corresponde à busca.</p>}<p className="teams-count"><Shield size={14}/> Escudos e capacetes oficiais serão adicionados após validação dos direitos de uso.</p></section>;
}
