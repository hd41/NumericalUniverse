/* ---------- NUMEROLOGY ---------- */
function reduceNumber(n){
  while(n > 9 && n !== 11 && n !== 22 && n !== 33){
    n = String(n).split('').reduce((a,b)=>a+parseInt(b,10),0);
  }
  return n;
}
const meanings = {
  1:"Independent, driven, a natural starter.",
  2:"Diplomatic, sensitive, works best with a partner.",
  3:"Expressive, creative, drawn to communication.",
  4:"Grounded, disciplined, builds for the long term.",
  5:"Adaptable, curious, needs freedom to thrive.",
  6:"Responsible, nurturing, oriented around others.",
  7:"Reflective, analytical, trusts evidence over instinct.",
  8:"Ambitious, resourceful, comfortable with authority.",
  9:"Compassionate, idealistic, sees the bigger picture.",
  11:"Master number — intuitive, a natural guide to others.",
  22:"Master number — a builder who turns big ideas into structure.",
  33:"Master number — nurtures on a larger, almost teacherly scale."
};

/* ---------- ZODIAC ---------- */
const zodiac = [
  {name:"Capricorn", from:[12,22], to:[1,19], symbol:"♑"},
  {name:"Aquarius", from:[1,20], to:[2,18], symbol:"♒"},
  {name:"Pisces", from:[2,19], to:[3,20], symbol:"♓"},
  {name:"Aries", from:[3,21], to:[4,19], symbol:"♈"},
  {name:"Taurus", from:[4,20], to:[5,20], symbol:"♉"},
  {name:"Gemini", from:[5,21], to:[6,20], symbol:"♊"},
  {name:"Cancer", from:[6,21], to:[7,22], symbol:"♋"},
  {name:"Leo", from:[7,23], to:[8,22], symbol:"♌"},
  {name:"Virgo", from:[8,23], to:[9,22], symbol:"♍"},
  {name:"Libra", from:[9,23], to:[10,22], symbol:"♎"},
  {name:"Scorpio", from:[10,23], to:[11,21], symbol:"♏"},
  {name:"Sagittarius", from:[11,22], to:[12,21], symbol:"♐"},
];
function getZodiacSign(dd, mm){
  for(const z of zodiac){
    const fm = z.from[0], fd = z.from[1], tm = z.to[0], td = z.to[1];
    if(fm === tm){
      if(mm === fm && dd >= fd && dd <= td) return z;
    } else {
      if((mm === fm && dd >= fd) || (mm === tm && dd <= td)) return z;
    }
  }
  return zodiac[0];
}

const horoscopePool = [
  "A conversation today reveals more than it seems to on the surface — listen for what's underneath.",
  "Something you've been putting off is ready to move. Small action beats more planning today.",
  "Your patience gets tested in a minor way this afternoon. It's a rehearsal, not a verdict.",
  "A financial or practical decision benefits from sleeping on it one more night.",
  "Someone from your past resurfaces in conversation or thought — no action needed, just notice it.",
  "Your energy is better spent finishing something old than starting something new right now.",
  "A small, well-timed risk pays off if you take it before midday.",
  "Rest is productive today, even if it doesn't feel that way while you're doing it."
];
// Deterministic daily pick per sign, seeded by today's date + sign index — changes once per day, not on every click.
function dayIndex(){
  const d = new Date();
  return d.getFullYear()*372 + d.getMonth()*31 + d.getDate();
}
function todaysHoroscope(signIndex){
  const idx = (dayIndex() * 7 + signIndex * 13) % horoscopePool.length;
  return horoscopePool[idx];
}

/* ---------- UNIVERSAL DAY NUMBER ---------- */
function universalDayNumber(date){
  const d = date || new Date();
  const str = '' + d.getDate() + (d.getMonth()+1) + d.getFullYear();
  const sum = str.split('').reduce((a,b)=>a+parseInt(b,10),0);
  return reduceNumber(sum);
}
const dayNumberMeanings = {
  1:"Good day to start something — initiative is favored.",
  2:"Better for cooperation than solo effort. Reach out to someone.",
  3:"Communication flows easily — write, call, or pitch something.",
  4:"A practical, get-things-done day. Structure pays off.",
  5:"Expect a change of plan. Stay flexible rather than fighting it.",
  6:"Focus turns toward home, family, or people who depend on you.",
  7:"Good for research, reflection, or anything that needs quiet focus.",
  8:"Money and career matters are favored — a good day to negotiate.",
  9:"A day for finishing, releasing, or closing a chapter, not starting one.",
  11:"Heightened intuition — trust the first instinct, not the third.",
  22:"Big-picture thinking pays off. Build something meant to last.",
  33:"A day that asks more of you for others than for yourself."
};

function renderTodayWidget(){
  const n = universalDayNumber();
  const dateStr = new Date().toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric'});

  const el = document.getElementById('todayNum');
  if(el){
    el.textContent = n;
    const label = document.getElementById('todayNumText');
    if(label) label.textContent = dayNumberMeanings[n] || "";
    const dateLabel = document.getElementById('todayDate');
    if(dateLabel) dateLabel.textContent = dateStr;
  }

  // Larger widget on the insights page
  const big = document.getElementById('todayNumBig');
  if(big){
    big.textContent = n;
    const bigText = document.getElementById('todayNumTextBig');
    if(bigText) bigText.textContent = dayNumberMeanings[n] || "";
    const dateHeading = document.getElementById('todayDate2');
    if(dateHeading) dateHeading.textContent = dateStr;
  }
}
document.addEventListener('DOMContentLoaded', renderTodayWidget);

