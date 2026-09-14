import {NextResponse} from 'next/server';
export async function POST(req:Request){const body=await req.json().catch(()=>({}));console.log(JSON.stringify({event:'feedback',...body,timestamp:new Date().toISOString()}));return NextResponse.json({ok:true});}
