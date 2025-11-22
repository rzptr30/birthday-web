// ===== CONFIG (overlaySrc kembali ke Template-Foto.png) =====
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
    { src:"assets/gallery/6.jpg", caption:"Selfie buru-buru sebelum pulang—mataku masih berbinar karena kamu." }
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
    [ 6,  6.5, 88, 24 ],
    [ 6, 37.5, 88, 24 ],
    [ 6, 68.5, 88, 24 ]
  ]
};

// ===== UTIL =====
const pad = n => String(n).padStart(2,'0');
const $   = q => document.querySelector(q);
const el  = (tag,attrs={}) => { const x=document.createElement(tag); Object.assign(x,attrs); return x; };
function showToast(msg){ ensureToast(); toastMsg.textContent = msg; toast.style.opacity='1'; toast.style.pointerEvents='auto'; }
function hideToast(){ if(!toast) return; toast.style.opacity='0'; toast.style.pointerEvents='none'; }

let toast, toastMsg, toastClose;
function ensureToast(){
  if (toast) return;
  toast = el('div'); toast.id='toast';
  Object.assign(toast.style,{
    position:'fixed', inset:'0', display:'grid', placeItems:'center',
    background:'rgba(0,0,0,.4)', backdropFilter:'blur(3px)',
    opacity:'0', pointerEvents:'none', transition:'opacity .2s', zIndex:'99999'
  });
  const box = el('div');
  Object.assign(box.style,{
    width:'min(92vw,380px)', background:'#151a2b', border:'1px solid #334155',
    borderRadius:'18px', boxShadow:'0 20px 50px -12px rgba(0,0,0,.6)',
    padding:'18px', color:'#e2e8f0', fontSize:'14px'
  });
  toastMsg = el('div',{textContent:'Info'});
  toastClose = el('button',{textContent:'Tutup'});
  Object.assign(toastClose.style,{
    marginTop:'12px', background:'#334155', color:'#e2e8f0', border:'none',
    padding:'8px 14px', borderRadius:'10px', cursor:'pointer', fontWeight:'600'
  });
  toastClose.onclick = hideToast;
  box.appendChild(toastMsg); box.appendChild(toastClose);
  toast.appendChild(box); document.body.appendChild(toast);
}

// ===== HEADER + TIMERS =====
const nameEl = $("#name"), dateLbl = $("#dateLbl"), dateText = $("#dateText"), loveNote = $("#loveNote");
if (nameEl){
  nameEl.textContent = CONFIG.herName;
  loveNote.textContent = CONFIG.loveNote;
  const birthDate = new Date(CONFIG.birthday);
  const firstMet = new Date(CONFIG.firstMet);
  const datingStart = new Date(CONFIG.datingStart);
  const thisYear = new Date().getFullYear();
  const birthdayThisYear = new Date(thisYear,11,31,0,0,0);
  const label = birthdayThisYear.toLocaleDateString('id-ID',{weekday:'long', day:'2-digit', month:'long', year:'numeric'});
  dateLbl.textContent = label; dateText.textContent = label;
  $("#age").textContent = thisYear - birthDate.getFullYear();

  const lifeTimer=$("#lifeTimer"), ageYMD=$("#ageYMD"),
        datingTimer=$("#datingTimer"), metTimer=$("#metTimer");

  function diffYMD(from,to){
    let y=to.getFullYear()-from.getFullYear();
    let m=to.getMonth()-from.getMonth();
    let d=to.getDate()-from.getDate();
    if(d<0){ const prev=new Date(to.getFullYear(),to.getMonth(),0); d+=prev.getDate(); m--; }
    if(m<0){ m+=12; y--; }
    return {y,m,d};
  }
  function renderTimers(){
    const now = new Date();
    const lifeMs = now - birthDate;
    const d = Math.floor(lifeMs/86400000);
    const h = Math.floor((lifeMs%86400000)/3600000);
    const mi= Math.floor((lifeMs%3600000)/60000);
    const s = Math.floor((lifeMs%60000)/1000);
    lifeTimer.innerHTML = `<div class="dd"><b>${pad(d)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(h)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(mi)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(s)}</b><span>Detik</span></div>`;
    const {y,m,d:dd}=diffYMD(birthDate,now);
    ageYMD.innerHTML = `<div class="dd"><b>${pad(y)}</b><span>Tahun</span></div>
      <div class="dd"><b>${pad(m)}</b><span>Bulan</span></div>
      <div class="dd"><b>${pad(dd)}</b><span>Hari</span></div>`;
    const datingMs = now - datingStart;
    const dtD=Math.floor(datingMs/86400000);
    const dtH=Math.floor((datingMs%86400000)/3600000);
    const dtM=Math.floor((datingMs%3600000)/60000);
    const dtS=Math.floor((datingMs%60000)/1000);
    datingTimer.innerHTML=`<div class="dd"><b>${pad(dtD)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(dtH)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(dtM)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(dtS)}</b><span>Detik</span></div>`;
    const metMs = now - firstMet;
    const mtD=Math.floor(metMs/86400000);
    const mtH=Math.floor((metMs%86400000)/3600000);
    const mtM=Math.floor((metMs%3600000)/60000);
    const mtS=Math.floor((metMs%60000)/1000);
    metTimer.innerHTML=`<div class="dd"><b>${pad(mtD)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(mtH)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(mtM)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(mtS)}</b><span>Detik</span></div>`;
  }
  renderTimers(); setInterval(renderTimers,1000);
}

