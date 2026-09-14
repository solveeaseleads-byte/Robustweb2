const key='solveease-session';
function sessionId(){if(typeof window==='undefined')return 'server';let id=localStorage.getItem(key);if(!id){id=crypto.randomUUID?.()||Math.random().toString(36).slice(2);localStorage.setItem(key,id)}return id}
export function track(name:string,toolSlug?:string,metadata:Record<string,unknown>={},query?:string){if(typeof window==='undefined')return;fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,sessionId:sessionId(),toolSlug,query,metadata})}).catch(()=>{});}
