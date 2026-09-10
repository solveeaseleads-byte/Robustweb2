
'use client';
import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {tools,categories} from '../lib/tools';
import {recommend} from '../lib/recommend';

export default function Home(){
 const router=useRouter();
 const [query,setQuery]=useState(''); const [results,setResults]=useState<typeof tools>([]);
 function search(e:React.FormEvent){
  e.preventDefault();
  const matches=recommend(query);
  if(matches.length){router.push(`/tools/${matches[0].slug}`);return;}
  setResults(matches);
  document.getElementById('results')?.scrollIntoView({behavior:'smooth'});
 }
 const featured=tools.slice(0,9); const categoryCount=categories.map(c=>({name:c,count:tools.filter(t=>t.category===c).length}));
 return <>
  <header className="nav"><div className="wrap navin"><Link className="logo" href="/">Solve<span>Ease</span></Link><nav className="navlinks"><Link href="#tools">Free Tools</Link><Link href="/search">Problem Search</Link><Link href="#how">How it works</Link><Link href="/cleaning">Cleaning</Link><Link href="/audits">Audits</Link></nav></div></header>
  <main>
   <section className="hero"><div className="wrap"><span className="eyebrow">FREE BUSINESS PROBLEM-SOLVING PLATFORM</span><h1>Don't just find a tool. <br/>Find the next best solution.</h1><p>Describe a business problem in plain language. SolveEase routes you to practical calculators, diagnostics and useful solutions—starting with free tools.</p>
    <form className="search" onSubmit={search}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. My cleaning jobs are profitable but I don't know what to charge…"/><button className="btn">Find a solution</button></form>
    <div className="chips">{categories.slice(0,6).map(c=><span className="chip" key={c}>{c}</span>)}</div>
   </div></section>
   <section className="section" id="tools"><div className="wrap"><h2>{results.length?'Recommended for you':'Start with a free tool'}</h2><p className="sectionlead">{results.length?'Based on the problem you described.':'Useful tools are the platform’s traffic and discovery layer.'}</p><div className="grid">{(results.length?results:featured).map(t=><Link className="card" href={`/tools/${t.slug}`} key={t.slug}><span className="tag">{t.category}</span><h3>{t.name}</h3><p>{t.description}</p></Link>)}</div></div></section>
   <section className="section"><div className="wrap"><h2>Explore by business problem</h2><p className="sectionlead">Jump directly into a practical toolkit instead of searching through a generic directory.</p><div className="grid">{categoryCount.map(c=><Link className="card" href={`/search?category=${encodeURIComponent(c.name)}`} key={c.name}><span className="tag">{c.count} TOOLS</span><h3>{c.name}</h3><p>Practical calculators and diagnostics for this area.</p></Link>)}</div></div></section><section className="section" id="results"><div className="wrap"><h2>The SolveEase flywheel</h2><p className="sectionlead">The platform is designed to turn genuine utility into discovery, recommendations and repeat usage.</p><div className="steps">{[['01','Problem','Tell us what you are trying to solve.'],['02','Diagnose','Use a focused free tool to understand the numbers.'],['03','Solution','Get the next relevant tool, guide or solution.'],['04','Return','Save, share and revisit useful business workflows.']].map(x=><div className="card step" key={x[0]}><span className="tag">{x[0]}</span><strong>{x[1]}</strong><span>{x[2]}</span></div>)}</div></div></section>
   <section className="section"><div className="wrap"><div className="card"><span className="tag">AUTOPILOT DISCOVERY</span><h2>Find problems, not just keywords.</h2><p className="sectionlead">SolveEase turns real searches and tool usage into ranked opportunities for better tools, guides and solution pathways.</p><Link className="btn" href="/search">Open Problem Finder →</Link></div></div></section><section className="section"><div className="wrap"><div className="card"><span className="tag">V3 CONVERSION ENGINE</span><h2>From useful answer to useful next step</h2><p className="sectionlead">SolveEase is designed to measure problem intent, recommend relevant solutions and capture leads only when users choose to engage.</p><Link className="btn" href="/dashboard">View platform engine →</Link></div></div></section>
   <section className="section"><div className="wrap"><div className="card"><span className="tag">CLEANING BUSINESS</span><h2>A dedicated operating toolkit</h2><p className="sectionlead">Pricing, job estimates, labor, travel, profit, quotes and follow-up tools in one workflow.</p><Link className="btn" href="/cleaning">Explore Cleaning Tools →</Link></div></div></section>
  </main><footer className="footer"><div className="wrap">© 2026 SolveEase. Built around useful tools, transparent recommendations and legitimate discovery.</div></footer>
 </>;
}
