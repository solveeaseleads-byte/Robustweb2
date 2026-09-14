import {NextResponse} from 'next/server';
import {insertRows} from '@/lib/persistence/supabase';
import {scoreIntent} from '@/lib/scoring';

export async function POST(req:Request){
 const body=await req.json().catch(()=>null);
 if(!body?.email || body.consent!==true) return NextResponse.json({ok:false,error:'Email and explicit consent are required.'},{status:400});
 const email=String(body.email).trim().toLowerCase();
 if(!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ok:false,error:'Enter a valid email.'},{status:400});
 const events=Array.isArray(body.eventNames)?body.eventNames.map(String):['lead_submit'];
 const intent=scoreIntent(events);
 const row={email,problem:String(body.problem||'').slice(0,500),tool_slug:body.tool?String(body.tool).slice(0,160):null,source:String(body.source||'platform').slice(0,100),intent_score:intent.score,intent_level:intent.level,consent_at:new Date().toISOString(),created_at:new Date().toISOString()};
 try {const result=await insertRows('leads',[row]); if(!result.persisted) console.info('[solveease-lead]',JSON.stringify(row)); return NextResponse.json({ok:true,persisted:result.persisted,intent});}
 catch{return NextResponse.json({ok:false,error:'Lead storage unavailable'},{status:503});}
}
