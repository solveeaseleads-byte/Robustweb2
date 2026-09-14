import {scoreRecommendations} from '../recommend';
export type IntentEvent={query:string;tool?:string;source?:string;timestamp?:string};
export type GrowthAction={type:'create_problem_page'|'improve_tool_page'|'suggest_related_tool'|'flag_for_review';reason:string;query:string};
export function analyzeIntent(query:string):GrowthAction[]{
 const matches=scoreRecommendations(query);
 if(!query.trim())return [];
 if(matches.length===0)return [{type:'create_problem_page',reason:'No existing tool matched the search intent.',query}];
 if(matches[0].score<4)return [{type:'flag_for_review',reason:'Low-confidence intent match; human review is safer than guessing.',query}];
 return [{type:'suggest_related_tool',reason:`Best match: ${matches[0].tool.name}`,query}];
}
