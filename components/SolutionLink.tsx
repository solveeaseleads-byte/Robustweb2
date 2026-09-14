'use client';
import {track} from '../lib/client-analytics';
export default function SolutionLink({url,id,children}:{url:string;id:string;children:React.ReactNode}){
 return <a className="btn" href={url} target="_blank" rel="noreferrer" onClick={()=>track('solution_click',undefined,{solutionId:id})}>{children}</a>;
}
