import './globals.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'SolveEase — Business Problem-Solving Platform',description:'Free business tools and problem search to help you understand costs, pricing, profit and operations.',manifest:'/manifest.webmanifest',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000')};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
