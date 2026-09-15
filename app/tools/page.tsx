import Link from 'next/link';
import {tools,groupByCategory} from '../../lib/tools';

export default function ToolsIndex(){
 const grouped=groupByCategory(tools);
 return <main className="section"><div className="wrap">
  <Link href="/">← Home</Link>
  <div className="tool-head"><span className="eyebrow">FREE TOOLS</span><h1>All free calculators</h1><p className="sectionlead">Useful tools are the platform's traffic and discovery layer. Every calculator below is free to use.</p></div>
  <div className="groupgrid">
   {grouped.map(([category,items])=>(
    <div className="groupcard" key={category}>
     <span className="tag">{category}</span>
     <h3>{category} Calculators</h3>
     <div className="grouplist">
      {items.map(t=><Link className="grouplink" href={`/tools/${t.slug}`} key={t.slug}>{t.name}<span>→</span></Link>)}
     </div>
    </div>
   ))}
  </div>
 </div></main>;
}
