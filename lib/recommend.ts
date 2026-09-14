import {tools,Tool} from './tools';
export type Recommendation={tool:Tool;score:number;reason:string};
export function recommend(query:string):Tool[]{return scoreRecommendations(query).map(x=>x.tool)}
export function scoreRecommendations(query:string):Recommendation[]{
 const q=query.toLowerCase().trim();
 if(!q)return tools.slice(0,8).map(tool=>({tool,score:0,reason:'Popular starting point'}));
 return tools.map(tool=>{
   let score=0;
   for(const k of [...tool.keywords,...tool.intent]){
     if(q.includes(k.toLowerCase())) score+=q.includes(k.toLowerCase())?3:0;
     if(k.toLowerCase().includes(q)&&q.length>2) score+=2;
   }
   if(q.includes(tool.category.toLowerCase()))score+=2;
   if(q.includes(tool.name.toLowerCase()))score+=5;
   return {tool,score,reason:score>=6?'Strong match for your problem':score>=3?'Likely useful next step':'Related tool'};
 }).sort((a,b)=>b.score-a.score).filter(x=>x.score>0).slice(0,8);
}
