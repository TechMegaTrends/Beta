import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots {
  const staging = process.env.NEXT_PUBLIC_STAGING === 'true';
  return {rules: staging ? [{userAgent:'*',disallow:'/'}] : [{userAgent:'*',allow:'/',disallow:'/api/'}],sitemap: staging ? undefined : 'https://techmegatrends.com/sitemap.xml'};
}
