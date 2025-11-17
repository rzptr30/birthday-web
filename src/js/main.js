// ===== CONFIG =====
// Import setupCamera dari camera.js
import { setupCamera, switchCamera } from './camera.js';

const CONFIG = {
  herName: "Adellia",
  birthday: "2004-12-31T00:00:00+07:00",
  firstMet: "2024-03-12T00:00:00+07:00",
  datingStart: "2024-08-29T00:00:00+07:00",
  gallery: [
    "assets/gallery/1.jpg","assets/gallery/2.jpg","assets/gallery/3.jpg",
    "assets/gallery/4.jpg","assets/gallery/5.jpg","assets/gallery/6.jpg"
  ],
  loveNote: "Terima kasih sudah selalu sabar dan bikin aku merasa cukup.",
  letters: [
    "Terima kasih sudah datang di hidupku sejak pertama kali kita kenal. Banyak hal berubah jadi lebih hangat.",
    "Sejak jadian, aku belajar kalau rumah itu bukan tempat—tapi orang. Dan kamu rumahku.",
    "Mari terus jaga satu sama lain, tumbuh bareng, dan ketawa untuk hal-hal receh setiap hari."
  ],
  bgmStartSeconds: 60,

  overlaySrc: "assets/overlays/Template-Foto.png",
  frameRects: [
    [5.671,7.324,88.658,22.852],
    [5.671,32.861,88.658,22.900],
    [5.256,58.252,89.073,23.096]
  ]
};

// ===== UTIL =====
const $ = q => document.querySelector(q);
const pad = n => String(n).padStart(2, "0");
const el = (tag, attrs={}) => Object.assign(document.createElement(tag), attrs);
function wait(ms){ return new Promise(r=>setTimeout(r,ms)); }
function showToast(msg){ alert(msg); }

// ===== TIMER COUNTDOWN =====
// Fungsi untuk menampilkan timer countdown
function startTimer(duration) {
  const timerEl = $("#timer");
  let remainingTime = duration;

  // Tampilkan timer
  timerEl.textContent = formatTime(remainingTime);
  timerEl.style.display = 'block';

  // Hitung mundur setiap detik
  const countdownInterval = setInterval(() => {
    remainingTime--;
    timerEl.textContent = formatTime(remainingTime);

    // Jika waktu habis, hentikan countdown
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      timerEl.style.display = 'none';  // Sembunyikan timer setelah selesai
    }
  }, 1000);
}

// Fungsi untuk format waktu dalam format MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
}


// ===== HEADER =====
const nameEl = $("#name"), dateLbl = $("#dateLbl"), dateText = $("#dateText");
const daysTogether = $("#daysTogether"), daysDating = $("#daysDating"), loveNote = $("#loveNote");
if (nameEl) {
  nameEl.textContent = CONFIG.herName; 
  loveNote.textContent = CONFIG.loveNote;

  const birthDate  = new Date(CONFIG.birthday);
  const targetDate = new Date("2025-12-31T00:00:00+07:00");

  const targetLabel = targetDate.toLocaleDateString('id-ID',
    {weekday:'long', day:'2-digit', month:'long', year:'numeric'});
  dateLbl.textContent  = targetLabel;
  dateText.textContent = targetLabel;
  $("#age").textContent = new Date().getFullYear() - birthDate.getFullYear();

  const fm = new Date(CONFIG.firstMet), ds = new Date(CONFIG.datingStart), nowMs = Date.now();
  daysTogether.textContent = Math.max(0, Math.floor((nowMs - fm.getTime())/86400000));
  daysDating.textContent   = Math.max(0, Math.floor((nowMs - ds.getTime())/86400000));

  const countdown = $("#countdown");
  function renderCountdown(){
    const t = targetDate.getTime() - Date.now();
    const d = Math.max(0, Math.floor(t/86400000));
    const h = Math.max(0, Math.floor((t%86400000)/3600000));
    const m = Math.max(0, Math.floor((t%3600000)/60000));
    const s = Math.max(0, Math.floor((t%60000)/1000));
    countdown.innerHTML =
     `<div class="dd"><b>${pad(d)}</b><span>Hari</span></div>
      <div class="dd"><b>${pad(h)}</b><span>Jam</span></div>
      <div class="dd"><b>${pad(m)}</b><span>Menit</span></div>
      <div class="dd"><b>${pad(s)}</b><span>Detik</span></div>`;
  }
  renderCountdown(); setInterval(renderCountdown, 1000);
}

