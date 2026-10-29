/* FixMas — floating contact modal + photo gallery lightbox */

(function(){
  var fab=document.getElementById('tjFab'),ov=document.getElementById('tjOverlay'),
      cl=document.getElementById('tjClose'),f=ov?ov.querySelector('.tj-form'):null,
      a=document.getElementById('tjAlert');
  if(!fab||!ov||!f) return;
  function open(){ov.classList.add('open');document.body.style.overflow='hidden';
    var n=f.querySelector('[name=name]'); if(n) n.focus();}
  function close(){ov.classList.remove('open');document.body.style.overflow='';}
  fab.addEventListener('click',open);
  cl.addEventListener('click',close);
  [].forEach.call(document.querySelectorAll('.tj-open-contact'),function(el){el.addEventListener('click',open);});
  ov.addEventListener('click',function(e){if(e.target===ov) close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('open')) close();});
  f.addEventListener('submit',function(e){
    var name=f.name.value.trim(),email=f.email.value.trim(),phone=f.phone.value.trim(),msg=f.message.value.trim();
    var emailok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!name||!phone||!emailok||!msg){e.preventDefault();a.className='tj-alert err';
      a.textContent='Please fill in your name, a valid email, phone, and message.';return;}
    if(window.fetch){e.preventDefault();
      fetch('send.php',{method:'POST',body:new FormData(f)})
      .then(function(r){return r.ok?r.text():Promise.reject();})
      .then(function(){a.className='tj-alert ok';a.textContent='Thanks! Your request has been sent — we\'ll be in touch shortly.';f.reset();})
      .catch(function(){a.className='tj-alert err';a.textContent='Sorry, something went wrong. Please call us instead.';});
    }
  });
})();

(function(){
  var items=[].slice.call(document.querySelectorAll('.gallery button'));
  var lb=document.getElementById('tjLightbox');
  if(!items.length||!lb) return;
  var img=document.getElementById('tjLightboxImg'),
      cap=document.getElementById('tjLightboxCaption'),
      closeBtn=document.getElementById('tjLightboxClose'),
      prevBtn=document.getElementById('tjLightboxPrev'),
      nextBtn=document.getElementById('tjLightboxNext'),
      idx=0;
  function show(i){
    idx=(i+items.length)%items.length;
    var it=items[idx];
    img.src=it.getAttribute('data-full');
    img.alt=it.querySelector('img').alt;
    cap.textContent=it.getAttribute('data-caption')||'';
  }
  function open(i){show(i);lb.classList.add('open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open');document.body.style.overflow='';}
  items.forEach(function(it,i){it.addEventListener('click',function(){open(i);});});
  closeBtn.addEventListener('click',close);
  prevBtn.addEventListener('click',function(){show(idx-1);});
  nextBtn.addEventListener('click',function(){show(idx+1);});
  lb.addEventListener('click',function(e){if(e.target===lb) close();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(idx-1);
    if(e.key==='ArrowRight') show(idx+1);
  });
})();

(function(){
  var nav=document.querySelector('header nav'),btn=document.getElementById('navToggle');
  if(!nav||!btn) return;
  function set(open){nav.classList.toggle('open',open);btn.setAttribute('aria-expanded',open);
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');}
  btn.addEventListener('click',function(){set(!nav.classList.contains('open'));});
  [].forEach.call(nav.querySelectorAll('ul a:not(.dd-toggle)'),function(a){a.addEventListener('click',function(){set(false);});});
  window.addEventListener('resize',function(){if(window.innerWidth>900) set(false);});
})();
