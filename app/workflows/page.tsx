import Link from 'next/link';
const stages=[
 ['01','Inquiry','Capture the customer’s service request and essential job details.',null],
 ['02','Estimate','Use cleaning time, travel, labor and pricing calculators.','cleaning-time-estimator'],
 ['03','Quote','Turn the estimate into a practical customer quote.','cleaning-quote-calculator'],
 ['04','Schedule','Confirm the job date, service type and assigned cleaner.',null],
 ['05','Complete','Record the completed job and final numbers.','cleaning-profit-calculator'],
 ['06','Invoice & payment','Move from completed work to payment tracking.','payment-fee-calculator'],
 ['07','Review request','Send a polite, honest review request after completion.',null],
 ['08','Follow-up','Offer recurring service and monitor customer retention.','cleaning-recurring-revenue-calculator'],
];
export default function Workflows(){
 return <main className="section"><div className="wrap narrow">
  <Link href="/">← Home</Link>
  <div className="tool-head"><span className="eyebrow">SOLVEASE WORKFLOWS</span><h1>Cleaning Business Operating Workflow</h1><p className="sectionlead">A simple end-to-end operating path for turning an inquiry into a completed job and a repeat customer.</p></div>
  <div className="steps">
   {stages.map(x=>{
    const content=<><span className="tag">{x[0]}</span><strong>{x[1]}</strong><span>{x[2]}</span>{x[3]&&<small>Open tool →</small>}</>;
    return x[3]
     ? <Link className="card step" href={`/tools/${x[3]}`} key={x[0]}>{content}</Link>
     : <div className="card step" key={x[0]}>{content}</div>;
   })}
  </div>
  <div className="card" style={{marginTop:20}}><h2>Free tools to start</h2><p className="sectionlead">Use the numbers first; upgrade only when a paid solution is genuinely useful.</p><Link className="btn" href="/cleaning">Open Cleaning Toolkit →</Link></div>
 </div></main>;
}
