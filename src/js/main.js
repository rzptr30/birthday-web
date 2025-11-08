// ===== CONFIG =====
const CONFIG = {
  herName: "Alya",
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
  bgmStartSeconds: 60
};

// ===== UTIL =====
const pad = (n)=> String(n).padStart(2,'0');
const $ = (q)=> document.querySelector(q);
const el = (tag,attrs={})=>{const x=document.createElement(tag);Object.assign(x,attrs);return x};

// ===== INIT HEADER =====
const nameEl = $("#name"), dateLbl = $("#dateLbl"), dateText = $("#dateText");
const daysTogether = $("#daysTogether"), daysDating = $("#daysDating"), loveNote = $("#loveNote");
nameEl.textContent = CONFIG.herName; loveNote.textContent = CONFIG.loveNote;

const bd = new Date(CONFIG.birthday);
dateLbl.textContent = bd.toLocaleDateString('id-ID',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
dateText.textContent = dateLbl.textContent;
$("#age").textContent = new Date().getFullYear() - bd.getFullYear();

const fm = new Date(CONFIG.firstMet), ds = new Date(CONFIG.datingStart), nowMs = Date.now();
daysTogether.textContent = Math.max(0, Math.floor((nowMs - fm.getTime())/86400000));
daysDating.textContent   = Math.max(0, Math.floor((nowMs - ds.getTime())/86400000));

// ===== COUNTDOWN =====
const countdown = $("#countdown");
function renderCountdown(){
  const t = bd.getTime() - Date.now();
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

// ===== GALLERY =====
const gal = $("#gal");
CONFIG.gallery.forEach(src=>{ const f=el('figure'); f.appendChild(el('img',{src,alt:'kenangan'})); gal.appendChild(f); });

// ===== REASONS =====
const reasons = [
  "Senyummu bikin hari aku adem","Cara kamu dengerin aku","Humor receh kita nyambung",
  "Perhatian kecil yang ga pernah lupa","Semangat belajarmu","Sabar + pengertian",
  "Matamu kalau lagi cerita","Tekadmu ngejar mimpi","Gaya fotomu yang gemes","Kamu jadi rumah buatku"
];
const reasonsList = $("#reasonsList");
reasons.forEach((t,i)=>{ const d=el('div',{className:'reason'}); d.innerHTML=`<div class="num">${i+1}</div><div class="txt">${t}</div>`; reasonsList.appendChild(d); });

// ===== MUSIC =====
const audio = $("#bgm"), btnPlay = $("#btnPlay");
let started=false, playing=false;
btnPlay.addEventListener('click', async ()=>{
  try{
    if(!started){ audio.currentTime = Number(CONFIG.bgmStartSeconds||0); started=true; }
    if(!playing){ await audio.play(); btnPlay.textContent='⏸️ Hentikan Musik'; }
    else { audio.pause(); btnPlay.textContent='▶️ Putar Musik'; }
    playing=!playing;
  }catch{ alert('Browser memblokir autoplay. Coba ketuk sekali lagi ya.'); }
});

// ===== CANVAS: CONFETTI =====
const cv=$("#confetti"), cx=cv.getContext('2d');
const hv=$("#hearts"), hx=hv.getContext('2d');
let dots=[];
function resize(){ cv.width=innerWidth; cv.height=innerHeight; hv.width=innerWidth; hv.height=innerHeight }
addEventListener('resize', resize); resize();

function spawn(n=120){
  for(let i=0;i<n;i++){
    dots.push({x:Math.random()*cv.width,y:-10,r:3+Math.random()*3,vY:2+Math.random()*3,vX:(Math.random()-.5)*1.5,a:1});
  }
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  dots.forEach(d=>{
    d.y+=d.vY; d.x+=d.vX; d.a-=.006; if(d.a<0) d.a=0;
    cx.globalAlpha=d.a;
    cx.fillStyle=['#f472b6','#60a5fa','#fcd34d','#a78bfa'][Math.floor(Math.random()*4)];
    cx.beginPath(); cx.arc(d.x,d.y,d.r,0,Math.PI*2); cx.fill();
  });
  dots=dots.filter(d=>d.a>0 && d.y<cv.height+10);
  requestAnimationFrame(loop);
}
loop();
$("#btnConfetti").addEventListener('click',()=>spawn(200));

// ===== LETTER =====
const letterBody=$("#letterBody"), btnMore=$("#btnMore");
CONFIG.letters.forEach((t,i)=>{ const p=el('p',{className:'frag'}); p.textContent=t; if(i>0)p.style.display='none'; letterBody.appendChild(p); });
btnMore.addEventListener('click',()=>{
  const hidden=[...document.querySelectorAll('#letterBody .frag')].find(x=>x.style.display==='none');
  if(hidden){ hidden.style.display='block'; spawn(200); }
  else { btnMore.textContent='Sudah terbaca semua ❤️'; btnMore.disabled=true; petalsRain(); }
});

// ===== PETALS =====
let petals=[];
function drawPetal(x,y,s,rot){
  hx.save(); hx.translate(x,y); hx.rotate(rot); hx.scale(s/20,s/20);
  hx.beginPath(); hx.moveTo(0,0); hx.bezierCurveTo(6,-6,14,-6,16,0); hx.bezierCurveTo(14,6,6,6,0,0); hx.closePath();
  hx.fillStyle=['#f9a8d4','#fecaca','#fce7f3'][Math.floor(Math.random()*3)]; hx.globalAlpha=0.9; hx.fill(); hx.restore();
}
function petalsRain(){
  for(let i=0;i<80;i++){
    petals.push({x:Math.random()*hv.width,y:-10,s:10+Math.random()*18,vY:1+Math.random()*2,vX:(Math.random()-.5)*1.1,a:1,r:Math.random()*Math.PI});
  }
  requestAnimationFrame(petalsLoop);
}
function petalsLoop(){
  hx.clearRect(0,0,hv.width,hv.height);
  petals.forEach(p=>{ p.y+=p.vY; p.x+=p.vX; p.r+=0.02; p.a-=.004; });
  petals=petals.filter(p=>p.a>0 && p.y<hv.height+30);
  petals.forEach(p=>drawPetal(p.x,p.y,p.s,p.r));
  if(petals.length>0) requestAnimationFrame(petalsLoop);
}

// ===== UPLOADER 16:9 =====
const file=$("#file"), btnDownload=$("#btnDownload"), frameCanvas=$("#frameCanvas"), fctx=frameCanvas.getContext('2d'), framePreview=$("#framePreview");

function drawSimple(img){
  const W=1280,H=720; frameCanvas.width=W; frameCanvas.height=H;
  fctx.clearRect(0,0,W,H);
  const iw=img.naturalWidth, ih=img.naturalHeight;
  const s=Math.max(W/iw, H/ih); const dw=iw*s, dh=ih*s; const dx=(W-dw)/2, dy=(H-dh)/2;
  const r=24; fctx.save(); fctx.beginPath();
  fctx.moveTo(r,0); fctx.arcTo(W,0,W,H,r); fctx.arcTo(W,H,0,H,r); fctx.arcTo(0,H,0,0,r); fctx.arcTo(0,0,W,0,r); fctx.closePath(); fctx.clip();
  fctx.drawImage(img,dx,dy,dw,dh);
  const vg=fctx.createRadialGradient(W/2,H/2,Math.min(W,H)/3, W/2,H/2,Math.max(W,H)/1.1);
  vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.35)');
  fctx.fillStyle=vg; fctx.fillRect(0,0,W,H);
  fctx.restore();
  framePreview.classList.remove('empty');
  btnDownload.href=frameCanvas.toDataURL('image/png');
  btnDownload.style.opacity=1; btnDownload.style.pointerEvents='auto';
}
file.addEventListener('change', ()=>{
  const f=file.files[0]; if(!f) return;
  const url=URL.createObjectURL(f); const img=new Image();
  img.onload=()=>{ drawSimple(img); URL.revokeObjectURL(url); };
  img.src=url;
});

// ===== SELF TESTS =====
(function selfTests(){
  const tests=[ ()=>!!document.getElementById('frameCanvas'), ()=>document.getElementById('hearts').width>=0 ];
  const results=tests.map(fn=>{try{return !!fn()}catch{return false}});
  console.log('%c[BirthdayWeb] Self-tests:','color:#60a5fa',results);
})();

// ===== PRIVATE GATE =====
const GKEY='bd-gate-ok-v1', PASS='alya';
function showGate(){ document.getElementById('gate').style.display='flex' }
function hideGate(){ document.getElementById('gate').style.display='none' }

// inject gate markup only when needed (optional: you can leave your static gate HTML and remove this section)
if(!document.getElementById('gate')){
  const wrap=document.createElement('div');
  wrap.id='gate';
  wrap.style.cssText='position:fixed;inset:0;background:#0b1022;display:none;align-items:center;justify-content:center;z-index:9999';
  wrap.innerHTML=`
    <div class="card" style="max-width:420px;margin:16px;text-align:center">
      <h2>Hi, ini khusus buat kamu 💞</h2>
      <p style="color:#cbd5e1">Masukkan <b>kode sayang</b> yang cuma kamu tau.</p>
      <input id="gateInput" placeholder="mis. panggilan sayang" style="width:100%;background:#0b1220;border:1px solid #334155;border-radius:12px;padding:12px;color:var(--text);margin-top:10px"/>
      <button class="btn primary" id="gateBtn" style="margin-top:12px">Masuk</button>
      <p class="sub" style="margin-top:10px">Hint: panggilan favorit kita 😉</p>
    </div>`;
  document.body.appendChild(wrap);
}
if(localStorage.getItem(GKEY)!=='yes'){ showGate(); }
document.addEventListener('click', (e)=>{
  if(e.target && e.target.id==='gateBtn'){
    const v=(document.getElementById('gateInput').value||'').trim().toLowerCase();
    if(v===PASS){ localStorage.setItem(GKEY,'yes'); hideGate(); }
    else alert('Eits, coba lagi ya 😛');
  }
});
