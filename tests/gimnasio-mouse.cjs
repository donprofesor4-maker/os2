const assert=require('node:assert/strict');const M=require('../actividades/gimnasio-mouse/engine.js');
let deliveries=0;
for(const l of M.dragLevels){for(const item of l.items){assert.equal(M.dropResult(l,item.id,item.start,item.start).ok,false,'Un clic no equivale a arrastrar');assert.equal(M.dropResult(l,item.id,item.start,[...item.target]).ok,true);const wrong=l.items.find(x=>x.id!==item.id);assert.equal(M.dropResult(l,item.id,item.start,wrong.target).ok,false);const margin=(l.size-l.itemSize-16)/2;assert(M.dropResult(l,item.id,item.start,[item.target[0]+margin,item.target[1]]).ok);assert.equal(M.dropResult(l,item.id,item.start,[item.target[0]+margin+1,item.target[1]]).ok,false,'El objeto entero debe caber');deliveries++;}}
assert(M.dragLevels.at(-1).size<M.dragLevels[0].size);assert.equal(M.dropResult(M.dragLevels[0],99,[0,0],[700,100]).ok,false);
for(const [i,l]of M.pathLevels.entries()){
const r=new M.Route(l);assert.equal(r.finish(l.points.at(-1)),false);assert.equal(r.begin(l.points[1]),false);assert(r.begin(l.points[0]));const shortcut=r.move(l.points.at(-1));assert.equal(shortcut.ok,false,'Un salto recto a la meta no completa el recorrido');assert.equal(r.phase,'resume');assert.equal(r.anchor,0);assert(r.begin(l.points[0]));
for(let n=1;n<l.points.length;n++){const result=r.move(l.points[n]);assert(result.ok,'Se puede recorrer el camino '+i+' en orden');if(n===1&&n<l.points.length-1){const anchor=r.anchor;assert.equal(anchor,1);assert(r.fail());assert.equal(r.anchor,anchor);assert.equal(r.begin(l.points[0]),false);assert(r.begin(l.points[anchor]));}}
assert.equal(r.phase,'finish');assert.equal(r.finish([0,0]),false);assert(r.finish(l.points.at(-1)));assert.equal(r.phase,'won');assert.equal(r.finish(l.points.at(-1)),false);assert.equal(r.errors,2);
const edge=new M.Route(l);edge.begin(l.points[0]);assert.equal(edge.move([l.points[0][0],l.points[0][1]+l.width+100]).ok,false);assert.equal(edge.phase,'resume');
}
assert(M.pathLevels.at(-1).width<M.pathLevels[0].width);assert.equal(M.segmentDistance([5,3],[0,0],[10,0]),3);
console.log(`PASS: ${deliveries} entregas en seis niveles, seis rutas, casillas completas, rechazo de clics y atajos, paradas en orden, recuperación y confirmación de meta.`);
