'use strict';
document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menuButton.addEventListener('click',()=>{const isOpen=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!isOpen));navigation.classList.toggle('is-open',!isOpen);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:701px)').addEventListener('change',closeMenu);

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const progress=document.querySelector('.scroll-progress');
let scrollScheduled=false;
function updateProgress(){const distance=document.documentElement.scrollHeight-innerHeight;progress.style.width=(distance>0?Math.min(100,Math.max(0,scrollY/distance*100)):0)+'%';scrollScheduled=false;}
addEventListener('scroll',()=>{if(!scrollScheduled){requestAnimationFrame(updateProgress);scrollScheduled=true;}},{passive:true});
addEventListener('resize',updateProgress);updateProgress();

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;let visible=0;
  document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('.work-card').forEach(card=>{card.hidden=filter!=='all'&&!card.dataset.category.split(' ').includes(filter);if(!card.hidden)visible++;});
  document.querySelector('.filter-status').textContent=`Showing ${visible} experience ${visible===1?'highlight':'highlights'}`;
}));

const projects={
  rayyan:{title:'Al Rayyan Restaurant Management',meta:'DOHA, QATAR / 2025 — 2026',role:'Digital Marketing Manager',intro:'Marketing across eight restaurants, from casual dining to fine dining. A multi-brand role connecting content, paid campaigns, and the people behind each menu.',points:['Managed platform-specific content for Instagram, Talabat, Snoonu, and Rafeeq.','Managed Meta Ads Manager campaigns and planned calendars around events, offers, and customer trends.','Coordinated food photography and creative reviews to maintain each brand’s visual identity.','Worked with kitchen teams on launches and seasonal campaigns, and coordinated influencer and blogger collaborations.'],skills:['Restaurant marketing','Meta Ads','Content strategy','Creator partnerships']},
  cntrl:{title:'Cntrl M',meta:'KERALA, INDIA / 2023 — 2025',role:'Digital Marketing Manager & Team Lead',intro:'An agency role combining full-funnel digital campaigns with creative planning, client strategy, and team leadership.',points:['Executed campaigns across Meta and Google, optimizing audience targeting and performance with ROI in focus.','Planned social content and directed brand-aligned creative shoots.','Managed influencer and celebrity collaborations for key campaigns.','Led client meetings, campaign performance reviews, and strategy discussions informed by data.'],skills:['Google Ads','Meta Ads','Full-funnel strategy','Team leadership']},
  bluepin:{title:'Bluepin Digital',meta:'KOCHI, KERALA / 2022 — 2023',role:'Social Media Marketer',intro:'Building brand awareness through social media, video, and regional marketing, including campaigns designed for GCC audiences.',points:['Managed Meta and Google advertising targeting Gulf Cooperation Council audiences.','Supported brand awareness through strategic media placements.','Produced video content and digital assets for websites, social platforms, and promotions.','Developed regional strategies supporting brand and franchise growth.'],skills:['Social media','GCC audiences','Video content','Regional marketing']},
  lustro:{title:'Lustro Wedding Stories',meta:'THRISSUR, KERALA / 2021 — 2022',role:'DOP Manager',intro:'The visual-production foundation of my marketing career: shaping stories through light, camera work, and thoughtful execution.',points:['Directed visual style, camera work, and lighting for cinematic wedding shoots.','Coordinated client requirements and shoot schedules.','Supervised on-site teams during production.','Oversaw editing, color grading, and final delivery.'],skills:['Visual storytelling','Production coordination','Creative direction','Post-production']}
};
const dialog=document.querySelector('#project-dialog');
let lastProjectTrigger;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const project=projects[button.dataset.project];lastProjectTrigger=button;
  document.querySelector('#dialog-title').textContent=project.title;
  document.querySelector('#dialog-meta').textContent=project.meta;
  document.querySelector('#dialog-role').textContent=project.role;
  document.querySelector('#dialog-intro').textContent=project.intro;
  document.querySelector('#dialog-points').replaceChildren(...project.points.map(point=>{const el=document.createElement('li');el.textContent=point;return el;}));
  document.querySelector('#dialog-skills').replaceChildren(...project.skills.map(skill=>{const el=document.createElement('span');el.textContent=skill;return el;}));
  dialog.showModal();document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastProjectTrigger?.focus({preventScroll:true});});
document.querySelector('#dialog-contact').addEventListener('click',()=>dialog.close());
const copyButton=document.querySelector('#copy-email');
copyButton.addEventListener('click',async()=>{
  const status=document.querySelector('.copy-status');
  try{await navigator.clipboard.writeText('mhdroshanes@gmail.com');status.textContent='Email address copied.';copyButton.textContent='Copied ✓';setTimeout(()=>{copyButton.textContent='Copy email ↗';},2500);}
  catch{status.textContent='You can select and copy this address: mhdroshanes@gmail.com';}
});
document.querySelector('#year').textContent=String(new Date().getFullYear());
