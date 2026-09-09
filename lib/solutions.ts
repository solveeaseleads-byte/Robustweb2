export type Solution = { id:string; name:string; type:'Payhip'|'Affiliate'|'Service'; description:string; url:string; labels:string[] };

// Product-level URLs can be added here as the catalogue grows. The store URL is intentionally used
// until an exact product mapping is configured, so the platform never invents a product link.
export const solutions: Solution[] = [
  { id:'payhip-store', name:'SolveEase Premium Toolbox', type:'Payhip', description:'Explore paid SolveEase solutions that extend the free tools.', url:'https://payhip.com/SolveEase26', labels:['business','pricing','profit','freelancer','cleaning','rateguard'] },
];

export function matchSolutions(text:string){
 const q=text.toLowerCase();
 return solutions.map(s=>({solution:s,score:s.labels.reduce((n,l)=>n+(q.includes(l)?2:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
}
