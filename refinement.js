/* UI only: compact disclosures, accessible home link and earned medal feedback. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id),t=(es,en)=>window.PrimalI18n?.lang==='en'?en:es;
 $('brandHome').onclick=()=>window.PrimalHome?.requestHome();
 $('heroHome').onclick=()=>window.PrimalHome?.requestHome();
 const icon=paths=>`<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
 const sound=icon('<path d="M11 5 6 9H3v6h3l5 4V5Zm4 3c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>');
 const time=icon('<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>');
 const chevron=icon('<path d="m8 10 4 4 4-4"/>');
 function disclosure(node,type){
  const details=node?.closest('details');if(!details)return;
  details.classList.add('refined-options');const summary=details.querySelector('summary');
  const render=()=>{summary.innerHTML=`<span class="disclosure-icon">${type==='music'?sound:time}</span><span class="disclosure-copy"><b>${type==='music'?t('Música','Music'):t('Pausa entre combos','Time between combos')}</b><small>${type==='music'?t('Ajusta el volumen de fondo','Adjust background volume'):t('Tiempo para ejecutar cada combinación','Time to execute each combination')}</small></span><span class="disclosure-value"></span><span class="disclosure-chevron">${chevron}</span>`;sync();};
  const sync=()=>{const value=summary.querySelector('.disclosure-value');if(value)value.textContent=type==='music'?$('musicVolume').value+'%':$('gapLive').value+' s';};
  render();document.addEventListener('primal-language-change',render);
  (type==='music'?$('musicVolume'):$('gapLive')).addEventListener('input',sync);
  if(type==='time')$('gap').addEventListener('input',()=>queueMicrotask(sync));
  document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
 }
 disclosure($('musicDock'),'music');disclosure(document.querySelector('.execution-control'),'time');
 window.addEventListener('primal-medals-earned',e=>{
  const nodes=[document.querySelector('.pc-toast'),$('primalClubTab'),document.querySelector('.pc-teaser')];
  for(const id of e.detail.ids)nodes.push(document.querySelector(`[data-medal-id="${id}"]`));
  nodes.filter(Boolean).forEach(n=>{n.classList.remove('medal-celebrate');void n.offsetWidth;n.classList.add('medal-celebrate');setTimeout(()=>n.classList.remove('medal-celebrate'),1800);});
 });
})();
