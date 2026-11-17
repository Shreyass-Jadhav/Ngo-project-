const t=document.querySelector('.nav-toggle'),n=document.getElementById('nav');
t?.addEventListener('click',()=>t.setAttribute('aria-expanded',n.classList.toggle('open')));
n?.addEventListener('click',e=>{if(e.target.closest('a')){n.classList.remove('open');t.setAttribute('aria-expanded','false')}});
