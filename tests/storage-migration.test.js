const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../storage-migration.js'),'utf8');
const storage=data=>Object.assign({},data,{getItem(k){return this[k]??null},setItem(k,v){this[k]=v}});
test('legacy settings/history/language migrate without replacing existing current data',()=>{
 const localStorage=storage({'previous-settings':JSON.stringify({stance:'orthodox',rounds:6,gap:2,focus:'technique'}),'previous-history':'[{"rounds":6}]','previous-language':'en','unrelated-settings':'{"theme":"light"}'}),window={};
 vm.runInNewContext(code,{window,localStorage});assert.equal(localStorage['primal-language'],'en');assert.equal(localStorage['primal-history'],'[{"rounds":6}]');assert.equal(window.PrimalLegacyStorageKeys.length,3);
 localStorage['primal-history']='[]';vm.runInNewContext(code,{window,localStorage});assert.equal(localStorage['primal-history'],'[]');assert.ok(localStorage['unrelated-settings']);
});
test('storage unavailable never prevents startup',()=>{assert.doesNotThrow(()=>vm.runInNewContext(code,{window:{},get localStorage(){throw Error('denied')}}));});
