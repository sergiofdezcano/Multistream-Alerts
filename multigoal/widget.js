(() => {
'use strict';
const cfg=window.SERG4CANO_MULTIGOAL||{}, params=new URLSearchParams(location.search), demo=params.get('demo')==='1';
const colors={youtube:'#ff0033',twitch:'#9146ff',kick:'#53fc18',tiktok:'#000000'};
const icons={
youtube:'<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="5" fill="#FF0033"/><path d="M10 8v8l6-4z" fill="white"/></svg>',
twitch:'<svg viewBox="0 0 24 24"><path fill="#9146FF" d="M3 1h19v14l-5 5h-5l-3 3H6v-3H2V6z"/><path fill="white" d="M7 4h12v10l-3 3h-5l-3 3v-3H7z"/><path fill="#9146FF" d="M11 7h2v6h-2zm5 0h2v6h-2z"/></svg>',
kick:'<svg viewBox="0 0 24 24"><path fill="#53FC18" d="M2 2h7v8h3V7h4V4h6v6h-4v4h4v8h-7v-5h-3v-4H9v9H2z"/></svg>',
tiktok:'<svg viewBox="0 0 24 24"><path stroke="white" stroke-width="1.5" fill="black" d="M13 2h4c0 3 2 5 5 5v4c-3 0-5-1-6-2v7c0 4-2.5 6-5.6 6C7 22 5 20 5 17s2-5.5 5.5-5.7v4c-1.2 0-2 .7-2 1.8 0 1 .8 1.7 1.9 1.7s2.6-1 2.6-2.7z"/></svg>'
};
const node={root:document.querySelector('.widget'),icon:document.querySelector('#platform-icon'),title:document.querySelector('#goal-title'),count:document.querySelector('#goal-count'),track:document.querySelector('#goal-track'),fill:document.querySelector('#goal-fill')};
const format=new Intl.NumberFormat('es-ES',{maximumFractionDigits:0});
function normalize(g){if(!g||!colors[g.platform])return null;return {...g,id:String(g.id||'').replace(/[^A-Za-z0-9_-]/g,''),current:Number(g.current)||0,start:Number(g.start)||0,target:Number(g.target)||100,enabled:g.enabled!==false};}
let goals=(cfg.goals||[]).map(normalize).filter(g=>g&&g.id),index=0,rotator,animation,ws,reconnect,sync;
const shown=()=>goals.filter(g=>g.enabled);
function progress(g){return g.target>g.start?Math.max(0,Math.min(100,100*(g.current-g.start)/(g.target-g.start))):(g.current>=g.target?100:0);}
function render(fade=false){
 const list=shown();if(!list.length){node.title.textContent='Sin objetivos';node.count.textContent='';node.fill.style.width='0%';return;}
 index%=list.length;const g=list[index],commit=()=>{
 node.root.dataset.platform=g.platform;node.root.style.setProperty('--accent',colors[g.platform]);
 node.icon.innerHTML=icons[g.platform];node.title.textContent=g.title;node.count.textContent=format.format(g.current)+' / '+format.format(g.target);
 node.fill.style.width=progress(g)+'%';node.track.setAttribute('aria-valuenow',String(Math.round(progress(g))));node.root.classList.remove('changing');};
 clearTimeout(animation);if(fade){node.root.classList.add('changing');animation=setTimeout(commit,Math.max(0,Number(cfg.transitionMilliseconds)||350));}else commit();
}
function rotate(){clearTimeout(rotator);const list=shown();if(list.length<2)return;
 rotator=setTimeout(()=>{index=(index+1)%shown().length;render(true);rotate();},Math.max(2,Number(list[index].durationSeconds||cfg.rotateEverySeconds)||10)*1000);}
function next(n){if(!shown().length)return;index=(index+n+shown().length)%shown().length;render(true);rotate();}
function update(id,value){const g=goals.find(g=>g.id===id),v=Number(value);if(!g||!Number.isFinite(v)||v<0)return;g.current=v;if(shown()[index]?.id===id)render();}
function globals(value){for(const item of (Array.isArray(value)?value:Object.values(value||{}))){if(item?.name?.startsWith('sc_goal_'))update(item.name.slice(8),item.value);}}
function request(){if(ws?.readyState===WebSocket.OPEN)ws.send(JSON.stringify({request:'GetGlobals',id:'sc-goals',persisted:true}));}
function connect(){
 if(demo)return;
 try{ws=new WebSocket(cfg.websocketUrl||'ws://127.0.0.1:8080/');}catch{return retry();}
 ws.onopen=()=>{request();clearInterval(sync);sync=setInterval(request,Math.max(2,Number(cfg.syncEverySeconds)||10)*1000);};
 ws.onmessage=e=>{let d;try{d=JSON.parse(e.data);}catch{return;}
 if(d.id==='sc-goals'&&d.status==='ok')globals(d.variables);
 if(d.event?.source==='Custom'&&d.event?.type==='Event'&&d.data?.eventName==='Serg4Cano.MultiGoalUpdate'){
 const a=d.data.args||{};if(a.goalId!=null&&a.current!=null)update(String(a.goalId),a.current);else request();}
 };
 ws.onclose=()=>{clearInterval(sync);retry();};ws.onerror=()=>ws.close();
}
function retry(){clearTimeout(reconnect);reconnect=setTimeout(connect,5000);}
if(demo)window.addEventListener('message',e=>{
 if(e.source!==parent||e.data?.channel!=='serg4cano-multigoal-demo')return;const d=e.data;
 if(d.action==='next')next(1);if(d.action==='prev')next(-1);
 if(d.action==='update')update(d.id,d.current);
 if(d.action==='set-goals'&&Array.isArray(d.goals)){goals=d.goals.map(normalize).filter(g=>g&&g.id);index=0;render();rotate();}
});
render();rotate();connect();
window.addEventListener('beforeunload',()=>{clearTimeout(rotator);clearTimeout(reconnect);clearInterval(sync);ws?.close();});
})();