import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header, Footer, MotionPreferences } from '@/components/shell';
export const metadata:Metadata = {metadataBase:new URL('https://techmegatrends.com'),title:{default:'TechMegaTrends | Digital Experiences, Software & IT Solutions',template:'%s | TechMegaTrends'},description:'UK digital technology partner for websites, iOS & Android apps, custom software, AI automation and IT cloud security.',openGraph:{type:'website',locale:'en_GB',siteName:'TechMegaTrends',title:'TechMegaTrends — Design. Build. Transform.',description:'Digital experiences, apps, software and IT expertise for ambitious UK businesses.'},robots:{index:true,follow:true}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#090e20'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><a className="skip-link" href="#main">Skip to content</a><Header/><MotionPreferences/>{children}<Footer/></body></html>}
