'use strict';
(() => {
  const hero=document.querySelector('.cinematic-hero');
  const toggle=document.querySelector('#motion-toggle');
  const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  let paused=motionPreference.matches;
  let frame=0;
  const resetPosition=()=>{
    hero.style.setProperty('--portrait-x','0px');hero.style.setProperty('--portrait-y','0px');
    hero.style.setProperty('--backdrop-x','0px');hero.style.setProperty('--backdrop-y','0px');
    hero.style.setProperty('--light-x','50%');hero.style.setProperty('--light-y','40%');
  };
  const update=()=>{
    hero.dataset.motion=paused?'paused':'playing';
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.querySelector('.motion-label').textContent=motionPreference.matches?'Reduced motion':paused?'Play motion':'Pause motion';
    toggle.querySelector('.motion-icon').textContent=paused?'▷':'Ⅱ';
    toggle.disabled=motionPreference.matches;
    toggle.title=motionPreference.matches?'Motion is disabled by your device preference':paused?'Play animated background and portrait':'Pause animated background and portrait';
    if(paused){cancelAnimationFrame(frame);frame=0;resetPosition();}
  };
  toggle.addEventListener('click',()=>{paused=!paused;update();});
  motionPreference.addEventListener('change',()=>{paused=motionPreference.matches;update();});
  hero.addEventListener('pointermove',event=>{
    if(paused||!finePointer.matches||innerWidth<=1000)return;
    cancelAnimationFrame(frame);
    const bounds=hero.getBoundingClientRect();
    const x=(event.clientX-bounds.left)/bounds.width-.5;
    const y=(event.clientY-bounds.top)/bounds.height-.5;
    frame=requestAnimationFrame(()=>{
      hero.style.setProperty('--portrait-x',`${x*16}px`);hero.style.setProperty('--portrait-y',`${y*10}px`);
      hero.style.setProperty('--backdrop-x',`${-x*10}px`);hero.style.setProperty('--backdrop-y',`${-y*5}px`);
      hero.style.setProperty('--light-x',`${50+x*35}%`);hero.style.setProperty('--light-y',`${40+y*25}%`);
      frame=0;
    });
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;resetPosition();});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){hero.dataset.motion='paused';cancelAnimationFrame(frame);frame=0;resetPosition();}
    else update();
  });
  update();
})();
