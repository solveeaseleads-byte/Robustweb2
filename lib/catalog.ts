export type Solution = {
  id:string; title:string; type:'payhip'|'affiliate'|'service'; url:string; description:string; tags:string[]; active:boolean;
};

export const solutions:Solution[] = [
  {id:'solveease-bizsense',title:'SolveEase BizSense',type:'payhip',url:'https://payhip.com/SolveEase26',description:'Business decision and profitability tools from the SolveEase ecosystem.',tags:['profit','pricing','business','calculator'],active:true},
  {id:'rateguard',title:'SolveEase RateGuard',type:'payhip',url:'https://payhip.com/SolveEase26',description:'Professional rate and pricing support for service businesses and language professionals.',tags:['pricing','rate','freelancer','translation'],active:true}
];

export function matchSolutions(tags:string[]){
  const wanted=new Set(tags.map(x=>x.toLowerCase()));
  return solutions.filter(s=>s.active).map(s=>({s,score:s.tags.reduce((n,t)=>n+(wanted.has(t)?2:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.s);
}
