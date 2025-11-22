// ===== CONFIG =====
const CONFIG = {
  herName: "Adellia",
  birthday: "2004-12-31T00:00:00+07:00",
  firstMet: "2024-03-12T00:00:00+07:00",
  datingStart: "2024-08-29T00:00:00+07:00",
  galleryInfo: [
    { src:"assets/gallery/1.jpg", caption:"Saat pertama kali kita duduk bareng dan semuanya terasa natural." },
    { src:"assets/gallery/2.jpg", caption:"Foto candid yang bikin aku sadar kamu selalu diam-diam mendukung." },
    { src:"assets/gallery/3.jpg", caption:"Momen ketawa berlebihan karena hal receh—ingat ini?" },
    { src:"assets/gallery/4.jpg", caption:"Sore itu langit jadi latar cerita kita." },
    { src:"assets/gallery/5.jpg", caption:"Hari jajan favorit, sederhana tapi hangat sekali." },
    { src:"assets/gallery/6.jpg", caption:"Selfie buru-buru sebelum pulang—mataku masih berbinar karena kamu." },
    { src:"assets/gallery/7.jpg", caption:"Malam panjang ngobrol mimpi; dunia mengecil jadi kita." },
    { src:"assets/gallery/8.jpg", caption:"Foto yang kusimpan kalau kangen—senyummu kompas pulangku." }
  ],
  loveNote: "Terima kasih sudah selalu sabar dan bikin aku merasa cukup.",
  birthdayWish: `Selamat ulang tahun, sayang. Terima kasih sudah tumbuh dengan begitu indah.
Semoga tahun ini jadi halaman penuh keberanian, tawa lepas, dan langkah yang yakin.
Aku selalu mendukung mimpi-mimpimu; jangan ragu cerita kalau butuh sandaran.
Terus jadi versi terbaik dari dirimu—yang hangat, perhatian, dan tulus.
Kamu berharga, jauh lebih dari yang kadang kamu sadari.
Peluk dari jauh sampai bisa kupeluk beneran. 🎂💞`,
  bgmStartSeconds: 60,
  overlaySrc: "assets/overlays/Template-Foto.png",
  frameRects: [
    [ 6,  7.8, 88, 16.5],
    [ 6, 31.5, 88, 16.5],
    [ 6, 55.3, 88, 16.5],
    [ 6, 79.1, 88, 16.5]
  ]
};

// ===== UTIL =====
const pad = n => String(n).padStart(2,'0');
const $   = q => document.querySelector(q);
const el  = (tag,attrs={}) => { const x=document.createElement(tag); Object.assign(x,attrs); return x; };

// ===== Popup sederhana (toast) =====
let toast, toastMsg, toastClose;
function ensureToast(){
  if (toast) return;
  toast = el('div'); toast.id='toast';
  Object.assign(toast.style,{
    position:'fixed', inset:'0', display:'grid', placeItems:'center',
    background:'rgba(0,0,0,.35)', backdropFilter:'blur(2px)',
    opacity:'0', pointerEvents:'none', transition:'opacity .18s ease', zIndex:'99999'
  });
  const box = el('div');
  Object.assign(box.style,{
    width:'min(92vw,380px)', background:'#151a2b', border:'1px solid #334155',
    borderRadius:'16px', boxShadow:'0 20px 60px rgba(0,0,0,.45)',
    padding:'16px', color:'#e5e7eb',
    display:'grid', gridTemplateColumns:'1fr auto', gap:'12px', alignItems:'center'
  });
  toastMsg = el('span',{textContent:'Ada sesuatu yang salah.'});
  toastClose = el('button',{type:'button',textContent:'OK'});
  Object.assign(toastClose.style,{
    padding:'8px 12px', borderRadius:'10px',
    background:'linear-gradient(90deg,#f472b6,#60a5fa)', border:'none',
    color:'#fff', fontWeight:'700', cursor:'pointer'
  });
  box.appendChild(toastMsg); box.appendChild(toastClose);
  toast.appendChild(box); document.body.appendChild(toast);
  toast.addEventListener('click',e=>{ if(e.target===toast) hideToast(); });
  toastClose.addEventListener('click', hideToast);
}
function showToast(msg){ ensureToast(); toastMsg.textContent = msg||toastMsg.textContent; toast.style.opacity='1'; toast.style.pointerEvents='auto'; }
function hideToast(){ if(!toast) return; toast.style.opacity='0'; toast.style.pointerEvents='none'; }

