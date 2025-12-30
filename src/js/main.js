// ===== CONFIG =====
const CONFIG = {
  herName: "Adellia",
  birthday: "2004-12-31T00:00:00+07:00",
  firstMet: "2024-03-12T00:00:00+07:00",
  datingStart: "2024-08-29T00:00:00+07:00",
  galleryInfo: [
    { src:"assets/gallery/1.jpg", caption:"Saat pertama kali kita duduk bareng buat buka bersama dan masih sangat canggung wkwkwk." },
    { src:"assets/gallery/2.jpeg", caption:"Setelah sempat asing, kita ketemu lagi. Aku sengaja cari momen lewat acara kampus—cuma biar bisa lihat kamu dan mulai ngobrol lagi." },
    { src:"assets/gallery/3.jpeg", caption:"NAHHH FOTO INIIII ADALAH FOTO PERTAMA KITA SETELAH OFFICIAL YUHUUUU" },
    { src:"assets/gallery/4.jpg", caption:"Foto ini sebenarnya bikin sedih—coba tebak kenapa. Tapi justru dari momen ini, kisah kita perlahan menemukan jalannya sampai bisa seperti sekarang." },
    { src:"assets/gallery/5.jpeg", caption:"Coba tebak, ini momen apa hayoooo? Cluenya: nggak ramai, nggak spesial di luar… tapiiiiii penting."},
    { src:"assets/gallery/6.jpg", caption:"DANNN INIIIIII, Pengalaman yang sangat terkesan karena kita akhirnya keluar kota bareng, jalan jalan jauh, meskipun ada beberapa kejadian tapi itu yang buat seru" }
  ],
  loveNote: "Terima kasih yaa sudah selalu sabar dan bikin aku merasa cukup.",
  birthdayWish: `hai hai haiiiii, HBD SAYANGGGGGG 🎉🎉🎉🎉🎉🎉YUHUUUU, SUDAH 21 TAHUN NIH YAAAA, Selamat ulang tahun yaaa jadiii aku mau ngomong apa ya iniii, doa baik yaaa yang pastinyaaaa, semoga di umur yang sekarang ini kamu bisa jadi lebih baik lagi walaupun skrg udah baik jadi nambah lagiiii, semoga apa yang kamu harapkan bisa tercapai, walaupun mungkin ga semua tapi pasti ada hikmah dari tiap hal tersebut, oiya habis ini magang yaaa, semoga magang nya lancarrrr, lingkungan di tempat nya baikkkk, pokoknya lancar deh buat magang nyaaaa, terusss semoga di tahun ini kamu lancar juga kuliahnya, dah mau skripsi nih yeeee, semoga lancar dan lulus tepat waktu atau lebih cepetttt, aku yakin semua usaha mu bakal berbuah manis nantinyaaaa, sehat sehat terus bub, bahagia terus jugaaa yaaaaaa, MAKASIII YAAAA BUBBBB buat selama iniii, makasi ga bosen ngingetin aku dan jangan pernah bosen sama aku jg yaaaa ehehehehehehe, jujur aku gatau ini mau isi apa lagi ya, karena aku kepikiran dengan sidangku besok heheheh, jadi ini dibuat di tgl 30 nya hehee, OIYAAAA sorryyy bgttt kalau tahun ini di ultah mu ga se spesial ituuuu karena ada kendala pada sesuatu hal lah itu lah, tapiii semoga tetep berkesan yaaa, mungkin ini ga seberapa tapi semoga kamu sukaaa, hehehehe mungkin itu aja deh yg disini yaaa,

LOVEE YOUUU MUCH MORE BUBBB❤️‍🔥🩷❤️‍🔥🩷❤️❤️‍🔥🩷❤️💖💗💓`,
  bgmStartSeconds: 60,
  overlaySrc: "assets/overlays/Template-Foto.png",

  // Slot template (persen) - sudah kamu set
  frameRects: [
    [ 5.7,  12.9, 88.52, 22.85 ],
    [ 5.7, 38.5, 88.52, 22.85 ],
    [ 5.7, 64.1, 88.52, 22.85 ],
  ],

  autoIntervalMs: 700,

  // Fokus crop Y: 0.50 = center, makin kecil = naik (lebih aman buat rambut/kening)
  focusY: 0.38
};

