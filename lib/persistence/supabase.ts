const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function supabaseReady(){ return Boolean(url && key); }

export async function insertRows(table:string, rows:Record<string,unknown>[]) {
  if(!url || !key) return { persisted:false, data:null };
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method:'POST',
    headers:{apikey:key, Authorization:`Bearer ${key}`, 'Content-Type':'application/json', Prefer:'return=minimal'},
    body:JSON.stringify(rows),
    cache:'no-store'
  });
  if(!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
  return {persisted:true,data:null};
}

export async function selectRows(table:string, query:string='') {
  if(!url || !key) return {persisted:false,data:[]};
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers:{apikey:key, Authorization:`Bearer ${key}`}, cache:'no-store'
  });
  if(!res.ok) throw new Error(`Supabase select failed: ${res.status}`);
  return {persisted:true,data:await res.json()};
}