// ===== Header & Timers =====
const nameEl = $("#name"), dateLbl = $("#dateLbl"), dateText = $("#dateText"), loveNote = $("#loveNote");
if (nameEl) {
  nameEl.textContent = CONFIG.herName;
  loveNote.textContent = CONFIG.loveNote;

  const birthDate   = new Date(CONFIG.birthday);
  const firstMet    = new Date(CONFIG.firstMet);
  const datingStart = new Date(CONFIG.datingStart);

  const thisYear = new Date().getFullYear();
  const birthdayThisYear = new Date(thisYear, 11, 31, 0, 0, 0);
  const label = birthdayThisYear.toLocaleDateString('id-ID',{weekday:'long', day:'2-digit', month:'long', year:'numeric'});
  dateLbl.textContent  = label;
  dateText.textContent = label;
  $("#age").textContent = thisYear - birthDate.getFullYear();

  const lifeTimer  = $("#lifeTimer");
  const ageYMD     = $("#ageYMD");
  const datingTimer= $("#datingTimer");
  const metTimer   = $("#metTimer");

  function diffYMD(from,to){
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    if(days < 0){
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate(); months--;
    }
    if(months < 0){ months += 12; years--; }
    return {years,months,days};
  }

  function renderTimers(){
    const now = new Date();

    // Total hidup
    const lifeMs = now - birthDate;
    const lifeDays = Math.floor(lifeMs/86400000);
    const lifeHours = Math.floor((lifeMs%86400000)/3600000);
    const lifeMinutes = Math.floor((lifeMs%3600000)/60000);
    const lifeSeconds = Math.floor((lifeMs%60000)/1000);
    lifeTimer.innerHTML =
     `<div class="dd"><b>${pad(lifeDays)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(lifeHours)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(lifeMinutes)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(lifeSeconds)}</b><span>Detik</span></div>`;

    // Usia Y/M/D
    const {years,months,days} = diffYMD(birthDate, now);
    ageYMD.innerHTML =
     `<div class="dd"><b>${pad(years)}</b><span>Tahun</span></div>
      <div class="dd"><b>${pad(months)}</b><span>Bulan</span></div>
      <div class="dd"><b>${pad(days)}</b><span>Hari</span></div>`;

    // Lama berpacaran
    const datingMs = now - datingStart;
    const dtDays = Math.floor(datingMs/86400000);
    const dtHours = Math.floor((datingMs%86400000)/3600000);
    const dtMinutes = Math.floor((datingMs%3600000)/60000);
    const dtSeconds = Math.floor((datingMs%60000)/1000);
    datingTimer.innerHTML =
     `<div class="dd"><b>${pad(dtDays)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(dtHours)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(dtMinutes)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(dtSeconds)}</b><span>Detik</span></div>`;

    // Lama saling kenal
    const metMs = now - firstMet;
    const mtDays = Math.floor(metMs/86400000);
    const mtHours = Math.floor((metMs%86400000)/3600000);
    const mtMinutes = Math.floor((metMs%3600000)/60000);
    const mtSeconds = Math.floor((metMs%60000)/1000);
    metTimer.innerHTML =
     `<div class="dd"><b>${pad(mtDays)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(mtHours)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(mtMinutes)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(mtSeconds)}</b><span>Detik</span></div>`;
  }

  renderTimers();
  setInterval(renderTimers, 1000);
}

// ===== Galeri dengan Caption =====
const galStories = $("#galStories");
if (galStories) {
  CONFIG.galleryInfo.slice(0,8).forEach(item=>{
    const fig = el('figure',{className:'story'});
    const img = el('img',{src:item.src,alt:'kenangan'}); img.loading='lazy'; img.decoding='async';
    const cap = el('figcaption',{textContent:item.caption});
    fig.appendChild(img); fig.appendChild(cap); galStories.appendChild(fig);
  });
}

// ===== Musik =====
const audio = $("#bgm"), btnPlay = $("#btnPlay");
if (btnPlay && audio){
  let started=false, playing=false;
  btnPlay.addEventListener('click', async ()=>{
    try{
      if(!started){ audio.currentTime = Number(CONFIG.bgmStartSeconds||0); started=true; }
      if(!playing){ await audio.play(); btnPlay.textContent='⏸️ Hentikan Musik'; }
      else { audio.pause(); btnPlay.textContent='▶️ Putar Musik'; }
      playing=!playing;
    }catch{ showToast('Browser memblokir autoplay. Coba ketuk lagi ya.'); }
  });
}

// ===== Shortcut ke Photo Booth =====
$("#btnBooth")?.addEventListener('click', ()=>$("#frame")?.scrollIntoView({behavior:'smooth'}));

