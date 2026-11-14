'use strict';
(() => {
  const SELECTORS=[
    '.shortcut-tile','.settings-nav-button','.theme-card','.layout-card',
    '.blobby-sidebar-status-card','.blobby-chat-channel','.blobby-dm-conversation',
    '.blobby-group-conversation'
  ].join(',');

  function decorate(root=document){
    root.querySelectorAll(SELECTORS).forEach(el=>el.classList.add('pangas-spot'));
  }
  function move(e){
    const el=e.target.closest?.('.pangas-spot');
    if(!el)return;
    const r=el.getBoundingClientRect();
    el.style.setProperty('--spot-x',`${e.clientX-r.left}px`);
    el.style.setProperty('--spot-y',`${e.clientY-r.top}px`);
  }
  document.addEventListener('pointermove',move,{passive:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>decorate(),{once:true});else decorate();
  new MutationObserver(records=>{
    for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches?.(SELECTORS))n.classList.add('pangas-spot');decorate(n);}
  }).observe(document.documentElement,{childList:true,subtree:true});
})();
