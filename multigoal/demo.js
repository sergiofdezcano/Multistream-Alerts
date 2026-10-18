(() => {
const config=window.SERG4CANO_MULTIGOAL,original=JSON.stringify(config.goals),frame=document.querySelector('#preview'),sel=document.querySelector('#goal'),amount=document.querySelector('#amount');let goals=JSON.parse(original),ready=false;
const send=o=>{if(ready)frame.contentWindow.postMessage({channel:'serg4cano-multigoal-demo',...o},'*');};
function setup(){sel.replaceChildren();for(const g of goals){const op=document.createElement('option');op.value=g.id;op.textContent=g.platform.toUpperCase()+' · '+g.title;sel.append(op);}}
function edit(sign){const g=goals.find(x=>x.id===sel.value);if(!g)return;g.current=Math.max(0,g.current+sign*(Math.max(1,Number(amount.value)||1)));send({action:'update',id:g.id,current:g.current});}
document.querySelector('#prev').onclick=()=>send({action:'prev'});
document.querySelector('#next').onclick=()=>send({action:'next'});
document.querySelector('#background').onclick=()=>document.querySelector('#scene').classList.toggle('light');
document.querySelector('#increase').onclick=()=>edit(1);
document.querySelector('#decrease').onclick=()=>edit(-1);
document.querySelector('#reset').onclick=()=>{goals=JSON.parse(original);setup();send({action:'set-goals',goals});};
frame.addEventListener('load',()=>{ready=true;send({action:'set-goals',goals});});
setup();
})();