const lb=document.createElement('dialog');lb.className='lb';lb.innerHTML='<img alt="">';document.body.append(lb);
lb.addEventListener('click',()=>lb.close());
document.querySelectorAll('.masonry img').forEach(i=>i.addEventListener('click',()=>{const b=lb.firstChild;b.src=i.src;b.alt=i.alt;lb.showModal()}));
