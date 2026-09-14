import {scoreRecommendations} from './recommend';

export type InboundContext={query:string;source:string;campaign:string;toolSlug?:string;intent:string};
const queryKeys=['q','query','problem','search','keyword','intent'];
function clean(value:string,max=240){return value.replace(/[<>\u0000-\u001F]/g,' ').trim().slice(0,max)}
function domainFromReferrer(referrer?:string){if(!referrer)return '';try{return new URL(referrer).hostname.replace(/^www\./,'')}catch{return ''}}
export function extractInboundContext(input:{search?:string;referrer?:string}):InboundContext|null{
 const params=new URLSearchParams(input.search||'');
 let query=''; for(const key of queryKeys){const value=clean(params.get(key)||'');if(value){query=value;break}}
 const source=clean(params.get('utm_source')||domainFromReferrer(input.referrer)||'direct',80);
 const campaign=clean(params.get('utm_campaign')||'',120);
 if(!query&&source==='direct'&&!campaign)return null;
 const recommendation=query?scoreRecommendations(query)[0]:undefined;
 return {query,source,campaign,toolSlug:recommendation?.tool.slug,intent:query||recommendation?.tool.category||'general business help'};
}
