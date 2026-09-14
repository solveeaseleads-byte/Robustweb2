'use client';
import {useEffect,useState} from 'react';

type Data={totalEvents:number;searches:number;leads:number;solutionClicks:number;topQueries:{query:string;count:number}[];topTools:{slug:string;count:number}[];opportunities:{title:string;reason:string;priority:string}[]};

export default function Dashboard(){
 const [data,setData]=useState<Data|null>(null);
 const [error,setError]=useState('');
 const [token,setToken]=useState('');
 const [needsToken,setNeedsToken]=useState(false);

 function load(authToken?:string){
  const headers:Record<string,string> = {};
  const t = authToken ?? (typeof window!=='undefined' ? window.localStorage.getItem('dashboard_token') || '' : '');
  if(t) headers['authorization'] = `Bearer ${t}`;
  fetch('/api/dashboard',{headers})
   .then(r=>r.json().then(x=>({status:r.status,body:x})))
   .then(({status,body})=>{
     if(status===401){ setNeedsToken(true); setError(''); return; }
     if(body.ok){ setNeedsToken(false); setData(body.insights); }
     else setError(body.error||'No data');
   })
   .catch(()=>setError('Dashboard unavailable'));
 }

 useEffect(()=>{ load(); },[]);

 function submitToken(e:React.FormEvent){
  e.preventDefault();
  if(typeof window!=='undefined') window.localStorage.setItem('dashboard_token',token);
  load(token);
 }

 return <main className="container">
  <div className="eyebrow">AUTOPILOT CONTROL CENTER</div>
  <h1>Growth intelligence</h1>
  <p className="lead">See what visitors are searching for, which tools attract attention, and what the platform should improve next.</p>
  {needsToken && !data ? (
    <div className="card">
      <b>Dashboard token required</b>
      <p>Enter the DASHBOARD_TOKEN value configured in your environment variables.</p>
      <form onSubmit={submitToken} style={{display:'flex',gap:'8px',marginTop:'8px'}}>
        <input
          type="password"
          value={token}
          onChange={e=>setToken(e.target.value)}
          placeholder="Dashboard token"
          style={{flex:1,padding:'8px'}}
        />
        <button type="submit">Unlock</button>
      </form>
    </div>
  ) : error && !data ? (
    <div className="card">
      <b>{error}</b>
      <p>Connect Supabase and run <code>supabase/schema.sql</code> to enable persistent analytics.</p>
    </div>
  ) : data ? (
    <>
      <section className="stats">
        <div className="card"><b>{data.totalEvents}</b><span>Events</span></div>
        <div className="card"><b>{data.searches}</b><span>Searches</span></div>
        <div className="card"><b>{data.leads}</b><span>Leads</span></div>
        <div className="card"><b>{data.solutionClicks}</b><span>Solution clicks</span></div>
      </section>
      <section className="grid2">
        <div className="card">
          <h2>Top problems</h2>
          {data.topQueries.map(x=><p key={x.query}><b>{x.query}</b> <span className="muted">× {x.count}</span></p>)}
        </div>
        <div className="card">
          <h2>Top tools</h2>
          {data.topTools.map(x=><p key={x.slug}><b>{x.slug}</b> <span className="muted">× {x.count}</span></p>)}
        </div>
      </section>
      <section className="card">
        <h2>Autopilot opportunities</h2>
        {data.opportunities.map(x=><div className="opportunity" key={x.title}><b>{x.title}</b><span>{x.reason} · {x.priority} priority</span></div>)}
      </section>
    </>
  ) : (
    <div className="card">Loading intelligence…</div>
  )}
 </main>;
}
