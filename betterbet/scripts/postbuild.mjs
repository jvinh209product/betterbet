import {copyFileSync,readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {loadEnv} from 'vite';
// Portable export only: use an explicit configured origin, never a guessed host.
const configured=process.env.PUBLIC_SITE_URL||loadEnv('production',process.cwd(),'PUBLIC_').PUBLIC_SITE_URL;
if(configured){
 const url=new URL(configured);
 if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.search||url.hash||!['','/'].includes(url.pathname))throw new Error('PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, a path, query or fragment.');
 const origin=url.origin,html=readFileSync('dist/index.html','utf8').replace('content="/og-image.png"',`content="${origin}/og-image.png"`).replace('</head>',`<link rel="canonical" href="${origin}/"><meta property="og:url" content="${origin}/"></head>`);
 writeFileSync('dist/index.html',html);
 const publicRoutes=['/','/product','/method','/case-study','/about'];
 writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+publicRoutes.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')+'</urlset>\n');
 writeFileSync('dist/robots.txt',readFileSync('public/robots.txt','utf8').trimEnd()+`\nSitemap: ${origin}/sitemap.xml\n`);
}else rmSync('dist/sitemap.xml',{force:true});
const routes=['product','method','case-study','about','lab','lab/overview','lab/diagnose','lab/evidence','lab/decide','lab/experiment','lab/deliver','lab/review','lab/decisions','lab/data','lab/settings'];
for(const route of routes){mkdirSync(`dist/${route}`,{recursive:true});copyFileSync('dist/index.html',`dist/${route}/index.html`);}
writeFileSync('dist/_redirects','/* /index.html 200\n');
