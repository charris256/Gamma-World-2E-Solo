import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root=new URL('../',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1');
const dist=join(root,'dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};

async function withSite(run){
 const server=createServer(async(req,res)=>{try{const requested=req.url==='/'?'index.html':decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'');const file=normalize(join(dist,requested));if(!file.startsWith(normalize(dist)))throw new Error('unsafe path');const body=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});res.end(body)}catch{res.writeHead(404);res.end('not found')}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{const {port}=server.address();await run('http://127.0.0.1:'+port)}finally{await new Promise(resolve=>server.close(resolve))}
}

test('production browser entry ships Gamma Solo and PWA metadata',async()=>{
 await withSite(async base=>{
  const html=await (await fetch(base)).text();
  assert.match(html,/<title>Gamma Solo<\/title>/);
  assert.match(html,/manifest\.webmanifest/);
  const manifest=await (await fetch(base+'/manifest.webmanifest')).json();
  assert.equal(manifest.name,'Gamma Solo');
  assert.equal(manifest.display,'standalone');
  assert.equal((await fetch(base+'/sw.js')).status,200);
  assert.equal((await fetch(base+'/icon.svg')).status,200);
  const assets=[...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match=>match[1]);
  assert.ok(assets.length>=2,'compiled JS and CSS links should exist');
  for(const asset of assets)assert.equal((await fetch(base+asset)).status,200,asset+' should load');
 });
});

test('offline worker includes navigation fallback and versioned cache',async()=>{
 const worker=await readFile(join(dist,'sw.js'),'utf8');
 assert.match(worker,/gamma-solo-v1/);
 assert.match(worker,/index\.html/);
 assert.match(worker,/caches\.match/);
});

test('optimized bundle remains within a practical local-first budget',async()=>{
 const assets=await readFile(join(dist,'index.html'),'utf8');
 const js=assets.match(/src="([^"]+\.js)"/)?.[1];
 assert.ok(js);
 const size=(await stat(join(dist,js.replace(/^\//,'')))).size;
 assert.ok(size<400_000,'JavaScript bundle exceeded 400 KB');
});


test('release build uses on-demand feature chunks',async()=>{
 const files=await import('node:fs/promises').then(module=>module.readdir(dist));
 assert.ok(files.some(name=>name==='assets')||files.length>0);
 const assets=await import('node:fs/promises').then(module=>module.readdir(join(dist,'assets')));
 assert.ok(assets.some(name=>name.startsWith('FieldProcedures-')),'field procedures should be lazy loaded');
 assert.ok(assets.some(name=>name.startsWith('ExpeditionDashboard-')),'expedition dashboard should be lazy loaded');
});

test('campaign storage retains a last-known-good recovery copy',async()=>{
 const source=await readFile(join(root,'src','utils','storage.ts'),'utf8');
 assert.match(source,/BACKUP_KEY/);
 assert.ok(source.includes('for(const key of [KEY,BACKUP_KEY])'));
 assert.match(source,/normalizeCampaign/);
});

test('shell provides keyboard navigation landmarks',async()=>{
 const shell=await readFile(join(root,'src','components','AppShell.tsx'),'utf8');
 const css=await readFile(join(root,'src','index.css'),'utf8');
 assert.match(shell,/Skip to campaign tools/);
 assert.match(shell,/aria-label="Primary navigation"/);
 assert.match(shell,/aria-current=/);
 assert.match(css,/:focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
});
