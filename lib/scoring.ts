export type IntentLevel = 'low'|'medium'|'high';

const weights:Record<string,number> = {
  search:1, tool_open:2, recommendation_click:3, lead_start:5, lead_submit:10, solution_click:7
};

export function scoreIntent(events:string[]):{score:number;level:IntentLevel}{
  const score=Math.min(100, events.reduce((n,e)=>n+(weights[e]||0),0));
  return {score, level:score>=15?'high':score>=6?'medium':'low'};
}