// ===== Petals / Hearts =====
const hv = document.getElementById('hearts');
const hx = hv.getContext('2d');
const DPR = Math.min(window.devicePixelRatio||1,1.25);
function resizeHearts(){
  hv.width = Math.floor(innerWidth*DPR);
  hv.height= Math.floor(innerHeight*DPR);
  hv.style.width = innerWidth+'px';
  hv.style.height= innerHeight+'px';
  hx.setTransform(DPR,0,0,DPR,0,0);
}
addEventListener('resize', resizeHearts); resizeHearts();
let petals=[], petalsId=null;
function drawPetal(x,y,s,rot){
  hx.save(); hx.translate(x,y); hx.rotate(rot); hx.scale(s/20,s/20);
  hx.beginPath(); hx.moveTo(0,0); hx.bezierCurveTo(6,-6,14,-6,16,0); hx.bezierCurveTo(14,6,6,6,0,0);
  hx.closePath(); hx.fillStyle=['#f9a8d4','#fecaca','#fce7f3'][Math.floor(Math.random()*3)];
  hx.globalAlpha=0.9; hx.fill(); hx.restore();
}
function petalsRain(){
  const W = hv.width / DPR;
  for(let i=0;i<50;i++){
    petals.push({x:Math.random()*W,y:-10,s:10+Math.random()*16,vY:.8+Math.random()*1.6,vX:(Math.random()-.5)*.8,r:Math.random()*Math.PI,a:1});
  }
  if(!petalsId) petalsLoop();
}
function petalsLoop(){
  const W = hv.width / DPR, H = hv.height / DPR;
  hx.clearRect(0,0,W,H);
  petals.forEach(p=>{
    p.y+=p.vY; p.x+=p.vX; p.r+=.02; p.a-=.004;
    hx.globalAlpha=Math.max(0,p.a); drawPetal(p.x,p.y,p.s,p.r);
  });
  petals = petals.filter(p=>p.a>0 && p.y<H+30);
  if(petals.length>0) petalsId=requestAnimationFrame(petalsLoop);
  else { cancelAnimationFrame(petalsId); petalsId=null; }
}

// ===== Popup Ucapan (hapus tombol salin) =====
const wishDlg = $("#wishDlg");
const btnOpenWish = $("#btnOpenWish");
const btnCloseWish = $("#btnCloseWish");
const wishText = $("#wishText");
if (wishDlg && btnOpenWish && btnCloseWish && wishText){
  wishText.textContent = CONFIG.birthdayWish;
  btnOpenWish.addEventListener('click', ()=>{
    wishDlg.showModal?.(); petalsRain();
  });
  btnCloseWish.addEventListener('click', ()=>wishDlg.close?.());
  wishDlg.addEventListener('click', e=>{
    if(e.target===wishDlg) wishDlg.close?.();
  });
}

// ===== Photo Booth =====
const OVERLAY_SRC = CONFIG.overlaySrc;
const FRAME_PCTS  = CONFIG.frameRects;
const frameCanvas = $("#frameCanvas");
const fctx = frameCanvas?.getContext('2d');
const resultWrap  = $("#resultWrap");
const btnDownload = $("#btnDownload");
const btnBackChoose = $("#btnBackChoose");
const choiceRow = $("#choiceRow");
const btnCamFlow = $("#btnCamFlow");
const btnUploadFlow = $("#btnUploadFlow");
const boothWrap = $("#boothWrap");
const cam = $("#cam");
const btnStartCam = $("#btnStartCam");
const btnShot = $("#btnShot");
const btnNext = $("#btnNext");
const btnRetry = $("#btnRetry");
const btnReset = $("#btnReset");
const btnConfirmCam = $("#btnConfirmCam");
const uploadWrap = $("#uploadWrap");
const files4 = $("#files4");
const btnClearUpload = $("#btnClearUpload");
const btnConfirmUpload = $("#btnConfirmUpload");
const uploadGrid = $("#uploadGrid");
const confirmDlg = $("#confirmDlg");
const slotGrid = $("#slotGrid");
const slotCanvases = slotGrid ? Array.from(slotGrid.querySelectorAll('canvas.slot')) : [];
const upCanvases   = uploadGrid ? Array.from(uploadGrid.querySelectorAll('canvas.upslot')) : [];

let overlayImg=null, overlayReady=false;
let images=[null,null,null,null];
let activeIndex=0;
let stream=null;