// ===== GALLERY =====
const gal = $("#gal");
if (gal) CONFIG.gallery.forEach(src=>{
  const f = el('figure'); const img = el('img',{src,alt:'kenangan'});
  img.loading = 'lazy'; img.decoding = 'async';
  f.appendChild(img); gal.appendChild(f);
});

// ===== REASONS =====
const reasons = [
  "Senyummu bikin hari aku adem","Cara kamu dengerin aku","Humor receh kita nyambung",
  "Perhatian kecil yang ga pernah lupa","Semangat belajarmu","Sabar + pengertian",
  "Matamu kalau lagi cerita","Tekadmu ngejar mimpi","Gaya fotomu yang gemes","Kamu jadi rumah buatku"
];
const reasonsList = $("#reasonsList");
if (reasonsList) reasons.forEach((t,i)=>{
  const d=el('div',{className:'reason'});
  d.innerHTML=`<div class="num">${i+1}</div><div class="txt">${t}</div>`;
  reasonsList.appendChild(d);
});

// ===== MUSIC =====
const audio = $("#bgm"), btnPlay = $("#btnPlay");
if (btnPlay && audio) {
  let started=false, playing=false;
  btnPlay.addEventListener('click', async ()=>{
    try{
      if(!started){ audio.currentTime = Number(CONFIG.bgmStartSeconds||0); started=true; }
      if(!playing){ await audio.play(); btnPlay.textContent='⏸️ Hentikan Musik'; }
      else { audio.pause(); btnPlay.textContent='▶️ Putar Musik'; }
      playing=!playing;
    }catch{
      showToast('Browser memblokir autoplay. Coba ketuk sekali lagi ya.');
    }
  });
}

// Event listener untuk tombol shortcut foto booth
const btnGoToBooth = $("#btnGoToBooth");
btnGoToBooth.addEventListener("click", () => {
  // Alihkan ke bagian foto booth
  ensureOverlay(); // Pastikan overlay siap
  hide(choiceRow); // Sembunyikan pilihan
  show(boothWrap); // Tampilkan foto booth
  startCam(); // Mulai kamera
});

function resize(){
  const w = innerWidth, h = innerHeight;   
  cv.width = Math.floor(w * DPR); cv.height = Math.floor(h * DPR);
  hv.width = Math.floor(w * DPR); hv.height = Math.floor(h * DPR);
  cv.style.width = w+'px'; cv.style.height = h+'px';
  hv.style.width = w+'px'; hv.style.height = h+'px';
  cx.setTransform(DPR,0,0,DPR,0,0);
  hx.setTransform(DPR,0,0,DPR,0,0);
}
addEventListener('resize', resize); resize();

// ===== Ucapan Ulang Tahun =====

// Fungsi untuk menampilkan dialog ucapan ulang tahun
function showBirthdayDialog() {
  const dialog = $("#birthdayDialog");
  dialog.showModal();  // Tampilkan dialog
}

// Fungsi untuk menutup dialog ucapan ulang tahun
function closeBirthdayDialog() {
  const dialog = $("#birthdayDialog");
  dialog.close();  // Tutup dialog
}

// Fungsi untuk menyalin ucapan ulang tahun ke clipboard
function copyBirthdayMessage() {
  const message = $("#birthdayDialog p").textContent; // Ambil teks ucapan
  navigator.clipboard.writeText(message).then(() => {
    showToast('Ucapan berhasil disalin! 🎉');
  }).catch(() => {
    showToast('Gagal menyalin ucapan. Coba lagi! 😢');
  });
}

