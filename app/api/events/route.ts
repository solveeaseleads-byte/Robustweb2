import {NextResponse} from 'next/server';
import {insertRows} from '@/lib/persistence/supabase';

const allowed=new Set(['search','tool_open','recommendation_click','lead_start','lead_submit','solution_click','feedback','tool_calculate']);
export async function POST(req:Request){
  const body=await req.json().catch(()=>null);
  if(!body?.name || !body?.sessionId || !allowed.has(String(body.name))) return NextResponse.json({ok:false,error:'Invalid event'},{status:400});
  const row={name:String(body.name),session_id:String(body.sessionId).slice(0,120),tool_slug:body.toolSlug?String(body.toolSlug).slice(0,160):null,query:body.query?String(body.query).slice(0,300):null,metadata:body.metadata||{},created_at:new Date().toISOString()};
  try { const result=await insertRows('events',[row]); if(!result.persisted) console.info('[solveease-event]',JSON.stringify(row)); return NextResponse.json({ok:true,persisted:result.persisted}); }
  catch { return NextResponse.json({ok:false,error:'Event storage unavailable'},{status:503}); }
}
