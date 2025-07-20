const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/`;

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write sitemap
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

// Write robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

console.log('✅ Sitemap and robots.txt generated successfully');
console.log(`📍 Sitemap: ${SITE_URL}/sitemap.xml`);
console.log(`📍 Robots: ${SITE_URL}/robots.txt`); 