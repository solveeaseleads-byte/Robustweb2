import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['package.json','app/page.tsx','app/search/page.tsx','app/tools/[slug]/page.tsx','app/api/events/route.ts','app/api/lead/route.ts','lib/calculators.ts','lib/tools.ts','supabase/schema.sql','public/manifest.webmanifest'];
for(const f of required){if(!fs.existsSync(path.join(root,f)))throw new Error(`Missing ${f}`)}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
if(!pkg.scripts?.build)throw new Error('Missing build script');
const tools=fs.readFileSync(path.join(root,'lib/tools.ts'),'utf8');
for(const slug of ['profit-calculator','roi-calculator','amazon-profit-checker','cleaning-profit-calculator','cleaning-quote-calculator','cloud-cost-calculator']) if(!tools.includes(`slug:'${slug}'`)) throw new Error(`Missing tool ${slug}`);
const events=fs.readFileSync(path.join(root,'app/api/events/route.ts'),'utf8');
if(!events.includes('tool_calculate'))throw new Error('Calculation analytics event missing');
console.log('SolveEase v5 smoke test: PASS');
console.log(`Required files checked: ${required.length}`);