// ===== UTIL =====
const pad = n => String(n).padStart(2,'0');
const $   = q => document.querySelector(q);
const el  = (tag,attrs={}) => { const x=document.createElement(tag); Object.assign(x,attrs); return x; };

// Clamp helper
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// ===== Toast =====
let toast, toastMsg, toastClose;
function ensureToast(){
  if (toast) return;
  toast = el('div');
  Object.assign(toast.style,{
    position:'fixed',inset:'0',display:'grid',placeItems:'center',
    background:'rgba(0,0,0,.45)',backdropFilter:'blur(3px)',
    opacity:'0',pointerEvents:'none',transition:'opacity .2s',zIndex:'99999'
  });
  const box=el('div');
  Object.assign(box.style,{
    width:'min(92vw,380px)',background:'#151a2b',border:'1px solid #334155',
    borderRadius:'18px',padding:'18px',boxShadow:'0 20px 50px -12px rgba(0,0,0,.6)',color:'#e2e8f0'
  });
  toastMsg=el('div',{textContent:'Info'});
  toastClose=el('button',{textContent:'Tutup',type:'button'});
  Object.assign(toastClose.style,{
    marginTop:'12px',background:'#334155',color:'#e2e8f0',border:'none',padding:'8px 14px',
    borderRadius:'10px',cursor:'pointer',fontWeight:'600'
  });
  toastClose.onclick=hideToast;
  box.appendChild(toastMsg); box.appendChild(toastClose);
  toast.appendChild(box); document.body.appendChild(toast);
}
function showToast(msg){ ensureToast(); toastMsg.textContent=msg; toast.style.opacity='1'; toast.style.pointerEvents='auto'; }
function hideToast(){ if(!toast) return; toast.style.opacity='0'; toast.style.pointerEvents='none'; }

