'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {tools,categories} from '../lib/tools';
import {recommend} from '../lib/recommend';
import {scoreRecommendations} from '../lib/recommend';

export default function Home(){
 const router=useRouter();
 const [query,setQuery]=useState('');
 const [results,setResults]=useState<typeof tools>([]);
 const [suggestions,setSuggestions]=useState<ReturnType<typeof scoreRecommendations>>([]);
 const [open,setOpen]=useState(false);
 const boxRef=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  if(query.trim().length<2){ setSuggestions([]); setOpen(false); return; }
  const t=setTimeout(()=>{
   const matches=scoreRecommendations(query).slice(0,6);
   setSuggestions(matches);
   setOpen(matches.length>0);
  },150);
  return ()=>clearTimeout(t);
 },[query]);

 useEffect(()=>{
  function onClickOutside(e:MouseEvent){
   if(boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
  }
  document.addEventListener('mousedown',onClickOutside);
  document.addEventListener('touchstart',onClickOutside);
  return ()=>{
   document.removeEventListener('mousedown',onClickOutside);
   document.removeEventListener('touchstart',onClickOutside);
  };
 },[]);

 function search(e:React.FormEvent){
  e.preventDefault();
  setOpen(false);
  setResults(recommend(query));
  document.getElementById('results')?.scrollIntoView({behavior:'smooth'});
 }

 function goToTool(slug:string){
  setOpen(false);
  router.push(`/tools/${slug}`);
 }

 const featured=tools.slice(0,9);

 return <>
  <header className="nav"><div className="wrap navin"><Link className="logo" href="/">Solve<span>Ease</span></Link><nav className="navlinks"><Link href="#tools">Free Tools</Link><Link href="/search">Problem Search</Link><Link href="#how">How it works</Link><Link href="/cleaning">Cleaning</Link></nav></div></header>
  <main>
   <section className="hero"><div className="wrap"><span className="eyebrow">FREE BUSINESS PROBLEM-SOLVING PLATFORM</span><h1>Don't just find a tool. <br/>Find the next best solution.</h1><p>Describe a business problem in plain language. SolveEase routes you to practical calculators, diagnostics and useful solutions—starting with free tools.</p>
    <div className="searchwrap" ref={boxRef}>
     <form className="search" onSubmit={search}>
      <input
        value={query}
        onChange={e=>setQuery(e.target.value)}
        onFocus={()=>{ if(suggestions.length) setOpen(true); }}
        placeholder="e.g. My cleaning jobs are profitable but I don't know what to charge…"
        autoComplete="off"
      />
      <button className="btn">Find a solution</button>
     </form>
     {open && suggestions.length>0 && (
      <div className="suggestions">
       {suggestions.map(s=>(
        <div className="suggestion" key={s.tool.slug} onClick={()=>goToTool(s.tool.slug)}>
         <span className="tag">{s.tool.category}</span>
         <b>{s.tool.name}</b>
         <span>{s.tool.description}</span>
        </div>
       ))}
      </div>
     )}
    </div>
    <div className="chips">{categories.slice(0,6).map(c=><span className="chip" key={c}>{c}</span>)}</div>
   </div></section>
   <section className="section" id="tools"><div className="wrap"><h2>{results.length?'Recommended for you':'Start with a free tool'}</h2><p className="sectionlead">{results.length?'Based on the problem you described.':'Useful tools are the platform’s traffic and discovery layer.'}</p><div className="grid">{(results.length?results:featured).map(t=><Link className="card" href={`/tools/${t.slug}`} key={t.slug}><span className="tag">{t.category}</span><h3>{t.name}</h3><p>{t.description}</p></Link>)}</div></div></section>
   <section className="section" id="results"><div className="wrap"><h2>The SolveEase flywheel</h2><p className="sectionlead">The platform is designed to turn genuine utility into discovery, recommendations and repeat usage.</p><div className="steps">{[['01','Problem','Tell us what you are trying to solve.'],['02','Diagnose','Use a focused free tool to understand the numbers.'],['03','Solution','Get the next relevant tool, guide or solution.'],['04','Return','Save, share and revisit useful business workflows.']].map(x=><div className="card step" key={x[0]}><span className="tag">{x[0]}</span><strong>{x[1]}</strong><span>{x[2]}</span></div>)}</div></div></section>
   <section className="section"><div className="wrap"><div className="card"><span className="tag">V3 CONVERSION ENGINE</span><h2>From useful answer to useful next step</h2><p className="sectionlead">SolveEase is designed to measure problem intent, recommend relevant solutions and capture leads only when users choose to engage.</p><Link className="btn" href="/dashboard">View platform engine →</Link></div></div></section>
   <section className="section"><div className="wrap"><div className="card"><span className="tag">CLEANING BUSINESS</span><h2>A dedicated operating toolkit</h2><p className="sectionlead">Pricing, job estimates, labor, travel, profit, quotes and follow-up tools in one workflow.</p><Link className="btn" href="/cleaning">Explore Cleaning Tools →</Link></div></div></section>
  </main><footer className="footer"><div className="wrap">© 2026 SolveEase. Built around useful tools, transparent recommendations and legitimate discovery.</div></footer>
 </>;
}
