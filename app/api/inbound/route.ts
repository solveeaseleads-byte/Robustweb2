import {NextResponse} from 'next/server';
import {extractInboundContext} from '@/lib/inbound';
export async function POST(req:Request){const body=await req.json().catch(()=>null);if(!body)return NextResponse.json({ok:false,error:'Invalid request'},{status:400});return NextResponse.json({ok:true,context:extractInboundContext({search:String(body.search||''),referrer:String(body.referrer||'')})});}