// ===== Timers (header) =====
const nameEl=$("#name"), dateLbl=$("#dateLbl"), dateText=$("#dateText"), loveNote=$("#loveNote");
if(nameEl){
  nameEl.textContent=CONFIG.herName;
  loveNote.textContent=CONFIG.loveNote;
  const birthDate=new Date(CONFIG.birthday),
        firstMet=new Date(CONFIG.firstMet),
        datingStart=new Date(CONFIG.datingStart);
  const thisYear=new Date().getFullYear();
  const birthdayThisYear=new Date(thisYear,11,31,0,0,0);
  const label=birthdayThisYear.toLocaleDateString('id-ID',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
  dateLbl.textContent=label; dateText.textContent=label;
  $("#age").textContent=thisYear-birthDate.getFullYear();

  const lifeTimer=$("#lifeTimer"),
        datingTimer=$("#datingTimer"),
        metTimer=$("#metTimer");

  function diffYMD(from,to){
    let y=to.getFullYear()-from.getFullYear();
    let m=to.getMonth()-from.getMonth();
    let d=to.getDate()-from.getDate();
    if(d<0){ const prev=new Date(to.getFullYear(),to.getMonth(),0); d+=prev.getDate(); m--; }
    if(m<0){ m+=12; y--; }
    return {y,m,d};
  }

  function renderTimers(){
    const now=new Date();
    const lifeMs=now-birthDate;
    const d=Math.floor(lifeMs/86400000);
    const h=Math.floor((lifeMs%86400000)/3600000);
    const mi=Math.floor((lifeMs%3600000)/60000);
    const s=Math.floor((lifeMs%60000)/1000);

    if (lifeTimer){
      lifeTimer.innerHTML=`<div class="dd"><b>${pad(d)}</b><span>Hari</span></div>
        <div class="dd"><b>${pad(h)}</b><span>Jam</span></div>
        <div class="dd"><b>${pad(mi)}</b><span>Menit</span></div>
        <div class="dd"><b>${pad(s)}</b><span>Detik</span></div>`;
    }

    const { y, m, d: dd } = diffYMD(birthDate, now);
    const lifeTimerDays = document.getElementById('lifeTimerDays');
    const lifeTimerTime = document.getElementById('lifeTimerTime');
    if (lifeTimerDays){
      lifeTimerDays.innerHTML = `
        <div class="dd"><b>${pad(y)}</b><span>Tahun</span></div>
        <div class="dd"><b>${pad(m)}</b><span>Bulan</span></div>
        <div class="dd"><b>${pad(dd)}</b><span>Hari</span></div>
      `;
    }
    if (lifeTimerTime){
      lifeTimerTime.innerHTML = `
        <div class="dd"><b>${pad(h)}</b><span>Jam</span></div>
        <div class="dd"><b>${pad(mi)}</b><span>Menit</span></div>
        <div class="dd"><b>${pad(s)}</b><span>Detik</span></div>
      `;
    }

    const datingMs=now-datingStart;
    const dtD=Math.floor(datingMs/86400000),
          dtH=Math.floor((datingMs%86400000)/3600000),
          dtM=Math.floor((datingMs%3600000)/60000),
          dtS=Math.floor((datingMs%60000)/1000);
    if (datingTimer){
      datingTimer.innerHTML=`<div class="dd"><b>${pad(dtD)}</b><span>Hari</span></div>
        <div class="dd"><b>${pad(dtH)}</b><span>Jam</span></div>
        <div class="dd"><b>${pad(dtM)}</b><span>Menit</span></div>
        <div class="dd"><b>${pad(dtS)}</b><span>Detik</span></div>`;
    }

    const metMs=now-firstMet;
    const mtD=Math.floor(metMs/86400000),
          mtH=Math.floor((metMs%86400000)/3600000),
          mtM=Math.floor((metMs%3600000)/60000),
          mtS=Math.floor((metMs%60000)/1000);
    if (metTimer){
      metTimer.innerHTML=`<div class="dd"><b>${pad(mtD)}</b><span>Hari</span></div>
        <div class="dd"><b>${pad(mtH)}</b><span>Jam</span></div>
        <div class="dd"><b>${pad(mtM)}</b><span>Menit</span></div>
        <div class="dd"><b>${pad(mtS)}</b><span>Detik</span></div>`;
    }
  }

  renderTimers();
  setInterval(renderTimers,1000);
}

// ===== Galeri =====
const galStories=$("#galStories");
if(galStories){
  CONFIG.galleryInfo.slice(0,8).forEach(g=>{
    const fig=el('figure',{className:'story'});
    const img=el('img',{src:g.src,alt:'kenangan',loading:'lazy',decoding:'async'});
    const cap=el('figcaption',{textContent:g.caption});
    fig.appendChild(img); fig.appendChild(cap); galStories.appendChild(fig);
  });
}

// ===== Musik =====
const audio=$("#bgm"), btnPlay=$("#btnPlay");
if(btnPlay && audio){
  let started=false, playing=false;
  btnPlay.addEventListener('click',async()=>{
    try{
      if(!started){ audio.currentTime=CONFIG.bgmStartSeconds||0; started=true; }
      if(!playing){ await audio.play(); btnPlay.textContent='⏸️ Hentikan Musik'; }
      else { audio.pause(); btnPlay.textContent='▶️ Putar Musik'; }
      playing=!playing;
    }catch{ showToast('Autoplay diblokir, ketuk lagi.'); }
  });
}

// ===== Ucapan Popup =====
const wishDlg=$("#wishDlg"), btnOpenWish=$("#btnOpenWish"), btnCloseWish=$("#btnCloseWish"), wishText=$("#wishText");
if(wishDlg && btnOpenWish && btnCloseWish && wishText){
  wishText.textContent=CONFIG.birthdayWish;
  btnOpenWish.onclick=()=>{ wishDlg.showModal?.(); petalsRain(); };
  btnCloseWish.onclick=()=>wishDlg.close?.();
  wishDlg.addEventListener('click',e=>{ if(e.target===wishDlg) wishDlg.close?.(); });
}

// ===== Petals =====
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
  hx.globalAlpha=.9; hx.fill(); hx.restore();
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
  if(petals.length) petalsId=requestAnimationFrame(petalsLoop);
  else { cancelAnimationFrame(petalsId); petalsId=null; }
}