// Event listener untuk klik ucapan ulang tahun
const birthdayMessage = $("#birthdayMessage");
birthdayMessage.addEventListener("click", () => {
  showBirthdayDialog(); // Tampilkan dialog ucapan
});

// Event listener untuk tombol salin
const btnCopy = $("#btnCopy");
btnCopy.addEventListener("click", () => {
  copyBirthdayMessage(); // Salin ucapan ke clipboard
});

// Event listener untuk tombol tutup dialog
const btnCloseDialog = $("#btnCloseDialog");
btnCloseDialog.addEventListener("click", () => {
  closeBirthdayDialog(); // Menutup dialog
});


/* =========================================================================
   PHOTO BOOTH – Auto capture + Flash + Shutter + Confirm
   =======================================================================*/
const OVERLAY_SRC = CONFIG.overlaySrc;
const FRAME_PCTS = CONFIG.frameRects.slice();
const SLOT_COUNT = FRAME_PCTS.length;
let SLOT_ASPECT = FRAME_PCTS[0][2]/FRAME_PCTS[0][3];

const frameCanvas = $("#frameCanvas"), fctx = frameCanvas.getContext("2d");
const resultWrap = $("#resultWrap"), btnDownload = $("#btnDownload"), btnBackChoose = $("#btnBackChoose");
const choiceRow = $("#choiceRow"), btnCamFlow = $("#btnCamFlow"), btnUploadFlow = $("#btnUploadFlow");
const boothWrap = $("#boothWrap"), cam = $("#cam"), btnStartCam = $("#btnStartCam"), btnShot = $("#btnShot");
const btnReset = $("#btnReset"), btnConfirmCam = $("#btnConfirmCam");
const slotGrid = $("#slotGrid");
const slotCanvases = slotGrid ? Array.from(slotGrid.querySelectorAll("canvas.slot")) : [];
const shotTimerSel = $("#shotTimer");
const getTimerSec = () => Number(shotTimerSel?.value || 0);

let overlayImg=null, overlayReady=false, images=Array.from({length:SLOT_COUNT},()=>null);
let activeIndex=0, stream=null;

// Flash dan suara
const flashLayer = el("div",{id:"camera-flash"});
document.body.appendChild(flashLayer);
const shutter = new Audio("assets/audio/shutter.mp3");

function cameraFlash(){
  flashLayer.classList.add("flash-active");
  cam.classList.add("cam-shake");
  shutter.currentTime=0; shutter.play().catch(()=>{});
  setTimeout(()=>flashLayer.classList.remove("flash-active"),250);
  setTimeout(()=>cam.classList.remove("cam-shake"),300);
}

function ensureOverlay(){
  if(overlayImg)return;
  overlayImg=new Image();
  overlayImg.onload=()=>{
    overlayReady=true;
    frameCanvas.width=overlayImg.naturalWidth;
    frameCanvas.height=overlayImg.naturalHeight;
    const ovw=overlayImg.naturalWidth,ovh=overlayImg.naturalHeight;
    SLOT_ASPECT=(FRAME_PCTS[0][2]/FRAME_PCTS[0][3])*(ovw/ovh);
    const baseW=240,baseH=Math.round(baseW/SLOT_ASPECT);
    slotCanvases.forEach(c=>{c.width=baseW;c.height=baseH;c.style.aspectRatio=`${baseW}/${baseH}`;});
    resetPreviews();
  };
  overlayImg.src=OVERLAY_SRC;
}

// Fungsi untuk menampilkan modal konfirmasi
function showConfirmationModal() {
  const modal = $("#confirmationModal");
  modal.classList.add("show");
}

// Fungsi untuk menyembunyikan modal
function hideConfirmationModal() {
  const modal = $("#confirmationModal");
  modal.classList.remove("show");
}

