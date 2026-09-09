'use client';
import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {analyzeIntent} from '../../lib/autopilot/engine';
import {scoreRecommendations} from '../../lib/recommend';
import {track} from '../../lib/client-analytics';
import LeadBox from '../../components/LeadBox';
export default function SearchPage(){
 const params=typeof window!=='undefined'?new URLSearchParams(window.location.search):null;
 const initial=params?.get('q')||''; const [q,setQ]=useState(initial);
 const results=useMemo(()=>scoreRecommendations(q),[q]); const action=analyzeIntent(q)[0];
 useEffect(()=>{if(initial)track('search',undefined,{},initial)},[]);
 function submit(e:React.FormEvent){e.preventDefault();track('search',undefined,{},q);}
 return <main><section className="hero compact"><div className="wrap"><span className="eyebrow">BUSINESS PROBLEM SEARCH</span><h1>What are you trying to solve?</h1><form className="search" onSubmit={submit}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. My ads get sales but I still lose money"/><button className="btn">Search</button></form></div></section><section className="section"><div className="wrap">{q&&<div className="card insight"><span className="tag">INTENT ENGINE</span><h2>{action?.type==='flag_for_review'?'We need more context':action?.type==='create_problem_page'?'New problem opportunity':'Likely path identified'}</h2><p>{action?.reason||'Describe a problem to get recommendations.'}</p></div>}<h2>{results.length?'Recommended tools':'Popular starting points'}</h2><div className="grid">{results.map(r=><Link className="card" href={`/tools/${r.tool.slug}`} key={r.tool.slug} onClick={()=>track('recommendation_click',r.tool.slug,{score:r.score})}><span className="tag">{r.tool.category}</span><h3>{r.tool.name}</h3><p>{r.tool.description}</p><small>{r.reason}</small></Link>)}</div>{q&&<LeadBox problem={q}/>}</div></section></main>
}
