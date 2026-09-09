import {NextResponse} from 'next/server';
import {solutions} from '@/lib/catalog';
export async function GET(){return NextResponse.json({solutions:solutions.filter(s=>s.active)});}