// ===== GALERI =====
const galStories=$("#galStories");
if (galStories){
  CONFIG.galleryInfo.slice(0,8).forEach(g=>{
    const fig=el('figure',{className:'story'});
    const img=el('img',{src:g.src,alt:'kenangan',loading:'lazy',decoding:'async'});
    const cap=el('figcaption',{textContent:g.caption});
    fig.appendChild(img); fig.appendChild(cap); galStories.appendChild(fig);
  });
}

// ===== MUSIC =====
const audio=$("#bgm"), btnPlay=$("#btnPlay");
if(btnPlay && audio){
  let started=false, playing=false;
  btnPlay.addEventListener('click',async()=>{
    try{
      if(!started){ audio.currentTime = CONFIG.bgmStartSeconds||0; started=true; }
      if(!playing){ await audio.play(); btnPlay.textContent='⏸️ Hentikan Musik'; }
      else { audio.pause(); btnPlay.textContent='▶️ Putar Musik'; }
      playing=!playing;
    }catch{ showToast('Autoplay diblokir, ketuk lagi.'); }
  });
}

// ===== UCAPAN POPUP =====
const wishDlg=$("#wishDlg"), btnOpenWish=$("#btnOpenWish"), btnCloseWish=$("#btnCloseWish"), wishText=$("#wishText");
if(wishDlg && btnOpenWish && btnCloseWish && wishText){
  wishText.textContent=CONFIG.birthdayWish;
  btnOpenWish.onclick=()=>{ wishDlg.showModal?.(); petalsRain(); };
  btnCloseWish.onclick=()=>wishDlg.close?.();
  wishDlg.addEventListener('click',e=>{ if(e.target===wishDlg) wishDlg.close?.(); });
}

// ===== HEARTS / PETALS =====
const hv=document.getElementById('hearts'), hx=hv.getContext('2d');
const DPR=Math.min(window.devicePixelRatio||1,1.25);
function resizeHearts(){
  hv.width=Math.floor(innerWidth*DPR); hv.height=Math.floor(innerHeight*DPR);
  hv.style.width=innerWidth+'px'; hv.style.height=innerHeight+'px';
  hx.setTransform(DPR,0,0,DPR,0,0);
}
resizeHearts(); addEventListener('resize',resizeHearts);
let petals=[], petalsId=null;
function drawPetal(x,y,s,r){
  hx.save(); hx.translate(x,y); hx.rotate(r); hx.scale(s/20,s/20);
  hx.beginPath(); hx.moveTo(0,0); hx.bezierCurveTo(6,-6,14,-6,16,0); hx.bezierCurveTo(14,6,6,6,0,0);
  hx.closePath(); hx.fillStyle=['#f9a8d4','#fecaca','#fce7f3'][Math.floor(Math.random()*3)];
  hx.globalAlpha=0.9; hx.fill(); hx.restore();
}
function petalsRain(){
  const W=hv.width/DPR;
  for(let i=0;i<45;i++){
    petals.push({x:Math.random()*W,y:-12,s:10+Math.random()*16,vY:.8+Math.random()*1.5,vX:(Math.random()-.5)*.8,r:Math.random()*Math.PI,a:1});
  }
  if(!petalsId) petalsLoop();
}
function petalsLoop(){
  const W=hv.width/DPR,H=hv.height/DPR;
  hx.clearRect(0,0,W,H);
  petals.forEach(p=>{ p.y+=p.vY; p.x+=p.vX; p.r+=.02; p.a-=.004; drawPetal(p.x,p.y,p.s,p.r); });
  petals=petals.filter(p=>p.a>0 && p.y<H+30);
  if(petals.length) petalsId=requestAnimationFrame(petalsLoop); else { cancelAnimationFrame(petalsId); petalsId=null; }
}

