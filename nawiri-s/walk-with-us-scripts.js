(function () {
  if ("scrollRestoration" in history) { history.scrollRestoration = "manual"; }
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", function () { window.scrollTo(0, 0); }, { passive: true });
})();

function nawiriUpload(input, idx) {
  if (!input.files || !input.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var figure = document.getElementById('gfig-' + idx);
    if (!figure) return;
    var img = document.createElement('img');
    img.src = e.target.result;
    img.alt = '';
    var overlay = document.createElement('div');
    overlay.className = 'upload-placeholder';
    overlay.style.cssText = 'background:rgba(30,74,58,0.52);opacity:0;transition:opacity 0.3s ease;';
    var replaceInput = document.createElement('input');
    replaceInput.type = 'file';
    replaceInput.accept = 'image/*';
    replaceInput.setAttribute('aria-label', 'Replace photo');
    replaceInput.onchange = function() { nawiriUpload(replaceInput, idx); };
    overlay.innerHTML = '<div class="upload-icon" style="background:rgba(255,255,255,0.9)">&#128260;</div><span class="upload-label" style="color:#fff">Replace photo</span>';
    overlay.appendChild(replaceInput);
    figure.addEventListener('mouseenter', function() { overlay.style.opacity = '1'; });
    figure.addEventListener('mouseleave', function() { overlay.style.opacity = '0'; });
    figure.innerHTML = '';
    figure.appendChild(img);
    figure.appendChild(overlay);
  };
  reader.readAsDataURL(input.files[0]);
}

(function(){
  "use strict";
  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var mobileMq=window.matchMedia("(max-width:880px)");
  var coarseMq=window.matchMedia("(pointer:coarse)");
  function isMob(){return mobileMq.matches||coarseMq.matches}
  function revealIn(el,obs){el.classList.add("in");if(obs)obs.unobserve(el)}
  function inVP(el){
    var r=el.getBoundingClientRect(),vh=window.innerHeight||document.documentElement.clientHeight,edge=isMob()?12:40;
    return r.top<vh-edge&&r.bottom>edge;
  }
  var nav=document.querySelector("nav.top");
  if(nav){
    var onScroll=function(){nav.classList.toggle("is-scrolled",window.scrollY>20)};
    onScroll();window.addEventListener("scroll",onScroll,{passive:true});
  }
  var hero=document.querySelector("header.hero");
  if(hero){
    var rh=function(){hero.classList.add("hero-ready")};
    if(reduced){rh()}else{requestAnimationFrame(function(){requestAnimationFrame(rh)})}
    window.addEventListener("pageshow",function(e){if(e.persisted)rh()},{passive:true});
  }
  var reveals=document.querySelectorAll(".reveal");
  if(reduced){reveals.forEach(function(el){el.classList.add("in")});return}
  reveals.forEach(function(el){
    var p=el.parentElement;
    if(p){
      var sibs=Array.prototype.filter.call(p.children,function(c){return c.classList&&c.classList.contains("reveal")});
      var i=sibs.indexOf(el);
      if(i>=0)el.style.setProperty("--reveal-i",String(i));
    }
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){if(!entry.isIntersecting)return;revealIn(entry.target,io)});
  },{threshold:isMob()?0.05:0.1,rootMargin:isMob()?"0px":"0px 0px -50px 0px"});
  reveals.forEach(function(el){if(inVP(el)){revealIn(el,io)}else{io.observe(el)}});
  var rt;
  window.addEventListener("resize",function(){
    clearTimeout(rt);rt=setTimeout(function(){
      reveals.forEach(function(el){if(!el.classList.contains("in")&&inVP(el))revealIn(el,io)});
    },120);
  },{passive:true});
  window.addEventListener("orientationchange",function(){
    setTimeout(function(){reveals.forEach(function(el){if(!el.classList.contains("in")&&inVP(el))revealIn(el,io)})},200);
  },{passive:true});
  document.querySelectorAll(".banner-visual").forEach(function(banner){
    if(inVP(banner)){banner.classList.add("is-visible");return}
    var bIo=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-visible");bIo.unobserve(e.target)}});
    },{threshold:isMob()?0.08:0.2});
    bIo.observe(banner);
  });
})();
