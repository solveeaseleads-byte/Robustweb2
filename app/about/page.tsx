import Link from 'next/link';
export default function About(){return <main className="section"><div className="wrap narrow"><Link href="/">← Home</Link><div className="tool-head"><span className="eyebrow">ABOUT SOLVEASE</span><h1>Useful first. Commercial second.</h1><p className="sectionlead">SolveEase is a business problem-solving platform built around practical tools, diagnostics and transparent next steps.</p></div><div className="grid">
<Link className="card" href="/tools"><h3>Free by default</h3><p>Core calculators and discovery tools are designed to be useful without forcing registration.</p><small>Browse free tools →</small></Link>
<Link className="card" href="/audits"><h3>Evidence over hype</h3><p>Results are estimates. The platform does not promise guaranteed savings, rankings, leads or financial recovery.</p><small>See audits & diagnostics →</small></Link>
<Link className="card" href="/workflows"><h3>Legitimate growth</h3><p>Discovery is based on useful pages, internal recommendations, referrals and consent-based lead capture—not fake traffic.</p><small>View growth workflows →</small></Link>
</div></div></main>}
