export type EventRow={name:string;query?:string;tool_slug?:string;created_at:string};

export function buildInsights(events:EventRow[]){
  const searches=events.filter(e=>e.name==='search');
  const counts=new Map<string,number>();
  searches.forEach(e=>{const q=(e.query||'').trim().toLowerCase(); if(q) counts.set(q,(counts.get(q)||0)+1)});
  const topQueries=Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([query,count])=>({query,count}));
  const toolCounts=new Map<string,number>();
  events.filter(e=>e.name==='tool_open').forEach(e=>{if(e.tool_slug) toolCounts.set(e.tool_slug,(toolCounts.get(e.tool_slug)||0)+1)});
  const topTools=Array.from(toolCounts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([slug,count])=>({slug,count}));
  return {
    totalEvents:events.length,
    searches:searches.length,
    leads:events.filter(e=>e.name==='lead_submit').length,
    solutionClicks:events.filter(e=>e.name==='solution_click').length,
    topQueries,topTools,
    opportunities:topQueries.slice(0,5).map(x=>({title:`Create or improve a page for “${x.query}”`,reason:`${x.count} search event${x.count===1?'':'s'} recorded`,priority:x.count>=5?'high':'medium'}))
  };
}
