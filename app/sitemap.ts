import {MetadataRoute} from 'next';
import {tools} from '../lib/tools';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://example.com';return [{url:base,changeFrequency:'weekly',priority:1},{url:`${base}/search`,changeFrequency:'daily',priority:.9},{url:`${base}/cleaning`,changeFrequency:'weekly',priority:.9},...tools.map(t=>({url:`${base}/tools/${t.slug}`,changeFrequency:'monthly' as const,priority:.8}))]}
