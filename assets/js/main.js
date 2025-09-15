
// Main JS added by ChatGPT
(function(){
  // Helper to add script only once
  console.log('main.js loaded');

  // Active nav link highlight
  try {
    var navLinks = document.querySelectorAll('nav a');
    var path = window.location.pathname.split('/').pop();
    navLinks.forEach(function(a){
      var href = a.getAttribute('href');
      if(!href) return;
      var hrefFile = href.split('/').pop();
      if(hrefFile === path || (path === '' && hrefFile === 'index.html')) {
        a.classList.add('active');
      }
    });
  } catch(e){}

  // Back to top button
  var topBtn = document.createElement('button');
  topBtn.id = 'backToTop';
  topBtn.textContent = '↑';
  Object.assign(topBtn.style, {
    position:'fixed', right:'18px', bottom:'18px', padding:'10px 12px',
    'font-size':'18px', display:'none', 'border-radius':'6px', border:'none', cursor:'pointer',
    'box-shadow':'0 2px 6px rgba(0,0,0,0.2)'
  });
  document.body.appendChild(topBtn);
  window.addEventListener('scroll', function(){
    if(window.scrollY > 300) topBtn.style.display = 'block';
    else topBtn.style.display = 'none';
  });
  topBtn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  // Theme toggle
  var themeBtn = document.createElement('button');
  themeBtn.id = 'themeToggle';
  themeBtn.textContent = '🌙';
  Object.assign(themeBtn.style, {
    position:'fixed', right:'18px', bottom:'70px', padding:'8px 10px', 'font-size':'16px',
    'border-radius':'6px', border:'none', cursor:'pointer', 'box-shadow':'0 2px 6px rgba(0,0,0,0.2)'
  });
  document.body.appendChild(themeBtn);
  function setTheme(t){
    if(t === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('site-theme', t);
    themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  }
  var saved = localStorage.getItem('site-theme') || 'light';
  setTheme(saved);
  themeBtn.addEventListener('click', function(){
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Simple contact form handler (if present)
  var contactForm = document.querySelector('form[action="#"]');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var valid = true;
      var fields = ['first-name','last-name','email','subject','message'];
      fields.forEach(function(id){
        var el = document.getElementById(id);
        if(!el) return;
        el.classList.remove('input-error');
        if(!el.value || el.value.trim() === '') { valid = false; el.classList.add('input-error'); }
      });
      var email = document.getElementById('email');
      if(email && !/^\S+@\S+\.\S+$/.test(email.value)) { valid = false; email.classList.add('input-error'); }

      // Show result
      var existing = document.getElementById('formResult');
      if(existing) existing.remove();
      var msg = document.createElement('div');
      msg.id = 'formResult';
      msg.style.marginTop = '12px';
      if(valid){
        msg.textContent = 'Thanks — your message was received (demo).';
        msg.style.color = 'green';
        contactForm.reset();
      } else {
        msg.textContent = 'Please fill the required fields correctly.';
        msg.style.color = 'crimson';
      }
      contactForm.appendChild(msg);
    });
  }

  // Lightbox for images inside site (Managed Wellness)
  var imgs = document.querySelectorAll('img');
  var lightbox;
  function showLightbox(src, alt){
    if(!lightbox){
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      Object.assign(lightbox.style, {
        position:'fixed', left:0, top:0, right:0, bottom:0, display:'flex', 'align-items':'center', 'justify-content':'center',
        'background':'rgba(0,0,0,0.8)', cursor:'zoom-out', 'z-index':9999
      });
      var im = document.createElement('img');
      im.style.maxWidth='90%'; im.style.maxHeight='90%';
      lightbox.appendChild(im);
      lightbox.addEventListener('click', function(){ lightbox.style.display='none'; });
      document.body.appendChild(lightbox);
    }
    lightbox.querySelector('img').src = src;
    lightbox.style.display = 'flex';
  }
  imgs.forEach(function(i){
    if(i.src && i.src.indexOf('Managed Wellness') !== -1){
      i.style.cursor='zoom-in';
      i.addEventListener('click', function(){ showLightbox(i.src, i.alt||''); });
    }
  });

  // small CSS injections
  var css = document.createElement('style');
  css.textContent = `
    .input-error{ outline:2px solid crimson; }
    nav a.active{ background:#2C3E50; border-radius:4px; }
    [data-theme="dark"]{ background:#111; color:#ddd; }
    [data-theme="dark"] header{ filter:brightness(0.7); }
    #backToTop, #themeToggle{ background: #fff; }
    [data-theme="dark"] #backToTop, [data-theme="dark"] #themeToggle{ background:#222; color:#ddd; }
  `;
  document.head.appendChild(css);

})();
