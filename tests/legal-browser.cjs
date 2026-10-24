const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const tmp=name=>require('node:path').join(require('node:os').tmpdir(),name);
(async()=>{
const server=require('../server').createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...process.env.PRIMAL_BROWSER_EXECUTABLE?{executablePath:process.env.PRIMAL_BROWSER_EXECUTABLE}:{},args:['--no-sandbox','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
const ctx=await browser.newContext({viewport:{width:390,height:844},permissions:['camera','microphone'],acceptDownloads:true});
const p=await ctx.newPage(),errors=[];
p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
try{
 await p.goto(base);assert.equal(await p.locator('nav.tab-bar button').count(),5);
 assert.equal(await p.locator('#championshipsTab').count(),0);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await p.locator('#start').click();assert.ok(await p.locator('#legalWelcome').evaluate(x=>x.open));
 assert.equal(await p.evaluate(()=>clock.state),'idle');assert.equal(await p.locator('#legalAccept').isDisabled(),true);
 await p.screenshot({path:tmp('primal-legal-consent.png')});await p.locator('#legalCancel').click();assert.equal(await p.evaluate(()=>clock.state),'idle');
 await p.locator('#start').click();await p.locator('#legalAcceptCheck').check();await p.locator('#legalAccept').click();
 assert.equal(await p.evaluate(()=>clock.state),'prepare');
 await p.waitForFunction(()=>!backgroundMusic.paused);await p.waitForTimeout(800);
 assert.ok(await p.evaluate(()=>PrimalMusic.getContext().state==='running'));
 await p.locator('#start').click();await p.waitForFunction(()=>backgroundMusic.paused);assert.equal(await p.evaluate(()=>clock.state),'paused');
 await p.locator('#start').click();await p.waitForFunction(()=>!backgroundMusic.paused);
 await p.locator('#stop').click();await p.locator('#trainTab').click();
 await p.locator('#primalClubTab').click();assert.ok(await p.locator('#primalClub').evaluate(x=>x.open));await p.locator('#trainTab').click();
 await p.locator('[data-sheet="historySheet"]').click();assert.ok(await p.locator('#historySheet').evaluate(x=>x.open));await p.locator('#trainTab').click();
 await p.locator('[data-sheet="guideSheet"]').click();assert.ok(await p.locator('#guideSheet').evaluate(x=>x.open));await p.locator('#trainTab').click();
 await p.reload();await p.locator('#start').click();assert.equal(await p.locator('#legalWelcome').evaluate(x=>x.open),false);await p.locator('#stop').click();await p.locator('#trainTab').click();
 // Complete a short session with real clock transitions and check reward persistence.
 await p.evaluate(()=>{document.getElementById('voice').checked=false;document.getElementById('rounds').value='1';refresh();});
 await p.locator('#start').click();await p.evaluate(()=>{clock.tick(clock.end+1);stage();clock.tick(clock.end+1);stage();});
 assert.equal(await p.evaluate(()=>clock.state),'done');assert.ok(await p.evaluate(()=>JSON.parse(localStorage.getItem('primal-history')).some(x=>x.complete)));
 await p.locator('#trainTab').click();
 // Camera, shared audio graph, actual MediaRecorder blob and download.
 await p.locator('#recordTab').click();await p.locator('#recordStart').click();
 await p.waitForFunction(()=>PrimalRecorder.active);await p.waitForTimeout(1800);
 await p.locator('#recordStageStop').click();await p.waitForFunction(()=>!PrimalRecorder.active);
 await p.locator('#downloadRecording').waitFor({state:'visible'});
 const blob=await p.evaluate(async()=>{const r=await fetch(document.getElementById('downloadRecording').href);const b=await r.blob();return {size:b.size,type:b.type}});
 assert.ok(blob.size>10000);assert.match(blob.type,/video/);
 await p.locator('#trainTab').click();
 await p.locator('.legal-footer').scrollIntoViewIfNeeded();await p.screenshot({path:process.env.PRIMAL_QA_SCREENSHOT||tmp('primal-footer.png')});
 const legal=await ctx.newPage();await legal.goto(base+'/legal.html');assert.match(await legal.locator('[data-contact]').first().textContent(),/primalproducts1@gmail.com/);assert.ok(await legal.locator('[data-incomplete]').isVisible());await legal.screenshot({path:tmp('primal-legal-page.png')});
 assert.equal(await legal.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await legal.setViewportSize({width:1440,height:900});assert.equal(await legal.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await legal.close();
 await p.evaluate(()=>{localStorage.setItem('unrelated-app','keep');localStorage.setItem('primal-championships-v1','{}');sessionStorage.setItem('primal-championships-workout-backup-v1','{}');});
 await p.locator('#privacyControls').click();p.once('dialog',d=>d.accept());await p.locator('#privacyErase').click();await p.waitForLoadState('load');
 await p.waitForFunction(()=>document.getElementById('start'));
 assert.equal(await p.evaluate(()=>localStorage.getItem('primal-legal-acceptance')),null);
 assert.equal(await p.evaluate(()=>localStorage.getItem('unrelated-app')),'keep');assert.equal(await p.evaluate(()=>localStorage.getItem('primal-championships-v1')),null);assert.equal(await p.evaluate(()=>sessionStorage.getItem('primal-championships-workout-backup-v1')),null);
 await p.locator('#start').click();assert.ok(await p.locator('#legalWelcome').evaluate(x=>x.open));
 assert.deepEqual(errors,[]);
 console.log('PASS: mobile layout, legal consent/cancel/persistence, music pause/resume, all tabs, completed session, trophies, camera capture + video blob, legal routes, selective deletion. Video bytes:',blob.size);
}finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});
