import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync,mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {resolve,dirname,join,extname} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
const root=process.cwd(),read=p=>readFileSync(p,'utf8');
const routes=['','product','method','case-study','about','lab','lab/overview','lab/diagnose','lab/evidence','lab/decide','lab/experiment','lab/deliver','lab/review','lab/decisions','lab/data','lab/settings'];
assert.ok(!existsSync('.openai/hosting.json'),'Portable source must not contain hosting identity');
for(const route of routes)assert.ok(existsSync(join('dist',route,'index.html')),route+' build entry is missing');
for(const text of [read('index.html'),read('dist/index.html'),read('public/robots.txt')])assert.ok(!/chatgpt\.site|oaiusercontent\.com|\/workspace\//i.test(text),'Host-specific runtime reference');
for(const match of read('dist/index.html').matchAll(/(?:src|href)="(\/(?!\/)[^"]+)"/g))assert.ok(existsSync('dist'+match[1]),'Missing built asset '+match[1]);
for(const match of read('public/fonts.css').matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g))assert.ok(existsSync(resolve('public',match[1].replace(/^\//,''))),'Missing font '+match[1]);
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);
for(const file of walk('src').filter(p=>['.jsx','.mjs'].includes(extname(p))))for(const match of read(file).matchAll(/(?:from\s*|import\s*\()['"](\.[^'"]+)['"]/g)){const target=resolve(dirname(file),match[1]);assert.ok(['','.jsx','.mjs','.js','.json','.css'].some(ext=>existsSync(target+ext)),file+' missing import '+match[1]);}
const temp=mkdtempSync(join(tmpdir(),'betterbet-seo-'));
try{
 mkdirSync(join(temp,'dist'));mkdirSync(join(temp,'public'));writeFileSync(join(temp,'dist/index.html'),read('dist/index.html'));writeFileSync(join(temp,'public/robots.txt'),read('public/robots.txt'));
 const result=spawnSync(process.execPath,[resolve('scripts/postbuild.mjs')],{cwd:temp,env:{...process.env,PUBLIC_SITE_URL:'https://deployment.example'},encoding:'utf8'});assert.equal(result.status,0,result.stderr);assert.match(read(join(temp,'dist/index.html')),/https:\/\/deployment\.example\/og-image\.png/);assert.match(read(join(temp,'dist/sitemap.xml')),/https:\/\/deployment\.example\/product/);assert.match(read(join(temp,'dist/robots.txt')),/Sitemap: https:\/\/deployment\.example\/sitemap.xml/);
}finally{rmSync(temp,{recursive:true,force:true});}
console.log('PASS: static routes, local assets/fonts, relative imports and explicit-origin postbuild metadata.');