// Menampilkan modal saat tombol foto ditekan
btnShot.addEventListener("click", async () => {
  // Tampilkan modal konfirmasi sebelum mengambil gambar
  showConfirmationModal();
});

// Menangani klik tombol OK di modal
$("#btnConfirm").addEventListener("click", async () => {
  // Sembunyikan modal dan lanjutkan pengambilan gambar
  hideConfirmationModal();
  
  disable(btnShot);
  for (let i = 0; i < SLOT_COUNT; i++) {
    activeIndex = i;
    markActive(i);
    await doCountdown(getTimerSec());
    await captureOnce(i);
    await wait(700);
  }
  enable(btnConfirmCam);
  showToast("Semua foto sudah diambil!");
});

// Menangani klik tombol Cancel di modal
$("#btnCancel").addEventListener("click", () => {
  // Sembunyikan modal dan batalkan pengambilan gambar
  hideConfirmationModal();
});


function stopCam(){ if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; } cam.srcObject=null; }

function enable(...e){e.forEach(x=>x&&(x.disabled=false));}
function disable(...e){e.forEach(x=>x&&(x.disabled=true));}
function show(e){e?.classList.remove("hidden");}
function hide(e){e?.classList.add("hidden");}

function drawFitted(ctx,src,dx,dy,dw,dh){
  const iw=src.videoWidth||src.naturalWidth||src.width;
  const ih=src.videoHeight||src.naturalHeight||src.height;
  if(!iw||!ih)return;
  const s=Math.max(dw/iw,dh/ih);
  const pw=iw*s,ph=ih*s,px=dx+(dw-pw)/2,py=dy+(dh-ph)/2;
  ctx.drawImage(src,px,py,pw,ph);
}
function drawPlaceholder(c,n){
  const ctx=c.getContext("2d");
  ctx.fillStyle="#0b1220";ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle="#334155";ctx.setLineDash([6,6]);
  ctx.strokeRect(6,6,c.width-12,c.height-12);
  ctx.setLineDash([]);ctx.fillStyle="#94a3b8";
  ctx.font="700 20px Poppins";ctx.textAlign="center";ctx.textBaseline="middle";
  ctx.fillText(String(n),c.width/2,c.height/2);
}
function resetPreviews(){ slotCanvases.forEach((c,i)=>drawPlaceholder(c,i+1)); disable(btnConfirmCam); }
function markActive(i){ slotCanvases.forEach(c=>c.style.outline=""); slotCanvases[i].style.outline="2px solid #60a5fa"; }

async function doCountdown(sec){ sec=Number(sec||0); if(sec<=0)return; for(let i=sec;i>0;i--){ await wait(1000);} }
async function captureOnce(i){
  cameraFlash();
  const CAPW=1280,CAPH=Math.round(CAPW/SLOT_ASPECT);
  const off=document.createElement("canvas");
  off.width=CAPW;off.height=CAPH;
  const ox=off.getContext("2d");
  drawFitted(ox,cam,0,0,CAPW,CAPH);
  const dataURL=off.toDataURL("image/png");
  const im=new Image();
  im.onload=()=>{images[i]=im;const c=slotCanvases[i];drawFitted(c.getContext("2d"),im,0,0,c.width,c.height);};
  im.src=dataURL;
}

btnShot.addEventListener("click", async () => {
  disable(btnShot);
  for (let i = 0; i < SLOT_COUNT; i++) {
    activeIndex = i;
    markActive(i);
    await doCountdown(getTimerSec());
    await captureOnce(i);
    await wait(700);
  }
  enable(btnConfirmCam);
  showToast("Semua foto sudah diambil!");
});


slotGrid?.addEventListener("click",async e=>{
  const c=e.target.closest("canvas.slot");if(!c)return;
  const i=Number(c.dataset.i);
  const ok=confirm(`Ulangi foto untuk slot ${i+1}?`);
  if(!ok)return;
  activeIndex=i;markActive(i);
  await doCountdown(getTimerSec());
  await captureOnce(i);
  await wait(700);
  showToast(`Slot ${i+1} berhasil diganti.`);
});