// ===== Photo Booth 3-slot =====
const OVERLAY_SRC=CONFIG.overlaySrc, FRAME_PCTS=CONFIG.frameRects;
const frameCanvas=$("#frameCanvas"), fctx=frameCanvas.getContext('2d');
const resultWrap=$("#resultWrap"), btnDownload=$("#btnDownload"), btnBackChoose=$("#btnBackChoose");
const choiceRow=$("#choiceRow"), btnCamFlow=$("#btnCamFlow"), btnUploadFlow=$("#btnUploadFlow");

const boothWrap=$("#boothWrap"),
      cam=$("#cam"),
      camPreview=$("#camPreview"),
      pctx=camPreview ? camPreview.getContext('2d') : null,
      videoWrap=$("#videoWrap"),
      countOverlay=$("#countOverlay");

const btnStartCam=$("#btnStartCam");
const btnFlip=$("#btnFlip"), btnMirror=$("#btnMirror"), btnAutoShot=$("#btnAutoShot"),
      btnReset=$("#btnReset"), btnConfirmCam=$("#btnConfirmCam"), captureDelay=$("#captureDelay");

const slotGrid=$("#slotGrid");
const slotCanvases= slotGrid? Array.from(slotGrid.querySelectorAll('canvas.slot')) : [];

const uploadWrap=$("#uploadWrap"), files3=$("#files3"), btnClearUpload=$("#btnClearUpload"),
      btnConfirmUpload=$("#btnConfirmUpload"), uploadGrid=$("#uploadGrid");

// FIX: di HTML kamu, canvas upload pakai class="slot" juga, bukan "upslot"
const upCanvases= uploadGrid? Array.from(uploadGrid.querySelectorAll('canvas.slot')) : [];

const confirmDlg=$("#confirmDlg"), confirmMsg=$("#confirmMsg");
const retakeDlg=$("#retakeDlg"), retakeMsg=$("#retakeMsg");
const shutterSound=$("#shutterSound");

let overlayImg=null, overlayReady=false;
let images=[null,null,null];
let stream=null;
let facing='user';
let mirrored=false;
let captureInProgress=false;

// ===== Live preview control (crop sama dengan overlay) =====
let previewRAF = null;

// FIX: simpan rasio slot agar bisa dipakai untuk guide (tanpa error)
let slotRatio = null;

function drawCropGuide(ctx, W, H, ratio){
  if(!ratio) return;

  let gw = W;
  let gh = Math.round(gw / ratio);

  if (gh > H){
    gh = H;
    gw = Math.round(gh * ratio);
  }

  const gx = Math.round((W - gw) / 2);
  const gy = Math.round((H - gh) / 2);

  ctx.save();

  // Gelapkan area luar, tapi BIARKAN area dalam tetap menampilkan frame video
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  ctx.rect(gx, gy, gw, gh);
  ctx.fill("evenodd"); // ini kunci: bikin "hole" tanpa menghapus video

  // Border guide
  ctx.strokeStyle = "rgba(255,255,255,0.70)";
  ctx.lineWidth = 2;
  ctx.strokeRect(gx + 1, gy + 1, gw - 2, gh - 2);

  ctx.restore();
}


function startLivePreview(){
  if(!camPreview || !pctx) return;

  // NOTE: ukuran internal preview akan diset oleh applyOverlayRatioToPreview() jika overlay sudah ready.
  // Kalau belum, pakai fallback aman.
  if(!camPreview.width || !camPreview.height){
    camPreview.width = 1062;
    camPreview.height = 487;
  }

  const loop = () => {
    if(!stream || !cam.videoWidth){
      previewRAF = requestAnimationFrame(loop);
      return;
    }

    const W = camPreview.width;
    const H = camPreview.height;

    const iw = cam.videoWidth;
    const ih = cam.videoHeight;

    // cover (biar memenuhi canvas)
    const s = Math.max(W / iw, H / ih);
    const dw = iw * s;
    const dh = ih * s;

    const fx = 0.5;
    const fy = clamp(CONFIG.focusY ?? 0.38, 0, 1);

    const dx = (W - dw) * fx;
    const dy = (H - dh) * fy;

    pctx.clearRect(0,0,W,H);

    if(mirrored){
      pctx.save();
      pctx.translate(W,0);
      pctx.scale(-1,1);
      pctx.drawImage(cam, dx, dy, dw, dh);
      pctx.restore();
    } else {
      pctx.drawImage(cam, dx, dy, dw, dh);
    }

    // FIX: tampilkan crop guide (tanpa mempengaruhi capture)
    if(slotRatio) drawCropGuide(pctx, W, H, slotRatio);

    previewRAF = requestAnimationFrame(loop);
  };

  if(previewRAF) cancelAnimationFrame(previewRAF);
  previewRAF = requestAnimationFrame(loop);
}

