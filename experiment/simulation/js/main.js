/* ---- chart engine ---- */
const Chart=(()=>{
function fmt(v){const a=Math.abs(v);if(a>=1e6)return(v/1e6).toFixed(1)+'M';if(a>=1000)return(v/1000).toFixed(a>=10000?0:1)+'k';if(a>0&&a<1)return v.toFixed(2);if(!Number.isInteger(v))return v.toFixed(1);return''+v;}
function draw(cv,series,opts={}){
  const dpr=window.devicePixelRatio||1,W=cv.clientWidth||cv.width,H=W*(opts.ratio||0.52);
  cv.width=W*dpr;cv.height=H*dpr;const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
  const m={l:60,r:18,t:16,b:44};g.clearRect(0,0,W,H);
  let xs=[],ys=[];series.forEach(s=>s.data.forEach(p=>{xs.push(p[0]);ys.push(p[1]);}));
  if(!xs.length){g.fillStyle='#9aa3b2';g.font='15px Segoe UI';g.textAlign='center';g.fillText('Press "Run" to see results',W/2,H/2);cv._series=null;cv._map=null;return;}
  let xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(0,...ys),ymax=Math.max(...ys);
  if(opts.ymin!=null)ymin=opts.ymin;if(xmax===xmin)xmax=xmin+1;if(ymax===ymin)ymax=ymin+1;ymax+=(ymax-ymin)*0.08;
  const X=x=>m.l+(x-xmin)/(xmax-xmin)*(W-m.l-m.r);const Y=y=>H-m.b-(y-ymin)/(ymax-ymin)*(H-m.t-m.b);
  g.font='12px Segoe UI';const nT=6;
  for(let i=0;i<=nT;i++){const gy=ymin+(ymax-ymin)*i/nT;g.strokeStyle='#eef1f6';g.beginPath();g.moveTo(m.l,Y(gy));g.lineTo(W-m.r,Y(gy));g.stroke();g.fillStyle='#7b8494';g.textAlign='right';g.textBaseline='middle';g.fillText(fmt(gy),m.l-8,Y(gy));}
  for(let i=0;i<=nT;i++){const gx=xmin+(xmax-xmin)*i/nT;g.strokeStyle='#f4f6fa';g.beginPath();g.moveTo(X(gx),m.t);g.lineTo(X(gx),H-m.b);g.stroke();g.fillStyle='#7b8494';g.textAlign='center';g.textBaseline='top';g.fillText(fmt(gx),X(gx),H-m.b+6);}
  g.strokeStyle='#c7ccd6';g.beginPath();g.moveTo(m.l,m.t);g.lineTo(m.l,H-m.b);g.lineTo(W-m.r,H-m.b);g.stroke();
  g.fillStyle='#4a5261';g.font='13px Segoe UI';
  if(opts.xlabel){g.textAlign='center';g.fillText(opts.xlabel,(m.l+W-m.r)/2,H-10);}
  if(opts.ylabel){g.save();g.translate(15,(m.t+H-m.b)/2);g.rotate(-Math.PI/2);g.textAlign='center';g.fillText(opts.ylabel,0,0);g.restore();}
  series.forEach(s=>{if(!s.data.length)return;g.fillStyle=s.color;g.strokeStyle=s.color;
    if(s.dots){s.data.forEach(p=>{g.beginPath();g.arc(X(p[0]),Y(p[1]),1.4,0,7);g.fill();});}
    else{g.lineWidth=2.4;g.beginPath();s.data.forEach((p,i)=>{const px=X(p[0]),py=Y(p[1]);i?g.lineTo(px,py):g.moveTo(px,py);});g.stroke();if(s.points)s.data.forEach(p=>{g.beginPath();g.arc(X(p[0]),Y(p[1]),2.4,0,7);g.fill();});}});
  cv._series=series;cv._map={xmin,xmax,ymin,ymax,m,W,H};
}
return{draw};})();
/* ---- helpers ---- */
function toast(m){var t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},2200);}
function dl(t,n,ty){var b=new Blob([t],{type:ty});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();URL.revokeObjectURL(a.href);}
function downloadPNG(name){var cv=document.getElementById('chart');if(!cv||!cv._series){toast('Run first');return;}var o=document.createElement('canvas');o.width=cv.width;o.height=cv.height;var c=o.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,o.width,o.height);c.drawImage(cv,0,0);var a=document.createElement('a');a.download=name;a.href=o.toDataURL();a.click();toast('PNG downloaded');}
function setLegend(series){var el=document.getElementById('legend');if(el)el.innerHTML=series.map(function(s){return '<span><i style="background:'+s.color+'"></i>'+(s.name||'')+'</span>';}).join('');}
var _POS=[];(function(){for(var i=0;i<800;i++)_POS.push([Math.random(),Math.random()]);})();
function renderField(canvasId,groups){var cv=document.getElementById(canvasId);if(!cv)return;var dpr=window.devicePixelRatio||1,W=cv.clientWidth,H=W*0.30;cv.width=W*dpr;cv.height=H*dpr;var c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);c.font='15px serif';c.textAlign='center';c.textBaseline='middle';var idx=0;groups.forEach(function(gp){for(var k=0;k<gp.count;k++){var p=_POS[idx%_POS.length];idx++;c.fillText(gp.emoji,10+p[0]*(W-20),10+p[1]*(H-20));}});}
function toggleFS(){var el=document.getElementById('simbox');var fsEl=document.fullscreenElement||document.webkitFullscreenElement;if(!fsEl){var rq=el.requestFullscreen||el.webkitRequestFullscreen;if(rq)rq.call(el);}else{var ex=document.exitFullscreen||document.webkitExitFullscreen;if(ex)ex.call(document);}}
function _fsSync(){var b=document.getElementById('fsBtn');var on=document.fullscreenElement||document.webkitFullscreenElement;if(b)b.textContent=on?'✕':'⛶';setTimeout(function(){window.dispatchEvent(new Event('resize'));},70);}
document.addEventListener('fullscreenchange',_fsSync);document.addEventListener('webkitfullscreenchange',_fsSync);
window.addEventListener('load',function(){var cv=document.getElementById('chart');if(!cv)return;cv.addEventListener('pointermove',function(e){var M=cv._map;if(!M)return;var r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;if(mx<M.m.l||mx>M.W-M.m.r||my<M.m.t||my>M.H-M.m.b)return;var xv=M.xmin+(mx-M.m.l)/(M.W-M.m.l-M.m.r)*(M.xmax-M.xmin);var yv=M.ymin+(M.H-M.m.b-my)/(M.H-M.m.b-M.m.t)*(M.ymax-M.ymin);var rx=document.getElementById('rx'),ry=document.getElementById('ry');if(rx)rx.textContent=xv.toFixed(2);if(ry)ry.textContent=yv.toFixed(1);});});
/* ---- model: logistic growth ---- */
let sim=null,anim=null,frame=0;
function g(id){return +document.getElementById(id).value;}
function mode(){return document.getElementById('mode').value;}
function fLog(N,r,K,th){return r*N*(1-Math.pow(Math.max(N,0)/K,th));}
function contSeries(N0,r,K,th,n){const h=1,d=[[0,N0]];let N=N0;for(let i=0;i<n;i++){const k1=fLog(N,r,K,th),k2=fLog(N+.5*h*k1,r,K,th),k3=fLog(N+.5*h*k2,r,K,th),k4=fLog(N+h*k3,r,K,th);N=Math.max(0,N+h/6*(k1+2*k2+2*k3+k4));d.push([i+1,N]);}return d;}
function disSeries(N0,r,K,th,n){const d=[[0,N0]];let N=N0;for(let i=0;i<n;i++){N=Math.max(0,N+fLog(N,r,K,th));d.push([i+1,N]);}return d;}
function bifurcation(K,th){const pts=[];for(let r=1.5;r<=3.0001;r+=0.006){let N=0.5*K;for(let i=0;i<250;i++)N=Math.max(0,N+fLog(N,r,K,th));for(let i=0;i<70;i++){N=Math.max(0,N+fLog(N,r,K,th));pts.push([+r.toFixed(3),N]);}}return pts;}
const chart=()=>document.getElementById('chart');
function drawChart(){
  if(!sim){Chart.draw(chart(),[]);return;}
  const t=document.getElementById('plotTitle');
  if(sim.kind==='bif'){Chart.draw(chart(),[{color:'#b50246',data:sim.data,dots:true}],{xlabel:'Growth rate r',ylabel:'Population attractor (N)',ratio:0.55});setLegend([{color:'#b50246',name:'Attractor (period-doubling to chaos)'}]);t.textContent='Bifurcation diagram — discrete logistic';}
  else if(sim.kind==='den'){Chart.draw(chart(),[{color:'#b50246',data:sim.a},{color:'#0e7c86',data:sim.b}],{xlabel:'Generation',ylabel:'Population N',ratio:0.55});setLegend([{color:'#b50246',name:'Start below K (N₀='+sim.n0a+')'},{color:'#0e7c86',name:'Start above K (N₀='+sim.n0b+')'}]);t.textContent='Effect of population density — both converge toward K';}
  else{const col=sim.kind==='cont'?'#b50246':'#0e7c86';Chart.draw(chart(),[{color:col,data:sim.data,points:sim.kind==='dis'}],{xlabel:sim.kind==='cont'?'Time':'Generation',ylabel:'Population N',ratio:0.5});setLegend([{color:col,name:(sim.kind==='cont'?'Continuous logistic':'Discrete logistic')}]);t.textContent=(sim.kind==='cont'?'Continuous':'Discrete')+' logistic growth';}
}
function hasField(){return sim&&(sim.kind==='cont'||sim.kind==='dis');}
function drawField(i){if(!hasField()){renderField('field',[]);return;}const K=g('K');const nN=Math.min(180,Math.round(sim.data[i][1]/K*120));renderField('field',[{emoji:'🐛',count:nN}]);}
function info(i){if(!sim)return;if(hasField())document.getElementById('counts').innerHTML='Population: <b>'+Math.round(sim.data[i][1])+'</b> &nbsp; '+(sim.kind==='cont'?'t':'gen')+' = <b>'+sim.data[i][0]+'</b> &nbsp; K = <b>'+g('K')+'</b>';else document.getElementById('counts').textContent='';}
function run(){
  stopAnim();
  const N0=g('n0'),r=g('r'),K=g('K'),th=g('th'),n=Math.round(g('steps')),m=mode();
  const fld=document.getElementById('field');
  if(m==='cont'){sim={kind:'cont',data:contSeries(N0,r,K,th,n)};fld.style.display='block';}
  else if(m==='dis'){sim={kind:'dis',data:disSeries(N0,r,K,th,n)};fld.style.display='block';}
  else if(m==='bif'){sim={kind:'bif',data:bifurcation(K,th)};fld.style.display='none';}
  else{const n0a=Math.round(0.1*K),n0b=Math.round(1.9*K);sim={kind:'den',a:disSeries(n0a,r,K,th,n),b:disSeries(n0b,r,K,th,n),n0a:n0a,n0b:n0b};fld.style.display='none';}
  frame=sim.data?sim.data.length-1:0;drawChart();drawField(frame);info(frame);toast('Computed');
}
function play(){if(!hasField()){run();return;}if(!sim)run();if(anim){stopAnim();return;}document.getElementById('playBtn').textContent='Pause ⏸';let i=(frame>=sim.data.length-1)?0:frame;anim=setInterval(function(){if(i>sim.data.length-1){stopAnim();return;}frame=i;drawField(i);info(i);i++;},110);}
function stopAnim(){if(anim){clearInterval(anim);anim=null;}document.getElementById('playBtn').textContent='Play ▶';}
function step(){if(!hasField())return;if(!sim)run();stopAnim();frame=(frame>=sim.data.length-1)?0:frame+1;drawField(frame);info(frame);}
function sync(){document.querySelectorAll('#simbox .val').forEach(function(v){var el=document.getElementById(v.id.slice(2));if(el)v.textContent=el.value;});}
const D={n0:10,r:0.6,K:100,th:1,steps:40};
function resetSim(){stopAnim();for(const k in D)document.getElementById(k).value=D[k];document.getElementById('mode').value='cont';sync();run();toast('Reset');}
function downloadCSV(){if(!sim){toast('Run first');return;}let csv;if(sim.kind==='bif'){csv='r,N\n'+sim.data.map(p=>p[0]+','+p[1]).join('\n');}else if(sim.kind==='den'){csv='generation,startBelowK,startAboveK\n';for(let i=0;i<sim.a.length;i++)csv+=sim.a[i][0]+','+sim.a[i][1]+','+sim.b[i][1]+'\n';}else{csv=(sim.kind==='cont'?'time':'generation')+',N\n'+sim.data.map(p=>p[0]+','+p[1]).join('\n');}dl(csv,'logistic-growth.csv','text/csv');toast('CSV downloaded');}
sync();run();window.addEventListener('resize',function(){if(sim){drawChart();drawField(frame);}});