btnReset.addEventListener("click",()=>{
  const ok=confirm("Semua hasil foto akan dihapus. Lanjutkan?");
  if(!ok)return;
  images=Array.from({length:SLOT_COUNT},()=>null);
  resetPreviews();markActive(0);
});

function rectPx([x,y,w,h]){
  const cw=frameCanvas.width,ch=frameCanvas.height;
  return [Math.round(x*cw/100),Math.round(y*ch/100),Math.round(w*cw/100),Math.round(h*ch/100)];
}
function composeStrip(){
  if(!overlayReady){ alert("Template belum siap."); return; }
  fctx.clearRect(0,0,frameCanvas.width,frameCanvas.height);
  FRAME_PCTS.forEach((prc,i)=>{
    const [x,y,w,h]=rectPx(prc);
    const img=images[i]; if(!img)return;
    fctx.fillStyle="#0b1220"; fctx.fillRect(x,y,w,h);
    drawFitted(fctx,img,x,y,w,h);
  });
  fctx.drawImage(overlayImg,0,0,frameCanvas.width,frameCanvas.height);
  hide(boothWrap); show(resultWrap);
  btnDownload.href=frameCanvas.toDataURL("image/png");
  btnDownload.style.opacity="1"; btnDownload.style.pointerEvents="auto";
  stopCam();
}

btnConfirmCam.addEventListener("click",composeStrip);
btnBackChoose.addEventListener("click",()=>{ hide(resultWrap); show(choiceRow); stopCam(); resetPreviews(); });
btnCamFlow.addEventListener("click",()=>{ ensureOverlay(); hide(choiceRow); show(boothWrap); startCam(); });
btnUploadFlow.addEventListener("click",()=>showToast("Mode upload belum aktif di versi ini."));

// ===== GATE =====
const GKEY = 'bd-gate-ok-v4';
const PASS = '290824';
function showGate(){ $('#gate').style.display='flex'; }
function hideGate(){ $('#gate').style.display='none'; }
function normalize(inp){
  const d=(inp||'').replace(/\D/g,'');
  if(d.length===8)return d.slice(0,2)+d.slice(2,4)+d.slice(6,8);
  return d;
}
if(localStorage.getItem(GKEY)!=='yes')showGate();
function tryEnter(){
  const v=normalize($('#gateInput').value);
  if(v===PASS){ localStorage.setItem(GKEY,'yes'); hideGate(); }
  else showToast('Masih salah, coba lagi ya 😛');
}
$('#gateBtn').addEventListener('click', tryEnter);
$('#gateInput').addEventListener('keydown', e=>{ if(e.key==='Enter') tryEnter(); });


// Fungsi untuk menampilkan modal konfirmasi
function showConfirmationModal() {
  const modal = $("#confirmationModal");
  modal.classList.add("show");
}

// Fungsi untuk menyembunyikan modal
function hideConfirmationModal() {
  const modal = $("#confirmationModal");
  modal.classList.remove("show");
}

// Menampilkan modal saat tombol foto ditekan
btnShot.addEventListener("click", async () => {
  // Tampilkan modal konfirmasi sebelum mengambil gambar
  showConfirmationModal();
});

// Menangani klik tombol OK di modal
$("#btnConfirm").addEventListener("click", async () => {
  // Sembunyikan modal dan lanjutkan pengambilan gambar
  hideConfirmationModal();
  
  disable(btnShot);
  for (let i = 0; i < SLOT_COUNT; i++) {
    activeIndex = i;
    markActive(i);
    await doCountdown(getTimerSec());
    await captureOnce(i);
    await wait(700);
  }
  enable(btnConfirmCam);
  showToast("Semua foto sudah diambil!");
});

// Menangani klik tombol Cancel di modal
$("#btnCancel").addEventListener("click", () => {
  // Sembunyikan modal dan batalkan pengambilan gambar
  hideConfirmationModal();
});
