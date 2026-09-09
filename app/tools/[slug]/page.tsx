import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getTool,tools} from '../../../lib/tools';
import {matchSolutions} from '../../../lib/solutions';
import ToolWorkspace from '../../../components/ToolWorkspace';
import SolutionLink from '../../../components/SolutionLink';
import ToolOpenTracker from '../../../components/ToolOpenTracker';

export function generateStaticParams(){return tools.map(t=>({slug:t.slug}))}
export function generateMetadata({params}:{params:{slug:string}}){const t=getTool(params.slug);return t?{title:`${t.name} | SolveEase`,description:t.description}:{} }

export default function ToolPage({params}:{params:{slug:string}}){
 const t=getTool(params.slug); if(!t) return notFound();
 const solution=matchSolutions(`${t.name} ${t.category}`).slice(0,1)[0]?.solution;
 const related=(t.related||[]).map(getTool).filter(Boolean).slice(0,4) as typeof tools;
 return <main className="section"><div className="wrap narrow">
  <Link href="/search">← Business Problem Search</Link>
  <div className="tool-head"><span className="tag">{t.category}</span><h1>{t.name}</h1><p className="sectionlead">{t.description}</p></div>
  <ToolOpenTracker slug={t.slug}/><ToolWorkspace tool={t}/>
  {solution&&<div className="card"><span className="tag">RELEVANT SOLUTION</span><h2>{solution.name}</h2><p>{solution.description}</p><SolutionLink url={solution.url} id={solution.id}>Explore solution →</SolutionLink></div>}
  {related.length>0&&<section className="related"><h2>Continue solving</h2><div className="grid">{related.map(r=><Link className="card" href={`/tools/${r.slug}`} key={r.slug}><span className="tag">{r.category}</span><h3>{r.name}</h3><p>{r.description}</p></Link>)}</div></section>}
 </div></main>
}