function show(el){ el?.classList.remove('hidden'); el?.setAttribute('aria-hidden','false'); }
function hide(el){ el?.classList.add('hidden'); el?.setAttribute('aria-hidden','true'); }
function enable(...els){ els.forEach(e=>e && (e.disabled=false)); }
function disable(...els){ els.forEach(e=>e && (e.disabled=true)); }

function drawPlaceholder(canvas,n){
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#0b1220'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle='#334155'; ctx.setLineDash([6,6]); ctx.strokeRect(6,6,canvas.width-12,canvas.height-12);
  ctx.setLineDash([]); ctx.fillStyle='#94a3b8'; ctx.font='700 20px Poppins,sans-serif';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(String(n), canvas.width/2, canvas.height/2);
}
function resetPreviews(){
  slotCanvases.forEach((c,i)=>{ c.style.outline=''; drawPlaceholder(c,i+1); });
  upCanvases.forEach((c,i)=>{ drawPlaceholder(c,i+1); });
}
function markActive(idx){
  slotCanvases.forEach(c=>c.style.outline='');
  slotCanvases[idx]?.style.setProperty('outline','2px solid #60a5fa');
}
function ensureOverlay(){
  if(overlayImg) return;
  overlayImg = new Image();
  overlayImg.onload = ()=>{
    overlayReady=true;
    frameCanvas.width = overlayImg.naturalWidth;
    frameCanvas.height= overlayImg.naturalHeight;
  };
  overlayImg.src = OVERLAY_SRC;
}
function rectPx([x,y,w,h]){
  const cw=frameCanvas.width, ch=frameCanvas.height;
  return [
    Math.round(x*cw/100),
    Math.round(y*ch/100),
    Math.round(w*cw/100),
    Math.round(h*ch/100),
  ];
}
function toChoice(){
  hide(boothWrap); hide(uploadWrap); hide(resultWrap); show(choiceRow);
  stopCam(); images=[null,null,null,null]; activeIndex=0;
  resetPreviews();
  disable(btnShot,btnNext,btnRetry,btnReset,btnConfirmCam,btnConfirmUpload);
  btnDownload.style.opacity='.6'; btnDownload.style.pointerEvents='none'; btnDownload.removeAttribute('href');
}

// Kamera
async function startCam(){
  try{
    stopCam();
    stream = await navigator.mediaDevices.getUserMedia({
      video:{facingMode:'user', width:{ideal:720}, height:{ideal:960}}, audio:false
    });
    cam.srcObject = stream;
    enable(btnShot,btnNext,btnRetry,btnReset);
    markActive(activeIndex);
  }catch{ showToast('Tidak bisa membuka kamera. Periksa izin & HTTPS.'); }
}
function stopCam(){ if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; } cam.srcObject=null; }

slotGrid?.addEventListener('click', e=>{
  const c = e.target.closest('canvas.slot'); if(!c) return;
  activeIndex = Number(c.dataset.i)||0; markActive(activeIndex);
});
btnStartCam?.addEventListener('click', startCam);

btnShot?.addEventListener('click', ()=>{
  if(!stream || !cam.videoWidth) return;
  const off=document.createElement('canvas'); off.width=720; off.height=960;
  const ox=off.getContext('2d');
  const iw=cam.videoWidth, ih=cam.videoHeight;
  const s=Math.max(off.width/iw, off.height/ih);
  const dw=iw*s, dh=ih*s, dx=(off.width-dw)/2, dy=(off.height-dh)/2;
  ox.drawImage(cam, dx,dy,dw,dh);
  const url=off.toDataURL('image/png');
  const im=new Image();
  im.onload=()=>{
    images[activeIndex]=im;
    coverDrawTo(slotCanvases[activeIndex], im);
    markActive(activeIndex);
    if(images.every(Boolean)) enable(btnConfirmCam);
  };
  im.src=url;
});
btnNext?.addEventListener('click', ()=>{ activeIndex=(activeIndex+1)%4; markActive(activeIndex); });
btnRetry?.addEventListener('click', ()=>{ markActive(activeIndex); });
btnReset?.addEventListener('click', ()=>{
  images=[null,null,null,null]; activeIndex=0; resetPreviews(); markActive(activeIndex); disable(btnConfirmCam);
});

