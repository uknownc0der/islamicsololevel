// Simple localStorage-backed counters and progress bars
const SALAWAT_KEY = 'isl_sl_salawat';
const WAQIAH_KEY = 'isl_sl_waqiah_done';
const SALAWAT_TARGET = 1000;

// DOM refs
const salawatCountEl = document.getElementById('salawat-count');
const salawatBarEl = document.getElementById('salawat-bar');
const salawatIncBtn = document.getElementById('salawat-inc');
const salawatInc10Btn = document.getElementById('salawat-inc-10');
const salawatResetBtn = document.getElementById('salawat-reset');

const waqiahCountEl = document.getElementById('waqiah-count');
const waqiahBarEl = document.getElementById('waqiah-bar');
const waqiahDoneBtn = document.getElementById('waqiah-done');
const waqiahResetBtn = document.getElementById('waqiah-reset');

// Helpers
function getSalawat(){
  const raw = localStorage.getItem(SALAWAT_KEY);
  return raw ? parseInt(raw,10) : 0;
}
function setSalawat(n){
  localStorage.setItem(SALAWAT_KEY,String(n));
  renderSalawat();
}
function getWaqiah(){
  return localStorage.getItem(WAQIAH_KEY) === '1';
}
function setWaqiah(v){
  localStorage.setItem(WAQIAH_KEY, v ? '1' : '0');
  renderWaqiah();
}

// Render
function renderSalawat(){
  const n = getSalawat();
  const pct = Math.min(100, (n / SALAWAT_TARGET) * 100);
  salawatCountEl.textContent = `${n} / ${SALAWAT_TARGET}`;
  salawatBarEl.style.width = pct + '%';
}
function renderWaqiah(){
  const done = getWaqiah();
  waqiahCountEl.textContent = done ? 'Completed' : 'Not completed';
  waqiahBarEl.style.width = done ? '100%' : '0%';
}

// Actions
salawatIncBtn.addEventListener('click', ()=>{
  let n = getSalawat();
  n = Math.min(SALAWAT_TARGET, n + 1);
  setSalawat(n);
});

salawatInc10Btn.addEventListener('click', ()=>{
  let n = getSalawat();
  n = Math.min(SALAWAT_TARGET, n + 10);
  setSalawat(n);
});

salawatResetBtn.addEventListener('click', ()=>{
  if(confirm('Reset 1k Salawat progress?')){
    setSalawat(0);
  }
});

waqiahDoneBtn.addEventListener('click', ()=>{
  setWaqiah(true);
});

waqiahResetBtn.addEventListener('click', ()=>{
  if(confirm('Reset Surah Waqiah completion?')){
    setWaqiah(false);
  }
});

// init
renderSalawat();
renderWaqiah();

// PWA install prompt hint (optional)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  deferredPrompt = e;
});

// register service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>{
    console.log('sw registration failed');
  });
}
