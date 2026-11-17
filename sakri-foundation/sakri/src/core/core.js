// GLOBAL JS: scroll reveal (staggered), parallax ([data-parallax]), shrinking header. Respects reduced motion.
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{const i=[...el.parentElement.children].indexOf(el);el.style.transitionDelay=(i%6)*90+'ms';io.observe(el)});
const hd=document.querySelector('.site-header'),px=[...document.querySelectorAll('[data-parallax]')];let tick=false;
const onScroll=()=>{tick=false;hd?.classList.toggle('shrunk',scrollY>40);if(!calm)px.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)el.style.transform=`translateY(${-r.top*el.dataset.parallax}px)`})};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
