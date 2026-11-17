document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count,io=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;io.disconnect();
    const t0=performance.now(),run=t=>{const p=Math.min((t-t0)/1500,1);el.textContent=Math.round(end*p);if(p<1)requestAnimationFrame(run)};requestAnimationFrame(run)});
  io.observe(el)});
