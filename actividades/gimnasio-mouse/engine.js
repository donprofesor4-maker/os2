(function(root){'use strict';
const dragLevels=[
 ['Cada cosa en su lugar','Lleva los tres útiles a su casilla.',3,146,68],
 ['Ordena tu mochila','Las casillas son un poco más pequeñas.',3,132,64],
 ['La mesa de trabajo','Coloca cuatro útiles sin salirte de su casilla.',4,120,58],
 ['Prepara la clase','Mueve con calma y suelta dentro del borde.',4,108,52],
 ['Todo listo','Organiza cinco útiles. Cada uno tiene su lugar.',5,98,46],
 ['Manos expertas','Cinco entregas en casillas más pequeñas.',5,88,42]
].map(([title,brief,count,size,itemSize],i)=>({title,brief,size,itemSize,items:Array.from({length:count},(_,n)=>({id:n,name:['Libro','Lápiz','Regla','Tijeras','Pegamento'][n],start:[105+(n%2)*175,105+Math.floor(n/2)*180],target:count===3?[730,105+n*180]:[610+(n%2)*220,105+Math.floor(n/2)*180]}))}));
const pathLevels=[
 ['Paseo por el jardín',108,[[95,390],[420,390],[420,170],[850,170]]],
 ['El camino del río',92,[[90,150],[360,150],[360,420],[850,420]]],
 ['Visita a la biblioteca',80,[[90,440],[270,440],[270,150],[590,150],[590,370],[850,370]]],
 ['Entrega especial',68,[[90,420],[290,260],[490,420],[670,190],[850,190]]],
 ['La ruta de los exploradores',58,[[90,100],[300,100],[300,430],[570,430],[570,150],[850,150]]],
 ['Pulso de experto',48,[[90,430],[245,260],[410,430],[565,240],[720,400],[865,190]]]
].map(([title,width,points])=>({title,width,points}));
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function segmentDistance(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],len=dx*dx+dy*dy,t=len?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/len)):0;return distance(p,[a[0]+dx*t,a[1]+dy*t]);}
function dropResult(level,id,from,to){const item=level.items.find(x=>x.id===id);if(!item||!Array.isArray(from)||!Array.isArray(to)||!to.every(Number.isFinite))return {ok:false,reason:'invalid'};if(distance(from,to)<30)return {ok:false,reason:'move'};const margin=(level.size-level.itemSize-16)/2;return Math.abs(to[0]-item.target[0])<=margin&&Math.abs(to[1]-item.target[1])<=margin?{ok:true}:{ok:false,reason:'target'};}
class Route{
 constructor(level){this.level=level;this.next=1;this.anchor=0;this.phase='ready';this.cursor=[...level.points[0]];this.errors=0;this.starts=0;}
 begin(p){if(!['ready','resume'].includes(this.phase)||distance(p,this.level.points[this.anchor])>30)return false;this.cursor=[...this.level.points[this.anchor]];this.next=this.anchor+1;this.phase='moving';this.starts++;return true;}
 fail(){if(this.phase!=='moving')return false;this.errors++;this.phase='resume';this.cursor=[...this.level.points[this.anchor]];return true;}
 move(p){if(this.phase!=='moving'||!Array.isArray(p)||!p.every(Number.isFinite))return {ok:false};const old=[...this.cursor],steps=Math.max(1,Math.ceil(distance(old,p)/4));for(let n=1;n<=steps;n++){const sample=[old[0]+(p[0]-old[0])*n/steps,old[1]+(p[1]-old[1])*n/steps],a=this.level.points[this.next-1],b=this.level.points[this.next];if(segmentDistance(sample,a,b)>this.level.width/2-5){this.fail();return {ok:false,reason:'outside'};}this.cursor=sample;if(distance(sample,b)<=Math.max(12,this.level.width*.2)){this.anchor=this.next;if(this.next===this.level.points.length-1){this.phase='finish';this.cursor=[...b];return {ok:true,finish:true};}this.next++;}}
 return {ok:true};}
 finish(p){if(this.phase!=='finish'||distance(p,this.level.points.at(-1))>30)return false;this.phase='won';return true;}
}
const api={dragLevels,pathLevels,distance,segmentDistance,dropResult,Route};if(typeof module!=='undefined')module.exports=api;else root.MouseGym=api;
})(globalThis);
