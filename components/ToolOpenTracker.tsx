'use client';
import {useEffect} from 'react';
import {track} from '../lib/client-analytics';
export default function ToolOpenTracker({slug}:{slug:string}){useEffect(()=>{track('tool_open',slug)},[slug]);return null}