function stopLivePreview(){
  if(previewRAF){
    cancelAnimationFrame(previewRAF);
    previewRAF = null;
  }
  if(camPreview && pctx){
    pctx.clearRect(0,0,camPreview.width,camPreview.height);
  }
}

// Helpers UI
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

/**
 * Gambar dengan cover + fokus Y (lebih ke atas)
 */
function coverDrawTo(canvas, img){
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const iw = img.naturalWidth || img.videoWidth || img.width;
  const ih = img.naturalHeight || img.videoHeight || img.height;

  const s = Math.max(W / iw, H / ih);
  const dw = iw * s;
  const dh = ih * s;

  const fx = 0.5;
  const fy = clamp(CONFIG.focusY ?? 0.38, 0, 1);

  const dx = (W - dw) * fx;
  const dy = (H - dh) * fy;

  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(img, dx, dy, dw, dh);
}

function applyOverlayRatioToPreview(){
  // pastikan overlay sudah set ukuran frameCanvas
  const W = frameCanvas.width  || 1200;
  const H = frameCanvas.height || 2133;

  const wPct = FRAME_PCTS[0][2];
  const hPct = FRAME_PCTS[0][3];

  // rasio slot (pixel)
  const ratio = (wPct * W) / (hPct * H);
  slotRatio = ratio;
  document.documentElement.style.setProperty('--slot-aspect', `${ratio} / 1`);


  // 1) preview container ikut ratio slot
  if (videoWrap) videoWrap.style.aspectRatio = `${ratio} / 1`;

  // 2) camPreview internal size ikut ratio slot
  if (camPreview){
    const targetW = 1200;
    camPreview.width  = targetW;
    camPreview.height = Math.round(targetW / ratio);
  }

  // 3) SEMUA slot canvas (kamera & upload) ikut ratio slot
  const allSlots = [...slotCanvases, ...upCanvases];
  allSlots.forEach(c=>{
    c.style.aspectRatio = `${ratio} / 1`;        // tampilan
    const baseW = c.width || 320;                // internal
    c.height = Math.round(baseW / ratio);        // internal height harus sesuai ratio
  });

  // redraw placeholder supaya tidak ketarik
  resetPreviews();

  // kalau kamera sedang on, refresh preview loop
  if (stream) startLivePreview();
}



function ensureOverlay(){
  if(overlayImg) return;
  overlayImg=new Image();
  overlayImg.onload=()=>{
    overlayReady=true;
    frameCanvas.width=overlayImg.naturalWidth;
    frameCanvas.height=overlayImg.naturalHeight;
    applyOverlayRatioToPreview(); // tambah ini
  };
  overlayImg.src=OVERLAY_SRC;
}

// applyOverlayRatioToPreview

function rectPx([x,y,w,h]){
  const cw=frameCanvas.width,ch=frameCanvas.height;
  return [Math.round(x*cw/100),Math.round(y*ch/100),Math.round(w*cw/100),Math.round(h*cw/100)];
}

function toChoice(){
  hide(boothWrap); hide(uploadWrap); hide(resultWrap); show(choiceRow);
  stopCam(); images=[null,null,null];
  disable(btnConfirmCam,btnReset,btnFlip,btnMirror,btnAutoShot,captureDelay);
  resetPreviews();
  btnDownload.style.opacity='.6';
  btnDownload.style.pointerEvents='none';
  btnDownload.removeAttribute('href');
}