// Upload
files4?.addEventListener('change', ()=>{
  const files=Array.from(files4.files||[]);
  if(files.length!==4){ showToast('Pilih tepat 4 foto ya.'); return; }
  images=[null,null,null,null];
  files.forEach((fi,i)=>{
    const url=URL.createObjectURL(fi);
    const im=new Image();
    im.onload=()=>{
      images[i]=im; coverDrawTo(upCanvases[i], im); URL.revokeObjectURL(url);
      if(images.every(Boolean)) enable(btnConfirmUpload);
    };
    im.src=url;
  });
});
uploadGrid?.addEventListener('click', e=>{
  const c=e.target.closest('canvas.upslot'); if(!c) return;
  const i=Number(c.dataset.i);
  const pick=document.createElement('input'); pick.type='file'; pick.accept='image/*';
  pick.onchange=()=>{
    const f=pick.files[0]; if(!f) return;
    const url=URL.createObjectURL(f);
    const im=new Image();
    im.onload=()=>{ images[i]=im; coverDrawTo(upCanvases[i], im); URL.revokeObjectURL(url); if(images.every(Boolean)) enable(btnConfirmUpload); };
    im.src=url;
  };
  pick.click();
});
btnClearUpload?.addEventListener('click', ()=>{
  images=[null,null,null,null]; resetPreviews(); disable(btnConfirmUpload);
});

// Pilih alur
btnCamFlow?.addEventListener('click', ()=>{
  ensureOverlay(); resetPreviews();
  hide(choiceRow); hide(uploadWrap); hide(resultWrap); show(boothWrap);
  startCam();
});
btnUploadFlow?.addEventListener('click', ()=>{
  ensureOverlay(); resetPreviews();
  hide(choiceRow); hide(boothWrap); hide(resultWrap); show(uploadWrap);
  stopCam();
});

function coverDrawTo(canvas,img){
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const iw=img.naturalWidth||img.width, ih=img.naturalHeight||img.height;
  const s=Math.max(W/iw,H/ih);
  const dw=iw*s, dh=ih*s, dx=(W-dw)/2, dy=(H-dh)/2;
  ctx.clearRect(0,0,W,H);
  ctx.drawImage(img,dx,dy,dw,dh);
}

function confirmProceed(){
  if(!images.every(Boolean)){ showToast('Lengkapi 4 fotonya dulu ya.'); return Promise.resolve(false); }
  if(typeof confirmDlg?.showModal==='function'){
    return new Promise(res=>{
      function once(){ confirmDlg.removeEventListener('close',once); res(confirmDlg.returnValue==='ok'); }
      confirmDlg.addEventListener('close',once); confirmDlg.showModal();
    });
  }
  return Promise.resolve(confirm('Sudah yakin dengan fotonya?'));
}
function composeStrip(){
  if(!overlayReady){ showToast('Template belum siap.'); return; }
  fctx.clearRect(0,0,frameCanvas.width,frameCanvas.height);
  CONFIG.frameRects.forEach((prc,i)=>{
    const [x,y,w,h]=rectPx(prc);
    const img=images[i]; if(!img) return;
    const iw=img.naturalWidth, ih=img.naturalHeight;
    const s=Math.max(w/iw,h/ih);
    const dw=iw*s, dh=ih*s;
    const dx=x+(w-dw)/2, dy=y+(h-dh)/2;
    fctx.drawImage(img,dx,dy,dw,dh);
  });
  fctx.drawImage(overlayImg,0,0,frameCanvas.width,frameCanvas.height);
  hide(boothWrap); hide(uploadWrap); show(resultWrap);
  btnDownload.href=frameCanvas.toDataURL('image/png');
  btnDownload.style.opacity='1'; btnDownload.style.pointerEvents='auto';
  stopCam();
}
btnConfirmCam?.addEventListener('click', async ()=>{ if(await confirmProceed()) composeStrip(); });
btnConfirmUpload?.addEventListener('click', async ()=>{ if(await confirmProceed()) composeStrip(); });
btnBackChoose?.addEventListener('click', toChoice);

// Self test
console.log('[BirthdayWeb] init ok:', !!frameCanvas);

// Gate
const GKEY='bd-gate-ok-v4';
const PASS='290824';
function showGate(){ $('#gate').style.display='flex'; }
function hideGate(){ $('#gate').style.display='none'; }
function normalize(inp){
  const d=(inp||'').replace(/\D/g,'');
  if(d.length===8) return d.slice(0,2)+d.slice(2,4)+d.slice(6,8);
  return d;
}
if(localStorage.getItem(GKEY)!=='yes') showGate();
function tryEnter(){
  const v=normalize($('#gateInput').value);
  if(v===PASS){ localStorage.setItem(GKEY,'yes'); hideGate(); }
  else showToast('Masih salah, coba lagi ya 😛');
}
$('#gateBtn')?.addEventListener('click', tryEnter);
$('#gateInput')?.addEventListener('keydown', e=>{ if(e.key==='Enter') tryEnter(); });