// ===== PHOTO BOOTH (3 SLOT) =====
const OVERLAY_SRC=CONFIG.overlaySrc, FRAME_PCTS=CONFIG.frameRects;
const frameCanvas=$("#frameCanvas"), fctx=frameCanvas.getContext('2d');
const resultWrap=$("#resultWrap"), btnDownload=$("#btnDownload"), btnBackChoose=$("#btnBackChoose");
const choiceRow=$("#choiceRow"), btnCamFlow=$("#btnCamFlow"), btnUploadFlow=$("#btnUploadFlow");
const boothWrap=$("#boothWrap"), cam=$("#cam"), camTimer=$("#camTimer");
const btnStartCam=$("#btnStartCam"), btnFlip=$("#btnFlip"), btnAutoShot=$("#btnAutoShot"),
      btnReset=$("#btnReset"), btnConfirmCam=$("#btnConfirmCam");
const slotGrid=$("#slotGrid");
const slotCanvases = slotGrid ? Array.from(slotGrid.querySelectorAll('canvas.slot')) : [];
const uploadWrap=$("#uploadWrap"), files3=$("#files3"), btnClearUpload=$("#btnClearUpload"),
      btnConfirmUpload=$("#btnConfirmUpload"), uploadGrid=$("#uploadGrid");
const upCanvases = uploadGrid ? Array.from(uploadGrid.querySelectorAll('canvas.upslot')) : [];
const confirmDlg=$("#confirmDlg"), confirmMsg=$("#confirmMsg");
const retakeDlg=$("#retakeDlg"), retakeMsg=$("#retakeMsg");
const shutterSound=$("#shutterSound");

let overlayImg=null, overlayReady=false;
let images=[null,null,null];
let stream=null;
let facing='user';
let cameraStartTime=0;
let timerInterval=null;
let captureInProgress=false;

function show(el){ el?.classList.remove('hidden'); el?.setAttribute('aria-hidden','false'); }
function hide(el){ el?.classList.add('hidden'); el?.setAttribute('aria-hidden','true'); }
function enable(...els){ els.forEach(e=>e&&(e.disabled=false)); }
function disable(...els){ els.forEach(e=>e&&(e.disabled=true)); }

function drawPlaceholder(canvas,n){
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#0b1220'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle='#334155'; ctx.setLineDash([6,6]); ctx.strokeRect(6,6,canvas.width-12,canvas.height-12);
  ctx.setLineDash([]); ctx.fillStyle='#94a3b8'; ctx.font='700 20px Poppins,sans-serif';
  ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(String(n),canvas.width/2,canvas.height/2);
}
function resetPreviews(){
  slotCanvases.forEach((c,i)=>{ c.classList.remove('captured'); drawPlaceholder(c,i+1); });
  upCanvases.forEach((c,i)=>drawPlaceholder(c,i+1));
}
function coverDrawTo(canvas,img){
  const ctx=canvas.getContext('2d'); const W=canvas.width,H=canvas.height;
  const iw=img.naturalWidth||img.videoWidth||img.width;
  const ih=img.naturalHeight||img.videoHeight||img.height;
  const s=Math.max(W/iw,H/ih); const dw=iw*s, dh=ih*s;
  const dx=(W-dw)/2, dy=(H-dh)/2;
  ctx.clearRect(0,0,W,H); ctx.drawImage(img,dx,dy,dw,dh);
}
function ensureOverlay(){
  if(overlayImg) return;
  overlayImg=new Image();
  overlayImg.onload=()=>{ overlayReady=true; frameCanvas.width=overlayImg.naturalWidth; frameCanvas.height=overlayImg.naturalHeight; };
  overlayImg.src=OVERLAY_SRC;
}
function rectPx([x,y,w,h]){
  const cw=frameCanvas.width,ch=frameCanvas.height;
  return [Math.round(x*cw/100),Math.round(y*ch/100),Math.round(w*cw/100),Math.round(h*ch/100)];
}
function toChoice(){
  hide(boothWrap); hide(uploadWrap); hide(resultWrap); show(choiceRow);
  stopCam(); images=[null,null,null]; disable(btnConfirmCam,btnReset,btnFlip,btnAutoShot);
  resetPreviews(); btnDownload.style.opacity='.6'; btnDownload.style.pointerEvents='none'; btnDownload.removeAttribute('href');
}

