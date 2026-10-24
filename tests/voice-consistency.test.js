const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
test('coach never substitute system speech',()=>{
 for(const name of ['coach.js'])assert.doesNotMatch(fs.readFileSync(path.join(root,name),'utf8'),/new SpeechSynthesisUtterance|synth\.speak\(/);
});
test('all four original natural banks are real MP3 files',()=>{
 const vm=require('node:vm'),context={window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'voice-bank.js'),'utf8'),context);
 for(const b of Object.values(context.window.PrimalVoiceBank))assert.ok(fs.statSync(path.join(root,b.url)).size>10000);

});
