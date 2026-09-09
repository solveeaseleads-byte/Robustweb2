'use client';
import {useMemo,useState} from 'react';
import type {Tool} from '../lib/tools';
import {calculate, fieldConfig, formatResult} from '../lib/calculators';
import {track} from '../lib/client-analytics';

export default function ToolWorkspace({tool}:{tool:Tool}){
 const fields=fieldConfig(tool.slug);
 const [values,setValues]=useState<Record<string,number>>({});
 const [result,setResult]=useState<string>('');
 const set=(key:string,value:string)=>setValues(v=>({...v,[key]:Number(value)||0}));
 const run=()=>{const output=calculate(tool.slug,values);setResult(formatResult(output));track('tool_calculate',tool.slug,{result:output});};
 const ready=useMemo(()=>fields.every(f=>typeof values[f.key]==='number'),[fields,values]);
 return <div className="card tool-card">
  <span className="tag">FREE CALCULATOR</span>
  <h2>Enter your numbers</h2>
  <div className="input-grid">{fields.map(f=><label key={f.key}>{f.label}<input type="number" inputMode="decimal" min={f.min} step="any" placeholder={String(f.placeholder)} onChange={e=>set(f.key,e.target.value)}/><small>{f.hint}</small></label>)}</div>
  <button className="btn" onClick={run} disabled={!ready}>Calculate</button>
  {result&&<div className="result"><span className="tag">RESULT</span><strong>{result}</strong><p>Use this result as a planning estimate. Actual costs, fees and taxes may differ.</p></div>}
 </div>
}
