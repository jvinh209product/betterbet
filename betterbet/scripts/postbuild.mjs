import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';

// Public metadata configuration; the app needs no environment variables.
const {siteUrl}=JSON.parse(readFileSync('site.config.json','utf8'));
let origin=null;
if(siteUrl!==null){
  const url=new URL(siteUrl);
  if(!['https:','http:'].includes(url.protocol)||url.username||url.password||url.pathname!=='/'||url.search||url.hash){
    throw new Error('site.config.json siteUrl must be a plain HTTP(S) origin, or null.');
  }
  origin=url.origin;
}

const publicRoutes=['','product','method','case-study','about'];
const routes=[...publicRoutes.slice(1),'lab','lab/overview','lab/diagnose','lab/evidence','lab/decide','lab/experiment','lab/deliver','lab/review','lab/decisions','lab/data','lab/settings'];
const source=readFileSync('dist/index.html','utf8');
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function htmlFor(route){
  if(!origin)return source;
  const url=escape(`${origin}/${route}`);
  return source.replace('content="/og-image.png"',`content="${escape(origin)}/og-image.png"`)
    .replace('</head>',`<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"></head>`);
}
writeFileSync('dist/index.html',htmlFor(''));
for(const route of routes){
  mkdirSync(`dist/${route}`,{recursive:true});
  writeFileSync(`dist/${route}/index.html`,htmlFor(route));
}
writeFileSync('dist/_redirects','/* /index.html 200\n');
writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /lab\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
if(origin){
  const urls=publicRoutes.map(route=>`<url><loc>${escape(`${origin}/${route}`)}</loc></url>`).join('');
  writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`);
}else{
  rmSync('dist/sitemap.xml',{force:true});
}
console.log(`Created ${routes.length+1} route entry points. Absolute SEO metadata: ${origin?'configured':'omitted until siteUrl is set'}.`);
