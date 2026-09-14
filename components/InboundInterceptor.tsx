'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {extractInboundContext,InboundContext} from '@/lib/inbound';
import {track} from '@/lib/client-analytics';
export default function InboundInterceptor(){
 const [ctx,setCtx]=useState<InboundContext|null>(null); const [visible,setVisible]=useState(false);
 useEffect(()=>{try{if(sessionStorage.getItem('solveease_inbound_seen')==='1')return;const found=extractInboundContext({search:window.location.search,referrer:document.referrer});if(!found)return;setCtx(found);setVisible(true);sessionStorage.setItem('solveease_inbound_seen','1');track('inbound_intercept',found.toolSlug,{campaign:found.campaign,intent:found.intent,source:found.source},found.query)}catch{}},[]);
 if(!visible||!ctx)return null; const destination=ctx.toolSlug?`/tools/${ctx.toolSlug}`:'/search';
 return <aside className="inbound" role="status" aria-live="polite"><div className="inbound-copy"><span className="inbound-tag">SMART INBOUND</span><strong>{ctx.query?`Looking for help with “${ctx.query}”?`:'Looking for a business solution?'}</strong><span>We found a useful starting point based on your visit.</span></div><div className="inbound-actions"><Link className="btn inbound-btn" href={destination} onClick={()=>track('inbound_recommendation_click',ctx.toolSlug,{source:ctx.source},ctx.query)}>Open free tool →</Link><button className="inbound-dismiss" onClick={()=>{setVisible(false);track('inbound_dismiss',ctx.toolSlug,{source:ctx.source},ctx.query)}}>Not now</button></div></aside>;
}
