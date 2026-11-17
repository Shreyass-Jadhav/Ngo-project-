const f=document.getElementById('contact-form');f?.addEventListener('submit',async e=>{e.preventDefault();const m=document.getElementById('form-msg');
  if(!f.checkValidity()){m.textContent='Please fill all fields.';return}
  try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
    m.textContent=r.ok?'Thank you! We will get back to you.':'Could not send. Please try again.';if(r.ok)f.reset()}catch{m.textContent='Network error.'}});
