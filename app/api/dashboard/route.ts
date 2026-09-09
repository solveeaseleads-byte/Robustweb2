import {NextResponse} from 'next/server';
import {selectRows} from '@/lib/persistence/supabase';
import {buildInsights} from '@/lib/autopilot/insights';

export async function GET(req:Request){
  const auth=req.headers.get('authorization');
  if(process.env.DASHBOARD_TOKEN && auth!==`Bearer ${process.env.DASHBOARD_TOKEN}`) return NextResponse.json({error:'Unauthorized'},{status:401});
  try {
    const result=await selectRows('events','select=name,query,tool_slug,created_at&order=created_at.desc&limit=5000');
    const insights=buildInsights(result.data as any[]);
    return NextResponse.json({ok:true,persisted:result.persisted,insights});
  } catch { return NextResponse.json({ok:false,error:'Dashboard data unavailable'},{status:503}); }
}
