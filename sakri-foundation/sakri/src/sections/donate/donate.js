document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
  const o=b.textContent;try{await navigator.clipboard.writeText(document.querySelector(b.dataset.copy).textContent.trim());b.textContent='Copied ✓'}catch{b.textContent='Copy failed'}
  setTimeout(()=>b.textContent=o,1800)}));
