'use strict';
/* CONFIGURAÇÃO EDITÁVEL: contato de demonstração; substituir após aprovação. */
const CONFIG = {
  name: 'Altek — Serralheria e Vidraçaria',
  whatsapp: '5511950869006',
  phoneLabel: '(11) 95086-9006',
  address: 'Av. Cláudio Augusto Fernandes, 543, Cidade São Mateus, São Paulo — SP, CEP 03962-120',
  street: 'Av. Cláudio Augusto Fernandes, 543',
  city: 'São Paulo', region: 'SP', postalCode: '03962-120',
  siteUrl: '', // Domínio oficial com https://, quando aprovado. Não incluir telefone temporário no schema.
  demo: true,
  message: 'Olá! Vi o site da Altek e gostaria de solicitar um orçamento.',
};
/* Categorias provisórias: validar com a Altek antes de publicar oficialmente. */
const SERVICES = [
  {title:'Box para banheiro', description:'Soluções em vidro para diferentes estilos e tamanhos de banheiro.', image:'box', alt:'Banheiro com box de vidro transparente e perfis escuros'},
  {title:'Portas e janelas', description:'Opções em vidro e alumínio para diferentes ambientes.', image:'portas', alt:'Porta envidraçada de perfis claros aberta para uma varanda'},
  {title:'Espelhos', description:'Espelhos para ampliar e valorizar ambientes.', image:'espelhos', alt:'Espelho amplo sobre bancada de banheiro'},
  {title:'Serralheria', description:'Soluções metálicas para necessidades residenciais e comerciais.', image:'serralheria', alt:'Detalhe de escadas e corrimãos metálicos'},
  {title:'Divisórias e fachadas', description:'Aplicações em vidro para integrar ou separar espaços.', image:'divisorias', alt:'Divisória de vidro em ambiente contemporâneo'},
  {title:'Projetos sob medida', description:'Converse sobre as medidas e características do que você precisa.', image:'medida', alt:'Detalhes de perfis e painéis de vidro em ambiente iluminado'},
];
const GALLERY = [
  {title:'Luz e amplitude',image:'assets/images/hero.webp',alt:'Grandes painéis de vidro integrando o interior de uma casa ao deck'},
  {title:'Box de vidro',image:'assets/images/servicos/box.webp',alt:'Aplicação de vidro transparente em box de banheiro'},
  {title:'Espelhos no ambiente',image:'assets/images/servicos/espelhos.webp',alt:'Espelho e bancada em banheiro'},
  {title:'Portas e janelas',image:'assets/images/servicos/portas.webp',alt:'Porta de vidro com vista para varanda'},
  {title:'Estruturas metálicas',image:'assets/images/servicos/serralheria.webp',alt:'Escadas e guarda-corpos em metal'},
  {title:'Ambientes integrados',image:'assets/images/servicos/divisorias.webp',alt:'Divisória envidraçada integrando ambientes'},
];
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const whatsappUrl = (message = CONFIG.message) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = whatsappUrl(); });
document.querySelectorAll('[data-phone]').forEach(el => { el.textContent = CONFIG.phoneLabel; });
const mapQuery = encodeURIComponent(CONFIG.address);
document.querySelectorAll('[data-maps]').forEach(a => {a.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;});
document.getElementById('map').src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
document.querySelector('[data-address]').textContent = CONFIG.address;
document.getElementById('services-grid').innerHTML = SERVICES.map((s,i) => `<article class="service-card"><a class="service-image" href="${whatsappUrl(`Olá! Vi o site da Altek e gostaria de informações sobre ${s.title}.`)}" target="_blank" rel="noopener noreferrer" aria-label="Solicitar informações sobre ${s.title}"><img src="assets/images/servicos/${s.image}.webp" alt="${s.alt}" width="900" height="610" loading="lazy"><span class="service-number">0${i+1}</span></a><h3>${s.title}${icon('up')}</h3><p>${s.description}</p><a class="text-link" href="${whatsappUrl(`Olá! Vi o site da Altek e gostaria de informações sobre ${s.title}.`)}" target="_blank" rel="noopener noreferrer">Solicitar informações${icon('arrow')}</a></article>`).join('');
document.getElementById('gallery').innerHTML = GALLERY.map((g,i) => `<button class="gallery-item" data-image="${i}" aria-label="Ampliar imagem: ${g.title}"><img src="${g.image}" alt="${g.alt}" width="900" height="1000" loading="lazy"><span>${g.title}${icon('up')}</span></button>`).join('');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');navigation.classList.remove('open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();toggle.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
window.matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const header=document.getElementById('header');
const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>16);
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver' in window){
  const navLinks=[...navigation.querySelectorAll('a[href^="#"]')];
  const sections=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));});},{rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('main section[id]').forEach(el=>sections.observe(el));
  if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.06});
    document.querySelectorAll('.section-heading,.about-copy,.store-photo,.contact-inner,.service-card').forEach(el=>{el.classList.add('reveal');reveal.observe(el);});
  }
}
const lightbox=document.getElementById('lightbox');
let currentImage=0,lastFocus;
function displayImage(index){currentImage=(index+GALLERY.length)%GALLERY.length;const image=GALLERY[currentImage];document.getElementById('lightbox-image').src=image.image;document.getElementById('lightbox-image').alt=image.alt;document.getElementById('lightbox-title').textContent=image.title;document.getElementById('lightbox-counter').textContent=`${String(currentImage+1).padStart(2,'0')} / ${String(GALLERY.length).padStart(2,'0')}`;}
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{lastFocus=button;displayImage(Number(button.dataset.image));lightbox.showModal();document.body.classList.add('locked');document.getElementById('lightbox-close').focus();}));
document.getElementById('lightbox-close').addEventListener('click',()=>lightbox.close());
document.getElementById('lightbox-prev').addEventListener('click',()=>displayImage(currentImage-1));
document.getElementById('lightbox-next').addEventListener('click',()=>displayImage(currentImage+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>{document.body.classList.remove('locked');lastFocus?.focus();});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();displayImage(currentImage-1);}if(e.key==='ArrowRight'){e.preventDefault();displayImage(currentImage+1);}});
if(CONFIG.siteUrl){const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=CONFIG.siteUrl;document.head.append(canonical);}
const schema=document.createElement('script');schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:CONFIG.name,description:'Serralheria e vidraçaria com endereço físico em São Mateus, São Paulo.',address:{'@type':'PostalAddress',streetAddress:CONFIG.street,addressLocality:CONFIG.city,addressRegion:CONFIG.region,postalCode:CONFIG.postalCode,addressCountry:'BR'},...(CONFIG.siteUrl?{url:CONFIG.siteUrl}: {})});document.head.append(schema);
