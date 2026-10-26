/* First-workout reward invitation. No account, tracking, or external calls. */
(()=>{
 'use strict';
 const R=window.PrimalRewards,SEEN='primal-community-welcome-v1';
 const t=(es,en)=>window.PrimalI18n?.lang==='en'?en:es;
 const dialog=document.createElement('dialog');dialog.id='communityWelcome';dialog.className='community-dialog';
 dialog.setAttribute('aria-labelledby','communityTitle');dialog.setAttribute('aria-describedby','communityDescription');document.body.append(dialog);
 let pending=false,seen=false,lastFocus=null;
 try{seen=localStorage.getItem(SEEN)==='seen';}catch{}
 function eligible(){try{const data=JSON.parse(localStorage.getItem('primal-club-v1')||'null');return !!R.earned(R.merge([],data?.records||[])).community;}catch{return false;}}
 function link(){try{const raw=(window.PRIMAL_COMMUNITY?.whatsappUrl||'').trim();if(!raw)return '';const u=new URL(raw);if(u.protocol!=='https:'||u.username||u.password||u.port)return '';return ['chat.whatsapp.com','wa.me','www.whatsapp.com','whatsapp.com'].includes(u.hostname)?u.href:'';}catch{return '';}}
 const whatsapp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.48 0 .14 5.34.13 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.57 0 11.91-5.34 11.92-11.91a11.83 11.83 0 0 0-3.45-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.22-3.73.98.99-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.26c0-5.46 4.45-9.9 9.92-9.9a9.84 9.84 0 0 1 7.01 2.91 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.92 9.9Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>';
 function render(){
  dialog.innerHTML=`<div class="community-art"><img src="./community.jpg" alt="${t('Un grupo de boxeadores celebra después de entrenar','A group of boxers celebrate after training')}" width="1200" height="800"><button class="community-close" type="button" aria-label="${t('Cerrar invitación','Close invitation')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="community-copy"><div class="community-medal" aria-hidden="true"></div><div class="community-kicker">${t('MEDALLA DESBLOQUEADA · PARTE DEL CLUB','MEDAL UNLOCKED · PART OF THE CLUB')}</div><h2 id="communityTitle">${t('Primera sesión.<br>Ya eres del club.','First workout.<br>You’re part of the club.')}</h2><p id="communityDescription">${t('Lleva tu entrenamiento más lejos. Entra a la comunidad PRIMAL en WhatsApp y entérate de los beneficios para miembros.','Take your training further. Join the PRIMAL WhatsApp community and discover member benefits.')}</p><a class="community-cta" id="communityJoin" target="_blank" rel="noopener noreferrer" hidden>${whatsapp}<span>${t('Entrar a la comunidad','Join the community')}</span></a><button class="community-cta" id="communitySoon" type="button" disabled>${whatsapp}<span>${t('Comunidad próximamente','Community coming soon')}</span></button><button class="community-later" type="button">${t('Ahora no','Not now')}</button><p class="community-note">${t('Tu medalla ya es tuya. Unirte es opcional.','Your medal is already yours. Joining is optional.')}</p></div>`;
  const medal=document.querySelector('[data-medal-id="community"] .pc-medal');if(medal){const copy=medal.cloneNode(true);copy.classList.remove('pc-locked');copy.style.width='78px';copy.style.height='86px';dialog.querySelector('.community-medal').append(copy);}
  const url=link();const a=dialog.querySelector('#communityJoin');if(url){a.href=url;a.hidden=false;dialog.querySelector('#communitySoon').hidden=true;}
  dialog.querySelector('.community-close').onclick=()=>dialog.close();dialog.querySelector('.community-later').onclick=()=>dialog.close();
 }
 function open(){
  if(dialog.open||(!eligible()&&!pending))return;
  if(window.PrimalRecorder?.active)return;
  lastFocus=document.activeElement;render();dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.community-close').focus({preventScroll:true});pending=false;seen=true;
  try{localStorage.setItem(SEEN,'seen');}catch{}
  const toast=document.querySelector('.pc-toast');if(toast)toast.hidden=true;
 }
 function maybeOpen(){if(!pending||seen||window.PrimalRecorder?.active||document.querySelector('dialog[open]'))return;if(['prepare','work','rest','paused'].includes(document.body.dataset.state))return;open();}
 window.addEventListener('primal-medals-earned',e=>{if(e.detail.ids.includes('community')&&!seen){pending=true;queueMicrotask(maybeOpen);}});
 document.addEventListener('primal-recording-change',()=>queueMicrotask(maybeOpen));
 // Wait for an open recording/result/settings panel to close before showing the reward.
 new MutationObserver(()=>queueMicrotask(maybeOpen)).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','data-state']});
 dialog.addEventListener('close',()=>lastFocus?.isConnected&&lastFocus.focus({preventScroll:true}));
 dialog.addEventListener('keydown',e=>e.stopPropagation());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 document.addEventListener('primal-language-change',()=>{if(dialog.open)render();});
 window.PrimalCommunity={open};
})();