// Kamera
async function startCam(){
  try{
    stopCam();
    stream = await navigator.mediaDevices.getUserMedia({
      video:{ facingMode:facing, width:{ideal:720}, height:{ideal:960} }, audio:false
    });
    cam.srcObject=stream;
    cameraStartTime=Date.now(); startTimerOverlay();
    enable(btnFlip,btnAutoShot,btnReset);
    showToast('Kamera aktif. Klik "Ambil 3 Foto ▶️" untuk mulai.');
  }catch(e){
    showToast('Tidak bisa membuka kamera. Izin atau HTTPS diperlukan.');
  }
}
function stopCam(){
  if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; }
  cam.srcObject=null; stopTimerOverlay();
}
function startTimerOverlay(){ updateCamTimer(); timerInterval=setInterval(updateCamTimer,1000); }
function stopTimerOverlay(){ clearInterval(timerInterval); timerInterval=null; camTimer.textContent='00:00'; }
function updateCamTimer(){
  const elapsed=Date.now()-cameraStartTime;
  const sec=Math.floor(elapsed/1000);
  camTimer.textContent=`${pad(Math.floor(sec/60))}:${pad(sec%60)}`;
}

// Auto Capture 3
async function autoCaptureSequence(){
  if(!stream || !cam.videoWidth){ showToast('Kamera belum aktif.'); return; }
  if(captureInProgress) return;
  captureInProgress=true;
  let idx=0;
  disable(btnAutoShot);
  const videoWrap=document.querySelector('.video-wrap');
  const doCapture=()=>{
    if(idx>=3){ captureInProgress=false; enable(btnConfirmCam); showToast('3 foto selesai. Klik gambar untuk retake atau Lanjutkan.'); return; }
    const off=document.createElement('canvas'); off.width=720; off.height=960;
    const ox=off.getContext('2d');
    const iw=cam.videoWidth, ih=cam.videoHeight;
    const s=Math.max(off.width/iw,off.height/ih);
    const dw=iw*s, dh=ih*s, dx=(off.width-dw)/2, dy=(off.height-dh)/2;
    ox.drawImage(cam,dx,dy,dw,dh);
    const im=new Image();
    im.onload=()=>{
      images[idx]=im;
      coverDrawTo(slotCanvases[idx],im);
      slotCanvases[idx].classList.add('captured');
      videoWrap.classList.add('flash-effect','shake-effect');
      setTimeout(()=>videoWrap.classList.remove('flash-effect','shake-effect'),260);
      try{ shutterSound.currentTime=0; shutterSound.play().catch(()=>{}); }catch{}
      idx++;
      setTimeout(doCapture,700);
    };
    im.src=off.toDataURL('image/png');
  };
  doCapture();
}

// Retake lewat klik slot
slotGrid?.addEventListener('click',e=>{
  const c=e.target.closest('canvas.slot'); if(!c) return;
  const i=Number(c.dataset.i);
  if(!images[i]){ showToast('Belum ada foto di slot ini.'); return; }
  retakeMsg.textContent=`Retake foto slot ${i+1}?`;
  retakeDlg.showModal();
  retakeDlg.addEventListener('close',function handler(){
    retakeDlg.removeEventListener('close',handler);
    if(retakeDlg.returnValue==='do'){
      if(!stream || !cam.videoWidth){ showToast('Kamera tidak aktif. Nyalakan kamera dulu.'); return; }
      const off=document.createElement('canvas'); off.width=720; off.height=960;
      const ox=off.getContext('2d');
      const iw=cam.videoWidth, ih=cam.videoHeight;
      const s=Math.max(off.width/iw,off.height/ih);
      const dw=iw*s, dh=ih*s, dx=(off.width-dw)/2, dy=(off.height-dh)/2;
      ox.drawImage(cam,dx,dy,dw,dh);
      const im=new Image();
      im.onload=()=>{
        images[i]=im; coverDrawTo(c,im);
        showToast(`Foto slot ${i+1} diperbarui.`);
      };
      im.src=off.toDataURL('image/png');
      const videoWrap=document.querySelector('.video-wrap');
      videoWrap.classList.add('flash-effect','shake-effect');
      setTimeout(()=>videoWrap.classList.remove('flash-effect','shake-effect'),260);
      try{ shutterSound.currentTime=0; shutterSound.play().catch(()=>{}); }catch{}
    }
  });
});