/* ---------- INSIGHTS PAGE: life path calculator (id-suffixed inputs) ---------- */
function calcInsightsPage(){
  const dd = parseInt(document.getElementById('dd2').value, 10);
  const mm = parseInt(document.getElementById('mm2').value, 10);
  const yy = parseInt(document.getElementById('yy2').value, 10);
  const resultBox = document.getElementById('calcResult2');
  if(!dd || !mm || !yy || String(yy).length < 4 || mm < 1 || mm > 12 || dd < 1 || dd > 31){
    document.getElementById('lifeBadgeText2').textContent = "Enter a full DD / MM / YYYY";
    document.getElementById('lifeBadgeNum2').textContent = "—";
    resultBox.style.display = 'flex';
    return;
  }
  const digits = (''+dd+mm+yy).split('').map(Number);
  const sum = digits.reduce((a,b)=>a+b,0);
  const result = reduceNumber(sum);
  document.getElementById('lifeBadgeNum2').textContent = result;
  document.getElementById('lifeBadgeText2').textContent = meanings[result] || "Your core number";
  resultBox.style.display = 'flex';
}

/* ---------- HERO CALCULATOR (life path + zodiac) ---------- */
function calcLifePath(){
  const dd = parseInt(document.getElementById('dd').value, 10);
  const mm = parseInt(document.getElementById('mm').value, 10);
  const yy = parseInt(document.getElementById('yy').value, 10);
  const resultBox = document.getElementById('calcResult');
  if(!dd || !mm || !yy || String(yy).length < 4 || mm < 1 || mm > 12 || dd < 1 || dd > 31){
    document.getElementById('lifeBadgeText').textContent = "Enter a full DD / MM / YYYY";
    document.getElementById('lifeBadgeNum').textContent = "—";
    const zline = document.getElementById('calcZodiac');
    if(zline) zline.style.display = 'none';
    resultBox.style.display = 'flex';
    return;
  }
  const digits = (''+dd+mm+yy).split('').map(Number);
  const sum = digits.reduce((a,b)=>a+b,0);
  const result = reduceNumber(sum);
  document.getElementById('lifeBadgeNum').textContent = result;
  document.getElementById('lifeBadgeText').textContent = meanings[result] || "Your core number";
  resultBox.style.display = 'flex';

  const z = getZodiacSign(dd, mm);
  const zline = document.getElementById('calcZodiac');
  if(zline){
    zline.style.display = 'block';
    zline.textContent = z.symbol + '  ' + z.name;
  }
}

/* ---------- ZODIAC GRID (insights page) ---------- */
function renderZodiacGrid(){
  const grid = document.getElementById('zodiacGrid');
  if(!grid) return;
  grid.innerHTML = zodiac.map(function(z, i){
    return '<button class="zodiac-card" onclick="revealHoroscope(' + i + ', this)">' +
      '<span class="zodiac-symbol">' + z.symbol + '</span>' +
      '<span class="zodiac-name">' + z.name + '</span>' +
    '</button>';
  }).join('');
}
function revealHoroscope(i, btn){
  document.querySelectorAll('.zodiac-card').forEach(function(c){ c.classList.remove('active'); });
  btn.classList.add('active');
  const z = zodiac[i];
  const box = document.getElementById('horoscopeResult');
  box.style.display = 'block';
  box.innerHTML = '<div class="eyebrow">' + z.symbol + ' ' + z.name + ' · Today</div><p>' + todaysHoroscope(i) + '</p>';
}
document.addEventListener('DOMContentLoaded', renderZodiacGrid);

/* ---------- CHAT PANEL (single Guruji) ---------- */
function openChat(){

  const message = '';
  const phoneNumber = '9013571042';
  const whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message); window.open(whatsappUrl, "_blank");

  // --- disabled opening chat option ------
  // document.getElementById('chatPanel').classList.add('open');
  // document.getElementById('overlayBg').classList.add('open');
}
function closeChat(){
  document.getElementById('chatPanel').classList.remove('open');
  document.getElementById('overlayBg').classList.remove('open');
}
const canned = [
  "That's a good question — let me look at how that shows up in your chart.",
  "Based on what you've shared, that lines up with your life path number closely.",
  "I'd want a bit more detail on your birth time to answer that precisely.",
  "That's a common pattern for that number — you're not imagining it."
];
function sendPanelMsg(){
  const input = document.getElementById('panelInput');
  const text = input.value.trim();
  if(!text) return;
  const body = document.getElementById('panelBody');
  const me = document.createElement('div');
  me.className = 'bubble me';
  me.textContent = text;
  body.appendChild(me);
  input.value = '';
  body.scrollTop = body.scrollHeight;

  const typing = document.getElementById('typingIndicator');
  typing.style.display = 'block';
  setTimeout(function(){
    typing.style.display = 'none';
    const them = document.createElement('div');
    them.className = 'bubble them';
    them.textContent = canned[Math.floor(Math.random()*canned.length)];
    body.appendChild(them);
    body.scrollTop = body.scrollHeight;
  }, 900);
}
