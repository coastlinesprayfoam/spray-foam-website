import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const services = await getCollection('services');
  const faqs = await getCollection('faqs');
  const pages = ['', 'services/', 'about/', 'contact/', 'faq/'];

  const urls: string[] = [
    ...pages.map(p => `https://www.example.com/${p}`),
    ...services.map(s => `https://www.example.com/services/${s.data.slug}/`),
    ...faqs.map((_f) => `https://www.example.com/faq/`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map(u => `<url><loc>${u}</loc></url>`).join('') +
    `</urlset>`;

  return new Response(xml, { status: 200, headers: { 'content-type': 'application/xml' } });
};