// Upload 3
files3?.addEventListener('change',()=>{
  const files=Array.from(files3.files||[]);
  if(files.length!==3){ showToast('Pilih tepat 3 foto.'); return; }
  images=[null,null,null];
  files.forEach((fi,i)=>{
    const url=URL.createObjectURL(fi);
    const im=new Image();
    im.onload=()=>{
      images[i]=im; coverDrawTo(upCanvases[i],im); URL.revokeObjectURL(url);
      if(images.every(Boolean)) enable(btnConfirmUpload);
    };
    im.src=url;
  });
});
uploadGrid?.addEventListener('click',e=>{
  const c=e.target.closest('canvas.upslot'); if(!c) return;
  const i=Number(c.dataset.i);
  const pick=document.createElement('input'); pick.type='file'; pick.accept='image/*';
  pick.onchange=()=>{
    const f=pick.files[0]; if(!f) return;
    const url=URL.createObjectURL(f);
    const im=new Image();
    im.onload=()=>{ images[i]=im; coverDrawTo(c,im); URL.revokeObjectURL(url); if(images.every(Boolean)) enable(btnConfirmUpload); };
    im.src=url;
  };
  pick.click();
});
btnClearUpload?.addEventListener('click',()=>{
  images=[null,null,null]; resetPreviews(); disable(btnConfirmUpload);
});

// Balik kamera
btnFlip?.addEventListener('click',()=>{
  facing = (facing==='user'?'environment':'user');
  startCam();
});

// Tombol alur
btnCamFlow?.addEventListener('click',()=>{
  ensureOverlay(); resetPreviews();
  hide(choiceRow); hide(uploadWrap); hide(resultWrap); show(boothWrap);
  startCam();
});
btnUploadFlow?.addEventListener('click',()=>{
  ensureOverlay(); resetPreviews();
  hide(choiceRow); hide(boothWrap); hide(resultWrap); show(uploadWrap);
  stopCam();
});

// Capture sequence
btnAutoShot?.addEventListener('click',autoCaptureSequence);

// Reset dengan konfirmasi
btnReset?.addEventListener('click',()=>{
  askConfirm('Reset semua foto yang sudah diambil?',()=>{
    images=[null,null,null]; resetPreviews(); disable(btnConfirmCam); enable(btnAutoShot); showToast('Sudah direset.');
  });
});

// Lanjutkan (komposisi)
btnConfirmCam?.addEventListener('click',()=>{
  if(!images.every(Boolean)){ showToast('Belum ada 3 foto lengkap.'); return; }
  askConfirm('Sudah yakin dengan 3 foto ini?',composeStrip);
});

// Konfirmasi upload flow
btnConfirmUpload?.addEventListener('click',()=>{
  if(!images.every(Boolean)){ showToast('Lengkapi 3 foto dulu.'); return; }
  askConfirm('Gunakan 3 foto ini untuk template?',composeStrip);
});

// Kembali
btnBackChoose?.addEventListener('click',toChoice);

// Dialog konfirmasi generik
function askConfirm(message, onOk){
  confirmMsg.textContent=message;
  confirmDlg.showModal();
  confirmDlg.addEventListener('close',function handler(){
    confirmDlg.removeEventListener('close',handler);
    if(confirmDlg.returnValue==='ok') onOk && onOk();
  });
}

// Komposisi strip 3-up
function composeStrip(){
  if(!overlayReady){ showToast('Overlay belum siap.'); return; }
  fctx.clearRect(0,0,frameCanvas.width,frameCanvas.height);
  FRAME_PCTS.forEach((r,i)=>{
    const [x,y,w,h]=rectPx(r), img=images[i]; if(!img) return;
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

// ===== SHORTCUT BUTTON =====
$("#btnBooth")?.addEventListener('click',()=>$("#frame")?.scrollIntoView({behavior:'smooth'}));

// ===== SELF TEST =====
console.log('[BirthdayWeb] camera 3-up ready with Template-Foto.png');

// ===== GATE =====
const GKEY='bd-gate-ok-v4', PASS='290824';
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
$('#gateBtn')?.addEventListener('click',tryEnter);
$('#gateInput')?.addEventListener('keydown',e=>{ if(e.key==='Enter') tryEnter(); });