// Kamera
async function startCam(){
  try{
    stopCam();

    stream = await navigator.mediaDevices.getUserMedia({
      video:{
        facingMode: facing,
        width:  { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio:false
    });

    cam.srcObject=stream;
    await cam.play().catch(()=>{});

    enable(btnFlip,btnMirror,btnAutoShot,btnReset,captureDelay,btnConfirmCam);
    disable(btnConfirmCam); // tetap disable sampai 3 foto lengkap

    // LIVE PREVIEW mulai di sini (crop sama seperti overlay)
    startLivePreview();

    showToast('Kamera aktif. Pilih timer lalu klik Ambil 3 Foto ▶️');
  }catch(e){
    showToast('Tidak bisa membuka kamera. Pastikan izin & HTTPS.');
  }
}

function stopCam(){
  stopLivePreview();
  if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; }
  cam.srcObject=null;
}

// Countdown
function startCountdown(seconds, onDone){
  countOverlay.textContent='';
  countOverlay.style.opacity='1';
  let current=seconds;
  const tick=()=>{
    countOverlay.textContent=current;
    if(current<=0){
      countOverlay.textContent='';
      countOverlay.style.opacity='0';
      onDone();
    } else {
      current--;
      setTimeout(tick,1000);
    }
  };
  tick();
}

/**
 * Capture satu frame dengan rasio slot template (photobooth-like)
 * + fokus agak ke atas (CONFIG.focusY)
 */
function captureFrame(){
  if(!overlayReady){
    // fallback aman (kalau user capture terlalu cepat)
    const off=document.createElement('canvas'); off.width=720; off.height=960;
    const ox=off.getContext('2d');
    const iw=cam.videoWidth, ih=cam.videoHeight;
    const s=Math.max(off.width/iw,off.height/ih);
    const dw=iw*s, dh=ih*s;
    const fx=0.5;
    const fy=clamp(CONFIG.focusY ?? 0.38,0,1);
    const dx=(off.width - dw) * fx;
    const dy=(off.height - dh) * fy;
    if(mirrored){ ox.translate(off.width,0); ox.scale(-1,1); }
    ox.drawImage(cam,dx,dy,dw,dh);
    const im=new Image(); im.src=off.toDataURL('image/png'); return im;
  }

 // Ambil rasio slot dari frameRects (pixel ratio)
const W = frameCanvas.width;
const H = frameCanvas.height;
const wPct = FRAME_PCTS[0][2];
const hPct = FRAME_PCTS[0][3];
const targetRatio = (wPct * W) / (hPct * H);


  // Buat output landscape sesuai slot
  const outW = 1200;
  const outH = Math.round(outW / targetRatio);

  const off=document.createElement('canvas');
  off.width=outW; off.height=outH;
  const ox=off.getContext('2d');

  const iw=cam.videoWidth, ih=cam.videoHeight;
  const s=Math.max(off.width/iw,off.height/ih);
  const dw=iw*s, dh=ih*s;

  const fx = 0.5;
  const fy = clamp(CONFIG.focusY ?? 0.38, 0, 1);

  const dx=(off.width - dw) * fx;
  const dy=(off.height - dh) * fy;

  // FIX: mirroring harus diterapkan saat capture juga (biar konsisten)
  if(mirrored){
    ox.save();
    ox.translate(off.width,0);
    ox.scale(-1,1);
    ox.drawImage(cam, dx, dy, dw, dh);
    ox.restore();
  } else {
    ox.drawImage(cam, dx, dy, dw, dh);
  }

  const im=new Image();
  im.src=off.toDataURL('image/png');
  return im;
}

// Auto capture 3
function autoCaptureSequence(){
  if(!stream || !cam.videoWidth){ showToast('Kamera belum aktif.'); return; }
  if(captureInProgress) return;

  captureInProgress = true;
  disable(btnAutoShot, btnFlip, btnMirror, captureDelay, btnReset, btnConfirmCam);

  const delaySec = Number(captureDelay.value || 3);

  let idx = 0;

  const takeOne = () => {
    // jika sudah 3 foto
    if (idx >= 3){
      captureInProgress = false;
      enable(btnReset, btnFlip, btnMirror, captureDelay, btnAutoShot);
      // tombol lanjutkan boleh aktif kalau 3 foto lengkap
      if (images.every(Boolean)) enable(btnConfirmCam);
      showToast('3 foto selesai. Klik foto untuk retake atau Lanjutkan.');
      return;
    }

    // countdown PER FOTO
    startCountdown(delaySec, () => {
      const im = captureFrame();
      im.onload = () => {
        images[idx] = im;
        coverDrawTo(slotCanvases[idx], im);
        slotCanvases[idx].classList.add('captured');
        applyShotEffects();

        idx++;

        // jeda kecil antar foto (opsional, biar tidak terlalu mepet)
        setTimeout(takeOne, 250);
      };
    });
  };

  takeOne();
}


// Efek shot
function applyShotEffects(){
  videoWrap.classList.add('flash-effect','shake-effect');
  setTimeout(()=>videoWrap.classList.remove('flash-effect','shake-effect'),260);
  try{ shutterSound.currentTime=0; shutterSound.play().catch(()=>{}); }catch{}
}

// Retake
slotGrid?.addEventListener('click',e=>{
  const c=e.target.closest('canvas.slot'); if(!c) return;
  const i=Number(c.dataset.i);
  if(!images[i]){ showToast('Slot ini belum ada foto.'); return; }

  retakeMsg.textContent=`Retake foto slot ${i+1}?`;
  retakeDlg.showModal();

  retakeDlg.addEventListener('close',function handler(){
    retakeDlg.removeEventListener('close',handler);
    if(retakeDlg.returnValue==='do'){
      if(!stream || !cam.videoWidth){ showToast('Kamera tidak aktif.'); return; }
      const delaySec=Number(captureDelay.value||3);
      startCountdown(delaySec, ()=>{
        const im=captureFrame();
        im.onload=()=>{
          images[i]=im;
          coverDrawTo(c,im);
          applyShotEffects();
          showToast(`Foto slot ${i+1} diperbarui.`);
        };
      });
    }
  });
});

// Upload 3
files3?.addEventListener('change',()=>{
  const files=Array.from(files3.files||[]);
  if(files.length!==3){ showToast('Pilih tepat 3 foto.'); return; }
  images=[null,null,null];
  disable(btnConfirmUpload);

  files.forEach((fi,i)=>{
    const url=URL.createObjectURL(fi);
    const im=new Image();
    im.onload=()=>{
      images[i]=im;
      coverDrawTo(upCanvases[i],im);
      URL.revokeObjectURL(url);
      if(images.every(Boolean)) enable(btnConfirmUpload);
    };
    im.src=url;
  });
});

uploadGrid?.addEventListener('click',e=>{
  const c=e.target.closest('canvas.slot'); if(!c) return;
  const i=Number(c.dataset.i);

  const pick=document.createElement('input');
  pick.type='file';
  pick.accept='image/*';
  pick.onchange=()=>{
    const f=pick.files[0]; if(!f) return;
    const url=URL.createObjectURL(f);
    const im=new Image();
    im.onload=()=>{
      images[i]=im;
      coverDrawTo(c,im);
      URL.revokeObjectURL(url);
      if(images.every(Boolean)) enable(btnConfirmUpload);
    };
    im.src=url;
  };
  pick.click();
});

btnClearUpload?.addEventListener('click',()=>{
  images=[null,null,null];
  resetPreviews();
  disable(btnConfirmUpload);
});

// Flip facing
btnFlip?.addEventListener('click',()=>{
  facing=(facing==='user'?'environment':'user');
  startCam();
});

// Mirror
btnMirror?.addEventListener('click',()=>{
  mirrored=!mirrored;
  if(mirrored) videoWrap.classList.add('mirrored'); else videoWrap.classList.remove('mirrored');
  showToast(mirrored?'Mode mirror ON':'Mode mirror OFF');
});

// Alur tombol
btnCamFlow?.addEventListener('click',()=>{
  ensureOverlay();
  resetPreviews();
  hide(choiceRow); hide(uploadWrap); hide(resultWrap); show(boothWrap);
  // kamera dinyalakan ketika masuk flow ini (atau pakai tombol Nyalakan Kamera)
  startCam();
});

btnStartCam?.addEventListener('click', startCam);

btnUploadFlow?.addEventListener('click',()=>{
  ensureOverlay();
  resetPreviews();
  hide(choiceRow); hide(boothWrap); hide(resultWrap); show(uploadWrap);
  stopCam();
});

// Auto shot
btnAutoShot?.addEventListener('click',autoCaptureSequence);

// Reset
btnReset?.addEventListener('click',()=>{
  askConfirm('Reset semua foto yang sudah diambil?',()=>{
    images=[null,null,null];
    resetPreviews();
    disable(btnConfirmCam);
    enable(btnAutoShot);
    showToast('Sudah direset.');
  });
});

// Lanjutkan (kamera)
btnConfirmCam?.addEventListener('click',()=>{
  if(!images.every(Boolean)){ showToast('Belum 3 foto lengkap.'); return; }
  askConfirm('Sudah yakin dengan 3 foto ini?',composeStrip);
});

// Konfirmasi upload
btnConfirmUpload?.addEventListener('click',()=>{
  if(!images.every(Boolean)){ showToast('Lengkapi 3 foto dulu.'); return; }
  askConfirm('Gunakan 3 foto ini untuk template?',composeStrip);
});

// Kembali
btnBackChoose?.addEventListener('click',toChoice);

// Dialog konfirmasi generik
function askConfirm(message,onOk){
  confirmMsg.textContent=message;
  confirmDlg.showModal();
  confirmDlg.addEventListener('close',function handler(){
    confirmDlg.removeEventListener('close',handler);
    if(confirmDlg.returnValue==='ok') onOk && onOk();
  });
}

/**
 * Komposisi ke template final:
 * - Pakai cover + fokusY agar konsisten dengan preview
 */
function composeStrip(){
  if(!overlayReady){ showToast('Overlay belum siap.'); return; }
  if(!images.every(Boolean)){ showToast('Lengkapi 3 foto dulu.'); return; }

  // isi background biar tidak hitam
  fctx.save();
  fctx.fillStyle = '#ffffff';
  fctx.fillRect(0,0,frameCanvas.width,frameCanvas.height);
  fctx.restore();

  const fx = 0.5;
  const fy = clamp(CONFIG.focusY ?? 0.38, 0, 1);

  FRAME_PCTS.forEach((r,i)=>{
    const [x,y,w,h]=rectPx(r);
    const img=images[i]; if(!img) return;

    const iw=img.naturalWidth, ih=img.naturalHeight;
    const s=Math.max(w/iw,h/ih);
    const dw=iw*s, dh=ih*s;

    const dx = x + (w - dw) * fx;
    const dy = y + (h - dh) * fy;

    fctx.drawImage(img, dx, dy, dw, dh);
  });

  fctx.drawImage(overlayImg,0,0,frameCanvas.width,frameCanvas.height);

  hide(boothWrap); hide(uploadWrap); show(resultWrap);
  btnDownload.href=frameCanvas.toDataURL('image/png');
  btnDownload.style.opacity='1';
  btnDownload.style.pointerEvents='auto';
  stopCam();
}


// Shortcut ke Photo Booth
$("#btnBooth")?.addEventListener('click',()=>$("#frame")?.scrollIntoView({behavior:'smooth'}));

// Self test
console.log('[BirthdayWeb] live preview crop matches overlay ✅');

// Gate
const GKEY = 'bd-gate-ok-v4';
const PASS = '290824';

function showGate(){ document.getElementById('gate').style.display='flex'; }
function hideGate(){ document.getElementById('gate').style.display='none'; }

function normalize(inp){
  const d=(inp||'').replace(/\D/g,'');
  if(d.length===8) return d.slice(0,2)+d.slice(2,4)+d.slice(6,8);
  return d;
}

// sessionStorage: setiap tab baru, harus input password lag
showGate();

function tryEnter(){
  const input = document.getElementById('gateInput');
  const v = normalize(input.value);

  if (v === PASS){
    hideGate();
    input.value = ''; // kosongkan setelah berhasil
  } else {
    showToast('Kok bisa salah sih!?, kamua ga sayang aku ya🫵🏻😡.');
    input.value = ''; // opsional: kosongkan juga saat salah
    input.focus();
  }
}


document.getElementById('gateBtn')?.addEventListener('click', tryEnter);
document.getElementById('gateInput')?.addEventListener('keydown', e => { if(e.key==='Enter') tryEnter(); });
