/* ══════════ Background games: shared games ══════════
   Factories for games more than one course uses. Each returns a GAMES entry.
   Transform Match (MHF4U, MCR3U), Circle Click (both, radians or degrees),
   Mirror (both, inverses) and Tangent Tap (MHF4U rates, MCV4U derivatives). */
const GSHARED=(function(){
"use strict";
const TAU=Math.PI*2;
/* ── parent functions for Transform Match ── */
const PARENTS={
  sq:{name:"x²",f:x=>x*x,eq:(A,K,D,C)=>A+"("+inner(K,D)+")²"+C},
  rt:{name:"√x",f:x=>x<0?NaN:Math.sqrt(x),eq:(A,K,D,C)=>A+"√("+inner(K,D)+")"+C},
  ab:{name:"|x|",f:x=>Math.abs(x),eq:(A,K,D,C)=>A+"|"+inner(K,D)+"|"+C},
  cu:{name:"x³",f:x=>x*x*x,eq:(A,K,D,C)=>A+"("+inner(K,D)+")³"+C},
  ex:{name:"2ˣ",f:x=>Math.pow(2,x),eq:(A,K,D,C)=>(A?A+"·":"")+(inner(K,D)==="x"?"2ˣ":"2^("+inner(K,D)+")")+C},
  sinr:{name:"sin x",f:x=>Math.sin(x),eq:(A,K,D,C)=>A+"sin("+inner(K,D)+")"+C,xr:[-7,7]},
  sind:{name:"sin x",f:x=>Math.sin(x*Math.PI/180),eq:(A,K,D,C)=>A+"sin("+inner(K,D,true)+")"+C,deg:true},
  re:{name:"1/x",f:x=>1/x,eq:(A,K,D,C)=>(A||"1")+"/("+inner(K,D)+")"+C},
  lg:{name:"log₂x",f:x=>x<=0?NaN:Math.log2(x),eq:(A,K,D,C)=>A+"log₂("+inner(K,D)+")"+C},
};
function inner(K,D,deg){const d=D?(D<0?" + "+(-D):" − "+D)+(deg?"°":""):"";return K===1?"x"+d:D?K+"(x"+d+")":K+"x"}
function astr(a){return a===1?"":a===-1?"−":String(a).replace("-","−")}
function cstr(c){return c?(c<0?" − "+(-c):" + "+c):""}
function kstr(k){return k===.5?"½":k===.25?"¼":String(k)}
function eqn(P,a,k,d,c){return "y = "+P.eq(astr(a),k===1?1:kstr(k),d,cstr(c))}
function gTransform(o){
  const keys=o.parents,deg=!!o.deg;
  return{id:"transform",title:"Transform Match",how:"Slide a, k, d and c until your curve lies on the target. The dashed curve is the parent.",h:270,
    kinds:o.kinds||["transform"],
    round(api){
      const P=PARENTS[api.pick(keys)],n=Math.min(1+Math.floor((api.i-1)/3),3);
      const tgt={a:1,k:1,d:0,c:0},which=api.shuffle(["a","k","d","c"]).slice(0,n);
      which.forEach(w=>{if(w==="a")tgt.a=api.pick([-3,-2,-1,-.5,.5,2,3]);if(w==="k")tgt.k=api.pick(P.deg?[.5,2]:[.5,2,3]);if(w==="d")tgt.d=api.pick(P.deg?[-90,-60,-30,30,60,90]:[-3,-2,-1,1,2,3]);if(w==="c")tgt.c=api.pick([-3,-2,-1,1,2,3])});
      const T=x=>tgt.a*P.f(tgt.k*(x-tgt.d))+tgt.c,xr=P.deg?[-360,360]:(P.xr||[-6,6]),yr=[-5,5];
      let g,cur={a:1,k:1,d:0,c:0};
      const C=api.C;
      function redraw(v,done){
        api.clear();g=api.grid({xr,yr,step:P.deg?30:1,lab:P.deg?90:1,square:false});
        api.plot(P.f,g,C.t3,1.4,[4,4]);api.plot(T,g,C.acc,2.6,null,null,null,P.deg?240:200);
        if(v)api.plot(x=>v.a*P.f(v.k*(x-v.d))+v.c,g,done?C.ok:C.ink,2.2,null,null,null,P.deg?240:200);
        api.text("y = "+P.name,10,14,{size:11,color:C.t3,italic:true});
        if(v)api.text(eqn(P,v.a,v.k,v.d,v.c),10,api.H-8,{size:11,color:done?C.ok:C.ink,halo:C.halo});
        if(done)api.text("target "+eqn(P,tgt.a,tgt.k,tgt.d,tgt.c),api.W-10,14,{size:11,color:C.acc,align:"right"});
      }
      api.q(`Match the <b>bold</b> curve. ${n===1?"One":n===2?"Two":"Three"} of a, k, d, c changed.`);
      const ks=P.deg?[.5,1,2]:[.5,1,2,3];
      api.sliders({params:[
        {k:"a",label:"a (stretch, flip)",min:-3,max:3,step:.5,val:1,fmt:v=>api.neg(v)},
        {k:"ki",label:"k (horizontal)",min:0,max:ks.length-1,step:1,val:ks.indexOf(1),fmt:v=>kstr(ks[v])},
        {k:"d",label:"d (shift right)",min:P.deg?-90:-3,max:P.deg?90:3,step:P.deg?30:1,val:0,fmt:v=>api.neg(v)+(P.deg?"°":"")},
        {k:"c",label:"c (shift up)",min:-3,max:3,step:1,val:0,fmt:v=>api.neg(v)}],
        on(v){cur={a:v.a,k:ks[v.ki],d:v.d,c:v.c};redraw(cur,false)},
        score(v){const u={a:v.a,k:ks[v.ki],d:v.d,c:v.c};let err=0,m=0;
          for(let i=0;i<=60;i++){const x=xr[0]+(xr[1]-xr[0])*i/60,y1=T(x),y2=u.a*P.f(u.k*(x-u.d))+u.c;if(!isFinite(y1)||!isFinite(y2)||Math.abs(y1)>6||Math.abs(y2)>6)continue;err+=Math.abs(y1-y2);m++}
          if(!m)return 0;err/=m;return err<.04?1:api.clamp((.6-err),0,.6)},
        msg(v,sc){return sc>=.999?"":"target: <b>"+eqn(P,tgt.a,tgt.k,tgt.d,tgt.c)+"</b>"},
        reveal(){redraw(cur,true)}});
    }};
}
/* ── Circle Click: click the point on the unit circle ── */
const RAD=[[0,"0"],[1,"π/6"],[2,"π/4"],[3,"π/3"],[4,"π/2"],[5,"2π/3"],[6,"3π/4"],[7,"5π/6"],[8,"π"],[9,"7π/6"],[10,"5π/4"],[11,"4π/3"],[12,"3π/2"],[13,"5π/3"],[14,"7π/4"],[15,"11π/6"]];
const ANG=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
const EXACT={0:["1","0"],30:["√3/2","1/2"],45:["√2/2","√2/2"],60:["1/2","√3/2"],90:["0","1"]};
function exact(deg){const r=((deg%360)+360)%360,q=r%90,base=q===0&&r%180===0?EXACT[0]:q===0?EXACT[90]:EXACT[q]||null;
  if(!base)return null;const c=Math.cos(r*Math.PI/180),s=Math.sin(r*Math.PI/180);
  let cs=r%180===0?base[0]:r%90===0?"0":base[0],ss=r%180===0?"0":r%90===0?base[1]:base[1];
  if(c<-1e-9&&cs!=="0")cs="−"+cs;if(s<-1e-9&&ss!=="0")ss="−"+ss;return[cs,ss]}
function gCircle(o){
  const deg=!!o.deg;
  return{id:"circle",title:deg?"Angle Click":"Radian Click",how:"Click the point on the unit circle the clue describes. Within about 10° counts.",h:280,kinds:o.kinds||["circle"],
    round(api){
      const C=api.C,i=api.pick([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]),a=ANG[i],lab=deg?a+"°":RAD[i][1];
      const kind=api.i<=3?"angle":api.pick(["angle","exact","exact","neg"]);
      let ta=a,q;
      if(kind==="angle")q=`Click the point at θ = <b>${lab}</b>.`;
      else if(kind==="neg")q=`Click the point at θ = <b>−${deg?(360-a)+"°":RAD[16-i][1]}</b>.`;
      else{const ex=exact(a);const which=api.pick(["sin","cos"]);const v=which==="sin"?ex[1]:ex[0];const other=which==="sin"?(Math.cos(a*Math.PI/180)>=0?"cos θ ≥ 0":"cos θ < 0"):(Math.sin(a*Math.PI/180)>=0?"sin θ ≥ 0":"sin θ < 0");
        q=`Click the point where <b>${which} θ = ${v}</b> and ${other}${a%90===0?"":""}.`;if(a%180===0&&which==="sin")q=`Click the point where <b>sin θ = 0</b> and ${Math.cos(a*Math.PI/180)>0?"cos θ > 0":"cos θ < 0"}.`;if(a%180===90&&which==="cos")q=`Click the point where <b>cos θ = 0</b> and ${Math.sin(a*Math.PI/180)>0?"sin θ > 0":"sin θ < 0"}.`}
      api.q(q);
      const R=Math.min(api.H/2-24,api.W/2-24),X=api.W/2,Y=api.H/2;
      function base(){api.clear();api.line(X-R-14,Y,X+R+14,Y,C.t3,1.2);api.line(X,Y-R-14,X,Y+R+14,C.t3,1.2);api.ring(X,Y,R,C.t2,1.6);
        for(let k=0;k<24;k++){const t=k*15*Math.PI/180,big=k%6===0;api.line(X+(R-(big?8:4))*Math.cos(t),Y-(R-(big?8:4))*Math.sin(t),X+R*Math.cos(t),Y-R*Math.sin(t),C.t4,1)}
        api.text(deg?"0°":"0",X+R+4,Y+12,{size:9,color:C.t3});api.text(deg?"90°":"π/2",X+4,Y-R-4,{size:9,color:C.t3});api.text(deg?"180°":"π",X-R-4,Y+12,{size:9,color:C.t3,align:"right"});api.text(deg?"270°":"3π/2",X+4,Y+R+12,{size:9,color:C.t3})}
      base();
      api.tap((x,y)=>{
        const th=Math.atan2(Y-y,x-X)*180/Math.PI,err=Math.abs(((th-ta)%360+540)%360-180),frac=err<=10?1:err<=20?.5:0;
        const t=ta*Math.PI/180,ex=exact(a);
        base();api.line(X,Y,X+R*Math.cos(Math.atan2(Y-y,x-X)),Y-R*Math.sin(Math.atan2(Y-y,x-X)),frac?C.ok:C.no,1.6,[3,4]);
        api.line(X,Y,X+R*Math.cos(t),Y-R*Math.sin(t),C.acc,2.2);api.dot(X+R*Math.cos(t),Y-R*Math.sin(t),5,C.acc);
        api.text(`(${ex[0]}, ${ex[1]})`,X+(R+12)*Math.cos(t)+(Math.cos(t)<0?-4:4),Y-(R+12)*Math.sin(t)+4,{size:11,color:C.acc,align:Math.cos(t)<-.1?"right":"left",halo:C.halo});
        api.answer(frac===1,frac,`θ = <b>${lab}</b>, you were ${Math.round(err)}° off`,()=>{});
      },(x,y)=>{base();if(x>-1e3)api.line(X,Y,X+R*Math.cos(Math.atan2(Y-y,x-X)),Y-R*Math.sin(Math.atan2(Y-y,x-X)),C.t3,1.4,[3,4])});
    }};
}
/* ── Mirror: the inverse is the reflection in y = x ── */
function gMirror(o){
  const FS=[{n:"2ˣ",f:x=>Math.pow(2,x),inv:y=>Math.log2(y),dom:[-5,2.3]},{n:"x³/4",f:x=>x*x*x/4,inv:y=>Math.cbrt(4*y),dom:[-2.7,2.7]},
    {n:"2√x",f:x=>x<0?NaN:2*Math.sqrt(x),inv:y=>y<0?NaN:y*y/4,dom:[0,5]},{n:"x² (x ≥ 0)",f:x=>x<0?NaN:x*x,inv:y=>y<0?NaN:Math.sqrt(y),dom:[0,2.3]},
    {n:"x/2 + 1",f:x=>x/2+1,inv:y=>2*(y-1),dom:[-5,5]},{n:"log₂x",f:x=>x<=0?NaN:Math.log2(x),inv:y=>Math.pow(2,y),dom:[.05,5]}];
  return{id:"mirror",title:"Mirror",how:"The inverse swaps x and y: every point (a, b) on f becomes (b, a) on f⁻¹. Click where the mirror point lands.",h:280,kinds:o&&o.kinds||["inverse"],
    round(api){
      const C=api.C,F=api.pick(FS),mode=api.i<=4?"pt":api.pick(["pt","read"]);
      let a,b;for(let t=0;t<40;t++){a=api.ri(Math.ceil(F.dom[0]),Math.floor(F.dom[1]));b=F.f(a);if(isFinite(b)&&Math.abs(b)<=5&&Math.abs(a)<=5&&(mode==="pt"||Math.abs(b-Math.round(b))<1e-9&&Math.round(b)!==a))break}
      b=Math.round(b*100)/100;
      const g=api.grid({xr:[-5,5],yr:[-5,5]});
      api.line(g.px(-5),g.py(-5),g.px(5),g.py(5),C.t4,1.2,[4,4]);api.text("y = x",g.px(4.3),g.py(4.6),{size:10,color:C.t3});
      api.plot(F.f,g,C.acc,2.4);api.text("y = "+F.n,10,14,{size:11,color:C.acc});
      let tx,ty;
      if(mode==="pt"){api.dot(g.px(a),g.py(b),5,C.acc);api.text(`P(${api.neg(a)}, ${api.fmt(b)})`,g.px(a)+8,g.py(b)-8,{size:11,color:C.acc,halo:C.halo});
        api.q(`P is on f. Click the point of <b>f⁻¹</b> that mirrors P.`);tx=b;ty=a}
      else{api.q(`Click the point of <b>f⁻¹</b> whose x-coordinate is <b>${api.fmt(b)}</b>. (Read f first.)`);tx=b;ty=a}
      api.tap((x,y)=>{
        const ux=g.xi(x),uy=g.yi(y),d=Math.hypot(ux-tx,uy-ty),frac=d<=.5?1:d<=1?.5:0;
        api.plot(F.inv,g,C.ok,2,[5,4]);api.dot(g.px(tx),g.py(ty),5,C.ok);api.dot(x,y,3.5,frac?C.ok:C.no);
        api.line(g.px(a),g.py(b),g.px(tx),g.py(ty),C.t3,1,[3,4]);
        api.text(`(${api.fmt(tx)}, ${api.neg(ty)})`,g.px(tx)+8,g.py(ty)+14,{size:11,color:C.ok,halo:C.halo});
        api.answer(frac===1,frac,`the mirror point is <b>(${api.fmt(tx)}, ${api.neg(ty)})</b>`,()=>{});
      });
    }};
}
/* ── Tangent Tap: set the slope of the line through the point ── */
function gTangent(o){
  const CURVES=[{n:"f(x) = x²/3 − 1",f:x=>x*x/3-1,d:x=>2*x/3},{n:"f(x) = 0.2x³ − x",f:x=>.2*x*x*x-x,d:x=>.6*x*x-1},{n:"f(x) = 2 sin x",f:x=>2*Math.sin(x),d:x=>2*Math.cos(x)},
    {n:"f(x) = 2ˣ/2 − 2",f:x=>Math.pow(2,x)/2-2,d:x=>Math.pow(2,x)/2*Math.LN2},{n:"f(x) = 3 − x²/4",f:x=>3-x*x/4,d:x=>-x/2},{n:"f(x) = 4/(x² + 1)",f:x=>4/(x*x+1),d:x=>-8*x/((x*x+1)*(x*x+1))}];
  return{id:"tangent",title:"Tangent Tap",how:"Turn the line until it just touches the curve at the point. Its slope is the instantaneous rate of change there.",h:270,kinds:o&&o.kinds||["rates"],
    round(api){
      const C=api.C,cv=api.pick(CURVES),avg=o&&o.avg&&api.i>2&&Math.random()<.3;
      let x0,x1;for(let t=0;t<60;t++){x0=api.ri(-6,6)/2;x1=x0+api.pick([1,1.5,2,3]);if(Math.abs(cv.f(x0))<3.4&&Math.abs(cv.d(x0))<=4&&(!avg||(Math.abs(cv.f(x1))<3.4&&x1<=4.5)))break}
      const y0=cv.f(x0),m=avg?(cv.f(x1)-y0)/(x1-x0):cv.d(x0);
      api.q(avg?`Set the slope of the line through <b>both points</b>: the average rate of change on [${api.neg(x0)}, ${api.neg(x1)}].`:`Set the slope of the <b>tangent</b> at x = ${api.neg(x0)}.`);
      let g;
      function redraw(mm,done){
        api.clear();g=api.grid({xr:[-5,5],yr:[-4,4]});api.plot(cv.f,g,C.acc,2.4);api.text(cv.n,10,14,{size:11,color:C.acc});
        const col=done?C.ok:C.ink;
        api.line(g.px(-6),g.py(y0+mm*(-6-x0)),g.px(6),g.py(y0+mm*(6-x0)),col,1.8);
        if(done){api.line(g.px(-6),g.py(y0+m*(-6-x0)),g.px(6),g.py(y0+m*(6-x0)),C.ok,2.2,[6,4])}
        const dx=1;api.line(g.px(x0),g.py(y0),g.px(x0+dx),g.py(y0),C.t3,1,[2,3]);api.line(g.px(x0+dx),g.py(y0),g.px(x0+dx),g.py(y0+mm*dx),C.t3,1,[2,3]);
        api.dot(g.px(x0),g.py(y0),5,C.acc);if(avg)api.dot(g.px(x1),g.py(cv.f(x1)),5,C.acc);
        api.text("m = "+api.fmt(mm,1),g.px(x0+dx)+6,g.py(y0+mm*dx/2)+4,{size:11,color:col,halo:C.halo});
        if(done)api.text("true slope "+api.fmt(m,2),api.W-10,api.H-8,{size:11,color:C.ok,align:"right"});
      }
      let last=0;
      api.slider({label:"slope m",min:-5,max:5,step:.1,val:0,fmt:v=>api.fmt(v,1),on(v){last=v;redraw(v,false)},
        score(v){const err=Math.abs(v-m);return err<=.3?1:api.clamp(1-(err-.3)/1.2,0,.8)},
        msg(v,sc){return `the slope is <b>${api.fmt(m,2)}</b>; you set ${api.fmt(v,1)}`},reveal(){redraw(last,true)}});
    }};
}
return{gTransform,gCircle,gMirror,gTangent,PARENTS,eqn};
})();

/* ══════════ MDM4U background games ══════════
   Guess the r (scatter, leastsq), Shade Guess on the normal curve plus
   median and skew reads (normal, clt, galton, hist, box) and Prob Press
   (coins, pascal, dice, venn, tree, spinner). */
const GAMES=(function(){
"use strict";
function gauss(){let s=0;for(let i=0;i<12;i++)s+=Math.random();return s-6}
function erf(x){const t=1/(1+.3275911*Math.abs(x)),y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x);return x<0?-y:y}
const Phi=z=>.5*(1+erf(z/Math.SQRT2));
const C_=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)};
const CORR={id:"corr",title:"Guess the r",how:"Slide to the correlation coefficient you think this scatter plot has. Within 0.1 is a hit.",h:260,kinds:["scatter","leastsq"],
  round(api){
    const C=api.C,target=api.pick([-.95,-.85,-.7,-.5,-.3,0,.3,.5,.7,.85,.95]),n=30,pts=[];
    for(let i=0;i<n;i++){const x=gauss(),y=target*x+Math.sqrt(1-target*target)*gauss();pts.push({x,y})}
    const mx=pts.reduce((s,p)=>s+p.x,0)/n,my=pts.reduce((s,p)=>s+p.y,0)/n;let sxy=0,sxx=0,syy=0;pts.forEach(p=>{sxy+=(p.x-mx)*(p.y-my);sxx+=(p.x-mx)**2;syy+=(p.y-my)**2});
    const r=sxy/Math.sqrt(sxx*syy),b=sxy/sxx,a=my-b*mx;
    const g=api.grid({xr:[-3.2,3.2],yr:[-3.2,3.2],labels:false,lines:false});pts.forEach(p=>api.dot(g.px(p.x),g.py(p.y),3.6,C.acc));
    api.q("What is <b>r</b> for this scatter plot?");
    api.slider({label:"r",min:-1,max:1,step:.05,val:0,fmt:v=>api.fmt(v,2),score(v){const e=Math.abs(v-r);return e<=.1?1:api.clamp(1-(e-.1)/.4,0,.8)},
      msg(v){return `r = <b>${api.fmt(r,2)}</b>; you said ${api.fmt(v,2)}`},
      reveal(){api.line(g.px(-3),g.py(a-3*b),g.px(3),g.py(a+3*b),C.ok,2);api.text("r = "+api.fmt(r,2),api.W-10,16,{size:12,color:C.ok,align:"right"})}});
  }};
const CTX=[{n:"heights (cm)",m:170,s:8},{n:"test marks (%)",m:72,s:9},{n:"battery life (h)",m:50,s:6},{n:"commute (min)",m:34,s:7},{n:"apple mass (g)",m:150,s:12}];
const NORMAL={id:"normal",title:"Shade Guess",how:"Estimate the percent under the normal curve in the shaded part. Then read a median, or spot a skew.",h:230,kinds:["normal","clt","galton","hist","box"],
  round(api){
    const C=api.C,mode=api.i<=4?"shade":api.pick(["shade","median","skew"]);
    if(mode==="shade"){
      const c=api.pick(CTX),za=api.pick([-2,-1.5,-1,-.5,0,.5,1,1.5]),kind=api.pick(["below","above","between"]);const zb=kind==="between"?za+api.pick([.5,1,1.5,2]):null;
      const A=Math.round(c.m+za*c.s),B=zb==null?null:Math.round(c.m+zb*c.s),zA=(A-c.m)/c.s,zB=B==null?null:(B-c.m)/c.s;
      const pct=100*(kind==="below"?Phi(zA):kind==="above"?1-Phi(zA):Phi(zB)-Phi(zA));
      const g=api.grid({xr:[c.m-3.6*c.s,c.m+3.6*c.s],yr:[-.06,.45],lines:false,labels:false,square:false,pad:18});
      const pdf=x=>Math.exp(-.5*((x-c.m)/c.s)**2)/Math.sqrt(2*Math.PI);
      const lo=kind==="below"?c.m-3.6*c.s:A,hi=kind==="above"?c.m+3.6*c.s:(kind==="between"?B:A);
      api.cx.beginPath();api.cx.moveTo(g.px(lo),g.py(0));for(let i=0;i<=80;i++){const x=lo+(hi-lo)*i/80;api.cx.lineTo(g.px(x),g.py(pdf(x)))}api.cx.lineTo(g.px(hi),g.py(0));api.cx.closePath();api.cx.fillStyle=C.acc;api.cx.globalAlpha=.28;api.cx.fill();api.cx.globalAlpha=1;
      api.plot(pdf,g,C.acc,2.2);for(let k=-3;k<=3;k++){const x=c.m+k*c.s;api.line(g.px(x),g.py(0),g.px(x),g.py(0)-4,C.t3,1);api.text(String(x),g.px(x),g.py(0)+13,{size:9,color:k===0?C.ink:C.t3,align:"center"})}
      api.text(`${c.n}: μ = ${c.m}, σ = ${c.s}`,10,14,{size:11,color:C.t2});
      api.q(`What <b>percent</b> is ${kind==="below"?"below "+A:kind==="above"?"above "+A:"between "+A+" and "+B}?`);
      api.slider({label:"percent",min:0,max:100,step:1,val:50,fmt:v=>v+"%",score(v){const e=Math.abs(v-pct);return e<=3?1:api.clamp(1-(e-3)/15,0,.8)},
        msg(v){return `<b>${api.fmt(pct,1)}%</b> · z ${kind==="between"?api.fmt(zA,2)+" to "+api.fmt(zB,2):"= "+api.fmt(zA,2)}; you said ${v}%`},
        reveal(){api.text(api.fmt(pct,1)+"%",g.px((lo+hi)/2),g.py(.12),{size:14,bold:true,color:C.ink,align:"center",halo:C.halo})}});
    }else if(mode==="median"){
      const n=api.pick([9,11,13,15]),vals=[];for(let i=0;i<n;i++)vals.push(api.clamp(Math.round(10+gauss()*3.2),0,20));vals.sort((a,b)=>a-b);const med=vals[(n-1)/2];
      const g=api.grid({xr:[-.5,20.5],yr:[-1,8],lines:false,square:false,axes:false,labels:false,pad:20});
      api.line(g.px(0),g.py(0),g.px(20),g.py(0),C.t3,1.3);for(let x=0;x<=20;x+=2)api.text(String(x),g.px(x),g.py(0)+13,{size:9,color:C.t3,align:"center"});
      const cnt={};vals.forEach(v=>{cnt[v]=(cnt[v]||0);api.dot(g.px(v),g.py(.6+cnt[v]*.9),5,C.acc);cnt[v]++});
      api.q(`${n} values. Click on the axis where the <b>median</b> is.`);
      api.tap((x,y)=>{const ux=g.xi(x),e=Math.abs(ux-med),frac=e<=.6?1:e<=1.5?.5:0;
        api.line(g.px(med),g.py(0),g.px(med),g.py(6.5),C.ok,2,[4,3]);api.text("median "+med,g.px(med),g.py(7),{size:11,color:C.ok,align:"center",halo:C.halo});api.dot(x,g.py(0),4,frac?C.ok:C.no);
        api.answer(frac===1,frac,`the middle value (the ${(n+1)/2}th of ${n}) is <b>${med}</b>`,()=>{})});
    }else{
      const skew=api.pick([-1,1,0]),vals=[];for(let i=0;i<60;i++){const u=skew===0?gauss()*1.3+6:(skew>0?-Math.log(Math.random())*1.8+1:11-(-Math.log(Math.random())*1.8));vals.push(api.clamp(Math.round(u),0,12))}
      const bins=new Array(13).fill(0);vals.forEach(v=>bins[v]++);const mean=vals.reduce((s,v)=>s+v,0)/60,sorted=vals.slice().sort((a,b)=>a-b),med=(sorted[29]+sorted[30])/2;
      const g=api.grid({xr:[-.5,12.5],yr:[0,Math.max(...bins)*1.15],lines:false,labels:false,square:false,pad:20,axes:false});
      api.line(g.px(-.5),g.py(0),g.px(12.5),g.py(0),C.t3,1.3);bins.forEach((b,k)=>{api.cx.fillStyle=C.acc;api.cx.globalAlpha=.75;api.cx.fillRect(g.px(k-.45),g.py(b),g.px(k+.45)-g.px(k-.45),g.py(0)-g.py(b));api.cx.globalAlpha=1});
      api.q("For this distribution, how do the <b>mean</b> and <b>median</b> compare?");
      const d=mean-med,ans=Math.abs(d)<.25?"close":d>0?"mean>":"mean<";
      api.choices([{t:"mean > median (tail pulls it right)",ok:ans==="mean>"},{t:"mean < median (tail pulls it left)",ok:ans==="mean<"},{t:"about the same (symmetric)",ok:ans==="close"}],{keep:true,one:true,msg:`mean ${api.fmt(mean,1)}, median ${api.fmt(med,1)}`,
        reveal(){api.line(g.px(mean),g.py(0),g.px(mean),g.py(g.yr[1]*.9),C.ok,2);api.text("mean",g.px(mean),g.py(g.yr[1]*.95),{size:10,color:C.ok,align:"center"});api.line(g.px(med),g.py(0),g.px(med),g.py(g.yr[1]*.7),C.ink,2,[4,3]);api.text("median",g.px(med),g.py(g.yr[1]*.75),{size:10,color:C.ink,align:"center",halo:C.halo})}});
    }
  }};
const PROB={id:"prob",title:"Prob Press",how:"Dice, coins, spinners, Venn diagrams, trees and Pascal's triangle. Pick the probability (or the count).",h:150,kinds:["coins","pascal","dice","venn","tree","spinner"],
  round(api){
    const C=api.C,k=api.pick(["dice","coins","spinner","pascal","venn","tree"]),X=api.W/2,Y=api.H/2;
    const distinct=list=>{const seen=new Set();return list.filter(o=>{if(seen.has(o.t))return false;seen.add(o.t);return true})};
    if(k==="dice"){const s=api.ri(2,12),ways=6-Math.abs(s-7);
      const pip=(x,y,n)=>{api.cx.strokeStyle=C.t2;api.cx.lineWidth=1.5;api.cx.strokeRect(x-18,y-18,36,36);const P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[n];P.forEach(([a,b])=>api.dot(x+a*9,y+b*9,3,C.acc))};
      const a=api.ri(1,6),b=api.ri(1,6);pip(X-30,Y,a);pip(X+30,Y,b);
      api.q(`Two fair dice are rolled. <b>P(sum = ${s})</b>?`);
      api.choices(distinct([{t:api.frac(ways,36),ok:true},{t:api.frac(ways+1,36),ok:false},{t:api.frac(Math.max(1,ways-1),36),ok:false},{t:api.frac(ways,12),ok:false},{t:"1/11",ok:false}]).slice(0,4),{msg:`${ways} of the 36 equally likely pairs add to ${s}`});}
    else if(k==="coins"){const n=api.pick([3,4,5]),h=api.ri(0,n),ways=C_(n,h),tot=Math.pow(2,n);
      for(let i=0;i<n;i++){api.ring(X+(i-(n-1)/2)*40,Y,15,C.acc,2);api.text(i<h?"H":"T",X+(i-(n-1)/2)*40,Y+4,{size:12,bold:true,color:C.t2,align:"center"})}
      api.q(`A fair coin is flipped ${n} times. <b>P(exactly ${h} head${h===1?"":"s"})</b>?`);
      api.choices(distinct([{t:api.frac(ways,tot),ok:true},{t:api.frac(h||1,n),ok:false},{t:api.frac(ways+1,tot),ok:false},{t:api.frac(1,tot),ok:false},{t:api.frac(Math.max(1,ways-1),tot),ok:false}]).slice(0,4),{msg:`C(${n}, ${h}) = ${ways} of ${tot} outcomes`});}
    else if(k==="spinner"){const parts=api.pick([[4,2,1,1],[3,3,1,1],[2,1,1],[4,3,1],[2,2,1,1,1,1]]),tot=parts.reduce((s,v)=>s+v,0),names=["red","blue","green","gold","grey","teal"],pal=[C.acc,C.t2,C.ok,"#c9a227",C.t4,"#0e7490"];
      let ang=-Math.PI/2;const R=Math.min(api.H/2-10,60);parts.forEach((p,i)=>{api.cx.beginPath();api.cx.moveTo(X,Y);api.cx.arc(X,Y,R,ang,ang+p/tot*6.2832);api.cx.closePath();api.cx.fillStyle=pal[i];api.cx.globalAlpha=.8;api.cx.fill();api.cx.globalAlpha=1;api.cx.strokeStyle="#fff";api.cx.lineWidth=1.5;api.cx.stroke();
        api.text(names[i],X+(R+22)*Math.cos(ang+p/tot*3.1416),Y+(R+22)*Math.sin(ang+p/tot*3.1416)+4,{size:10,color:C.t2,align:"center"});ang+=p/tot*6.2832});
      const i=api.ri(0,parts.length-1),two=Math.random()<.4,j=(i+1)%parts.length;
      api.q(two?`The spinner is spun twice. <b>P(${names[i]} then ${names[j]})</b>?`:`The spinner is spun once. <b>P(${names[i]})</b>?`);
      const ok=two?api.frac(parts[i]*parts[j],tot*tot):api.frac(parts[i],tot);
      api.choices(distinct([{t:ok,ok:true},{t:api.frac(1,parts.length),ok:false},{t:two?api.frac(parts[i]+parts[j],tot*2):api.frac(parts[i]+1,tot),ok:false},{t:two?api.frac(parts[i]*parts[j],tot):api.frac(parts[i],tot+1),ok:false},{t:api.frac(tot-parts[i],tot),ok:false}]).slice(0,4),{msg:two?"independent spins multiply":`${parts[i]} of ${tot} equal sectors`});}
    else if(k==="pascal"){const n=api.ri(4,8),r=api.ri(1,n-1),v=C_(n,r);api.canvas(0);
      const which=api.pick(["c","row"]);
      if(which==="c"){api.q(`In Pascal's triangle, the entry in row ${n}, position ${r} (both counted from 0) is <b>C(${n}, ${r})</b>. Its value?`);
        api.choices(distinct([{t:String(v),ok:true},{t:String(C_(n,r)+C_(n-1,r-1)),ok:false},{t:String(C_(n+1,r)),ok:false},{t:String(n*r),ok:false}]),{msg:`C(${n}, ${r}) = C(${n-1}, ${r-1}) + C(${n-1}, ${r})`});}
      else{api.q(`What is the <b>sum</b> of the entries in row ${n} of Pascal's triangle?`);api.choices(distinct([{t:String(Math.pow(2,n)),ok:true},{t:String(Math.pow(2,n-1)),ok:false},{t:String(n*n),ok:false},{t:String(Math.pow(2,n+1)),ok:false}]),{msg:"each row doubles: 2ⁿ"});}}
    else if(k==="venn"){const N=api.pick([30,40,50]),both=api.ri(3,10),A=both+api.ri(5,14),B=both+api.ri(5,14),nei=N-(A+B-both);if(nei<0){return PROB.round(api)}
      const R=Math.min(api.H/2-8,52);api.ring(X-26,Y,R,C.acc,2);api.ring(X+26,Y,R,C.t2,2);api.text(String(A-both),X-46,Y+4,{size:12,color:C.acc,align:"center"});api.text(String(both),X,Y+4,{size:12,color:C.ink,align:"center"});api.text(String(B-both),X+46,Y+4,{size:12,color:C.t2,align:"center"});api.text(String(nei),X+R+40,Y+R-2,{size:11,color:C.t3});
      api.text("A",X-26-R*.7,Y-R*.75,{size:11,color:C.acc});api.text("B",X+26+R*.7,Y-R*.75,{size:11,color:C.t2,align:"right"});
      const which=api.pick(["or","notA","onlyB"]);api.q(`${N} students. ${A} are in A, ${B} in B, ${both} in both. One is picked at random. <b>P(${which==="or"?"A or B":which==="notA"?"not A":"B only"})</b>?`);
      const ok=which==="or"?api.frac(A+B-both,N):which==="notA"?api.frac(N-A,N):api.frac(B-both,N);
      api.choices(distinct([{t:ok,ok:true},{t:api.frac(A+B,N),ok:false},{t:api.frac(both,N),ok:false},{t:api.frac(A,N),ok:false},{t:api.frac(B,N),ok:false}]).slice(0,4),{msg:which==="or"?"n(A or B) = n(A) + n(B) − n(both)":which==="notA"?`${N} − ${A} are not in A`:`B only = ${B} − ${both}`});}
    else{const r=api.ri(3,6),b=api.ri(2,5),T=r+b,which=api.pick(["rr","rb","atleast"]);
      api.line(X-80,Y,X-20,Y-35,C.t2,1.5);api.line(X-80,Y,X-20,Y+35,C.t2,1.5);api.text("R "+api.frac(r,T),X-55,Y-26,{size:10,color:C.acc});api.text("B "+api.frac(b,T),X-55,Y+36,{size:10,color:C.t2});
      api.line(X-20,Y-35,X+40,Y-50,C.t2,1.5);api.line(X-20,Y-35,X+40,Y-20,C.t2,1.5);api.text("R "+api.frac(r-1,T-1),X+6,Y-50,{size:10,color:C.acc});api.text("B "+api.frac(b,T-1),X+6,Y-18,{size:10,color:C.t2});
      api.line(X-20,Y+35,X+40,Y+20,C.t2,1.5);api.line(X-20,Y+35,X+40,Y+50,C.t2,1.5);api.text("R "+api.frac(r,T-1),X+6,Y+22,{size:10,color:C.acc});api.text("B "+api.frac(b-1,T-1),X+6,Y+54,{size:10,color:C.t2});
      api.q(`A bag has ${r} red and ${b} blue marbles. Two are drawn <b>without replacement</b>. <b>P(${which==="rr"?"both red":which==="rb"?"red then blue":"at least one red"})</b>?`);
      const ok=which==="rr"?api.frac(r*(r-1),T*(T-1)):which==="rb"?api.frac(r*b,T*(T-1)):api.frac(T*(T-1)-b*(b-1),T*(T-1));
      api.choices(distinct([{t:ok,ok:true},{t:api.frac(r*r,T*T),ok:false},{t:api.frac(r*b,T*T),ok:false},{t:api.frac(r,T),ok:false},{t:api.frac(b*(b-1),T*(T-1)),ok:false}]).slice(0,4),{msg:which==="atleast"?"1 − P(both blue)":"multiply along the branch; the second fraction has one fewer marble"});}
  }};
return[CORR,NORMAL,PROB];
})();

/* ══════════ Background games: engine (shared) ══════════
   Every background vignette is a door: click one (or tap it on a phone) and
   a short game on the same idea opens in an overlay. A game is eight rounds;
   each round asks one thing, scores it, and shows the answer. The site's
   games file defines GAMES = [{id, title, how, kinds, h, round(api)}, ...];
   this file supplies the overlay, the round loop, the scoring and the
   drawing helpers, and the hook that finds which vignette was clicked. */
(function(){
"use strict";
if(typeof GAMES==="undefined"||!GAMES.length||typeof vigs==="undefined")return;
const SITE=(document.querySelector(".chip")||{textContent:"site"}).textContent.trim().toLowerCase();
const ROUNDS=8,MONO="'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace";
const KIND2GAME={};GAMES.forEach(g=>(g.kinds||[]).forEach(k=>KIND2GAME[k]=g));

/* ── overlay ── */
const ov=document.createElement("div");ov.id="gm";ov.hidden=true;
ov.innerHTML=`<div class="gm-card" role="dialog" aria-modal="true" aria-labelledby="gm-title" tabindex="-1">
  <div class="gm-head"><div><div class="gm-kicker">background game</div><h2 id="gm-title"></h2><p class="gm-how"></p></div>
  <button class="gm-x" aria-label="Close">×</button></div>
  <div class="gm-q"></div><canvas class="gm-cv"></canvas><div class="gm-ui"></div><div class="gm-fb"></div>
  <div class="gm-foot"><span class="gm-round"></span><span class="gm-score"></span><span class="gm-streak"></span><span class="gm-best"></span></div></div>`;
document.body.appendChild(ov);
const Q=s=>ov.querySelector(s),card=Q(".gm-card"),cvEl=Q(".gm-cv"),ctx=cvEl.getContext("2d"),ui=Q(".gm-ui"),fb=Q(".gm-fb"),qEl=Q(".gm-q");
const S={g:null,i:0,score:0,streak:0,right:0,t0:0,locked:false,open:false,lastFocus:null,tap:null,move:null,raf:0};

/* ── small helpers ── */
const rnd=(a,b)=>a+Math.random()*(b-a),ri=(a,b)=>Math.floor(rnd(a,b+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const neg=s=>String(s).replace(/-/g,"−");
const fmt=(x,d)=>{if(d==null)d=2;let s=(Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toString();if(s==="-0")s="0";return neg(s)};
const SUP="⁰¹²³⁴⁵⁶⁷⁸⁹",sup=n=>String(n).split("").map(c=>c==="-"?"⁻":SUP[+c]).join("");
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
function frac(n,d){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;n/=g;d/=g;return d===1?neg(n):neg(n)+"/"+d}
/* parse a typed number: "3/4", "-2.5", "1 1/2", "2,5" */
function num(s){
  s=String(s).trim().replace(/−/g,"-").replace(/,/g,".").replace(/\s+/g," ");
  let m=s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);if(m)return (m[1]?-1:1)*(+m[2]+m[3]/m[4]);
  m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);if(m&&+m[2]!==0)return +m[1]/+m[2];
  m=s.match(/^(-?)√(\d+)$/);if(m)return (m[1]?-1:1)*Math.sqrt(+m[2]);
  const v=parseFloat(s);return isNaN(v)?NaN:v;
}
const same=(a,b,tol)=>isFinite(a)&&Math.abs(a-b)<=(tol==null?1e-6:tol);
function best(id){return +localStorage.getItem("gm-"+SITE+"-"+id)||0}
function colors(){
  const s=getComputedStyle(document.documentElement),g=k=>s.getPropertyValue(k).trim();
  return{ink:g("--ink"),t2:g("--t2"),t3:g("--t3"),t4:g("--t4"),acc:g("--accent"),ok:g("--done")||"#1f8a63",no:g("--warn-fg")||"#b32642",
    grid:g("--bdr"),bdr:g("--bdr2"),bg:g("--bg"),halo:g("--bg"),pal:k=>"rgb("+g("--pal-"+k)+")"};
}

/* ── the api handed to each round ── */
const api={rnd,ri,pick,shuffle,clamp,neg,fmt,sup,frac,num,same,cx:ctx,W:0,H:0,C:null};
api.q=html=>{qEl.innerHTML=html};
api.canvas=function(h){
  if(!h){cvEl.hidden=true;api.W=api.H=0;return}
  cvEl.hidden=false;const w=card.clientWidth-parseFloat(getComputedStyle(card).paddingLeft)*2;
  const dpr=Math.min(window.devicePixelRatio||1,2);api.W=Math.round(w);api.H=h;
  cvEl.width=api.W*dpr;cvEl.height=h*dpr;cvEl.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,api.W,h);
  ctx.lineCap="round";ctx.lineJoin="round";
};
api.clear=()=>ctx.clearRect(0,0,api.W,api.H);
api.text=function(s,x,y,o){
  o=o||{};ctx.font=(o.italic?"italic ":"")+(o.bold?"600 ":"")+(o.size||12)+"px "+MONO;ctx.textAlign=o.align||"left";ctx.textBaseline=o.base||"alphabetic";
  ctx.fillStyle=o.color||api.C.ink;if(o.halo){ctx.lineWidth=4;ctx.strokeStyle=o.halo;ctx.lineJoin="round";ctx.strokeText(s,x,y)}ctx.fillText(s,x,y);ctx.textAlign="left";ctx.textBaseline="alphabetic";
};
api.dot=(x,y,r,c)=>{ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fillStyle=c;ctx.fill()};
api.ring=(x,y,r,c,w)=>{ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.strokeStyle=c;ctx.lineWidth=w||1.5;ctx.stroke()};
api.line=(x1,y1,x2,y2,c,w,dash)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=c;ctx.lineWidth=w||1.5;if(dash)ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([])};
api.arrow=function(x1,y1,x2,y2,c,w){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<1)return;
  api.line(x1,y1,x2,y2,c,w||2);const ux=dx/L,uy=dy/L,hs=Math.min(10,L*.4);
  ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-ux*hs-uy*hs*.45,y2-uy*hs+ux*hs*.45);ctx.lineTo(x2-ux*hs+uy*hs*.45,y2-uy*hs-ux*hs*.45);ctx.closePath();ctx.fillStyle=c;ctx.fill();
};
/* a Cartesian grid: o.xr/o.yr ranges, o.step grid spacing, o.square = same scale both ways; returns px,py,xi,yi */
api.grid=function(o){
  o=o||{};const xr=o.xr||[-5,5],yr=o.yr||[-5,5],pad=o.pad==null?14:o.pad,st=o.step||1,C=api.C;
  let sx=(api.W-2*pad)/(xr[1]-xr[0]),sy=(api.H-2*pad)/(yr[1]-yr[0]);
  if(o.square!==false){const s=Math.min(sx,sy);sx=sy=s}
  const ox=pad+(api.W-2*pad-sx*(xr[1]-xr[0]))/2,oy=pad+(api.H-2*pad-sy*(yr[1]-yr[0]))/2;
  const px=x=>ox+(x-xr[0])*sx,py=y=>oy+(yr[1]-y)*sy,xi=X=>xr[0]+(X-ox)/sx,yi=Y=>yr[1]-(Y-oy)/sy;
  if(o.lines!==false){ctx.strokeStyle=C.grid;ctx.lineWidth=1;
    for(let x=Math.ceil(xr[0]/st)*st;x<=xr[1]+1e-9;x+=st){ctx.beginPath();ctx.moveTo(px(x),py(yr[0]));ctx.lineTo(px(x),py(yr[1]));ctx.stroke()}
    for(let y=Math.ceil(yr[0]/st)*st;y<=yr[1]+1e-9;y+=st){ctx.beginPath();ctx.moveTo(px(xr[0]),py(y));ctx.lineTo(px(xr[1]),py(y));ctx.stroke()}}
  if(o.axes!==false){ctx.strokeStyle=C.t3;ctx.lineWidth=1.3;
    if(yr[0]<=0&&yr[1]>=0){ctx.beginPath();ctx.moveTo(px(xr[0]),py(0));ctx.lineTo(px(xr[1]),py(0));ctx.stroke()}
    if(xr[0]<=0&&xr[1]>=0){ctx.beginPath();ctx.moveTo(px(0),py(yr[0]));ctx.lineTo(px(0),py(yr[1]));ctx.stroke()}}
  if(o.labels!==false){const lb=o.lab||(st>=1?st*(xr[1]-xr[0]>12?2:1):1);
    for(let x=Math.ceil(xr[0]/lb)*lb;x<=xr[1]+1e-9;x+=lb){if(Math.abs(x)<1e-9)continue;api.text(neg(+x.toFixed(2)),px(x),py(Math.max(yr[0],Math.min(yr[1],0)))+(yr[0]<=0?11:-3),{size:9,color:C.t3,align:"center"})}
    for(let y=Math.ceil(yr[0]/lb)*lb;y<=yr[1]+1e-9;y+=lb){if(Math.abs(y)<1e-9)continue;api.text(neg(+y.toFixed(2)),px(Math.max(xr[0],Math.min(xr[1],0)))-4,py(y)+3,{size:9,color:C.t3,align:"right"})}}
  return{px,py,xi,yi,xr,yr,sx,sy};
};
/* trace y = fn(x) over [a,b] through grid g; breaks at jumps */
api.plot=function(fn,g,c,w,dash,a,b,n){
  a=a==null?g.xr[0]:a;b=b==null?g.xr[1]:b;n=n||160;ctx.save();ctx.beginPath();ctx.rect(0,0,api.W,api.H);ctx.clip();
  ctx.beginPath();let pen=false,py0=0;
  for(let i=0;i<=n;i++){const x=a+(b-a)*i/n,y=fn(x);
    if(!isFinite(y)||Math.abs(y)>1e4){pen=false;continue}
    const X=g.px(x),Y=g.py(y);if(pen&&Math.abs(Y-py0)>api.H*1.5)pen=false;
    pen?ctx.lineTo(X,Y):ctx.moveTo(X,Y);pen=true;py0=Y}
  ctx.strokeStyle=c;ctx.lineWidth=w||2.2;if(dash)ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);ctx.restore();
};
/* controls */
function btn(label,cls,fn){const b=document.createElement("button");b.className=cls||"gm-btn";b.innerHTML=label;b.addEventListener("click",fn);return b}
api.choices=function(list,o){
  o=o||{};ui.className="gm-ui grid"+(o.one?" one":"");ui.innerHTML="";
  const items=list.map((it,i)=>typeof it==="string"?{t:it,ok:i===o.ok}:it),order=o.keep?items:shuffle(items);
  order.forEach((it,i)=>{const b=btn(`<span class="k">${i+1}</span>${it.t}`,"gm-ch",()=>{
    if(S.locked)return;b.classList.add("pick");
    const ok=!!it.ok;ui.querySelectorAll(".gm-ch").forEach(x=>{x.disabled=true;if(x._it.ok)x.classList.add("ok")});if(!ok)b.classList.add("no");
    api.answer(ok,ok?1:0,it.msg||o.msg||"",o.reveal)});b._it=it;ui.appendChild(b)});
};
api.input=function(o){
  ui.className="gm-ui";ui.innerHTML="";
  if(o.pre){const p=document.createElement("span");p.className="gm-pre";p.innerHTML=o.pre;ui.appendChild(p)}
  const inp=document.createElement("input");inp.className="gm-in";inp.placeholder=o.ph||"";inp.autocomplete="off";inp.spellcheck=false;inp.setAttribute("inputmode",o.mode||"text");ui.appendChild(inp);
  const go=()=>{if(S.locked)return;const v=inp.value.trim();if(!v)return;let r=o.check(v);if(r===true)r=1;if(r===false)r=0;
    inp.disabled=true;inp.classList.add(r>=.999?"ok":"no");api.answer(r>=.999,r,r>=.999?"":("answer: <b>"+o.ans+"</b>"+(o.why?" · "+o.why:"")),o.reveal)};
  inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go()}});
  ui.appendChild(btn("Check","gm-btn",go));setTimeout(()=>inp.focus(),30);return inp;
};
/* a slider plus a Lock in button; o.score(v) → 0..1 fraction; o.fmt(v) → readout; o.on(v) → redraw */
api.slider=function(o){
  ui.className="gm-ui";ui.innerHTML="";
  const wrap=document.createElement("div");wrap.className="gm-sl";const lab=document.createElement("label");const nm=document.createElement("span");nm.textContent=o.label||"";const val=document.createElement("b");lab.append(nm,val);
  const r=document.createElement("input");r.type="range";r.min=o.min;r.max=o.max;r.step=o.step||1;r.value=o.val==null?(o.min+o.max)/2:o.val;
  const upd=()=>{val.textContent=o.fmt?o.fmt(+r.value):r.value;if(o.on)o.on(+r.value)};r.addEventListener("input",upd);wrap.append(lab,r);ui.appendChild(wrap);
  ui.appendChild(btn(o.btn||"Lock in","gm-btn",()=>{if(S.locked)return;r.disabled=true;const v=+r.value,sc=clamp(o.score(v),0,1);api.answer(sc>=.999,sc,o.msg?o.msg(v,sc):"",o.reveal)}));
  upd();setTimeout(()=>r.focus(),30);return()=>+r.value;
};
/* several sliders (transform match): o.params [{k,label,min,max,step,val,fmt}], o.on(vals), o.score(vals) */
api.sliders=function(o){
  ui.className="gm-ui";ui.innerHTML="";const rs={};
  const vals=()=>{const v={};for(const k in rs)v[k]=+rs[k].value;return v};
  o.params.forEach(p=>{const wrap=document.createElement("div");wrap.className="gm-sl";const lab=document.createElement("label");const nm=document.createElement("span");nm.textContent=p.label;const val=document.createElement("b");lab.append(nm,val);
    const r=document.createElement("input");r.type="range";r.min=p.min;r.max=p.max;r.step=p.step||1;r.value=p.val;rs[p.k]=r;
    const upd=()=>{val.textContent=p.fmt?p.fmt(+r.value):neg(r.value);if(o.on)o.on(vals())};r.addEventListener("input",upd);wrap.append(lab,r);ui.appendChild(wrap);upd()});
  ui.appendChild(btn(o.btn||"Lock in","gm-btn",()=>{if(S.locked)return;for(const k in rs)rs[k].disabled=true;const v=vals(),sc=clamp(o.score(v),0,1);api.answer(sc>=.999,sc,o.msg?o.msg(v,sc):"",o.reveal)}));
  if(o.on)o.on(vals());return vals;
};
/* click on the canvas: fn(x,y) in CSS px; o.move(x,y) for a live preview */
api.tap=function(fn,move){S.tap=fn;S.move=move||null;cvEl.classList.add("tap");ui.className="gm-ui";ui.innerHTML="";
  const p=document.createElement("span");p.className="gm-pre";p.textContent="click on the graph";ui.appendChild(p)};
function cvPos(e){const r=cvEl.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return[(t.clientX-r.left)*api.W/r.width,(t.clientY-r.top)*api.H/r.height]}
cvEl.addEventListener("click",e=>{if(!S.tap||S.locked)return;const[x,y]=cvPos(e);const f=S.tap;S.tap=null;S.move=null;cvEl.classList.remove("tap");f(x,y)});
cvEl.addEventListener("mousemove",e=>{if(S.move&&!S.locked){const[x,y]=cvPos(e);S.move(x,y)}});
cvEl.addEventListener("mouseleave",()=>{if(S.move&&!S.locked)S.move(-1e4,-1e4)});

/* ── round loop and scoring ── */
function setFoot(){
  Q(".gm-round").innerHTML=S.i>ROUNDS?"done":`round <b>${S.i}</b>/${ROUNDS}`;Q(".gm-score").innerHTML=`score <b>${S.score}</b>`;
  Q(".gm-streak").innerHTML=S.streak>1?`streak <b>×${S.streak}</b>`:"";const b=best(S.g.id);Q(".gm-best").innerHTML=b?`best <b>${b}</b>`:"";
}
function reset(){S.locked=false;S.tap=null;S.move=null;cvEl.classList.remove("tap");ui.className="gm-ui";ui.innerHTML="";fb.className="gm-fb";fb.innerHTML="";qEl.innerHTML=""}
function next(){
  if(S.i>=ROUNDS)return finish();
  S.i++;api.i=S.i;reset();setFoot();S.t0=performance.now();
  api.C=colors();api.canvas(S.g.h==null?260:S.g.h);
  try{S.g.round(api)}catch(err){console.error(err);api.q("That round broke. Skipping it.");fb.innerHTML="";setTimeout(next,600)}
}
api.answer=function(ok,frac,msg,reveal){
  if(S.locked)return;S.locked=true;S.tap=null;S.move=null;cvEl.classList.remove("tap");
  const dt=performance.now()-S.t0;frac=clamp(frac==null?(ok?1:0):frac,0,1);
  let pts=Math.round(100*frac);if(ok){S.streak++;S.right++;pts+=Math.round(40*clamp(1-(dt-3000)/8000,0,1));if(S.streak>=3)pts+=25}else if(frac<.5)S.streak=0;
  S.score+=pts;setFoot();if(pts)Q(".gm-score").classList.add("gm-pop");setTimeout(()=>Q(".gm-score").classList.remove("gm-pop"),400);
  fb.className="gm-fb "+(ok?"ok":frac>=.5?"mid":"no");
  fb.innerHTML=(ok?"✓ +"+pts+(S.streak>=3?" streak bonus":""):frac>=.5?"close · +"+pts:"✗")+(msg?" <span>"+msg+"</span>":"");
  if(reveal)try{reveal(api)}catch(err){console.error(err)}
  if(ok&&!reveal)setTimeout(()=>{if(S.open&&S.locked)next()},900);
  else{const b=btn("Next ⏎","gm-btn",next);fb.appendChild(b);setTimeout(()=>b.focus(),20)}
};
function finish(){
  S.i=ROUNDS+1;reset();api.canvas(0);setFoot();
  const b=best(S.g.id),nb=S.score>b;if(nb)localStorage.setItem("gm-"+SITE+"-"+S.g.id,S.score);
  qEl.innerHTML=`<div class="gm-end"><div class="big">${S.score}</div><div class="sub">${S.right} of ${ROUNDS} right${nb?" · new best":b?" · best "+b:""}</div><div class="acts"></div></div>`;
  const acts=qEl.querySelector(".acts");acts.appendChild(btn("Play again","gm-btn",()=>start(S.g)));acts.appendChild(btn("Close","gm-btn ghost",close));
  const pb=document.createElement("div");pb.className="pb";GAMES.filter(g=>g!==S.g).forEach(g=>pb.appendChild(btn(g.title,"gm-btn ghost",()=>start(g))));acts.appendChild(pb);
  setFoot();
}
function start(g){
  S.g=g;S.i=0;S.score=0;S.streak=0;S.right=0;Q("#gm-title").textContent=g.title;Q(".gm-how").textContent=g.how||"";
  if(!S.open){S.open=true;S.lastFocus=document.activeElement;ov.hidden=false;document.body.classList.add("gm-open");setTimeout(()=>card.focus(),30)}
  next();
}
function close(){if(!S.open)return;S.open=false;ov.hidden=true;document.body.classList.remove("gm-open");reset();if(S.lastFocus&&S.lastFocus.focus)S.lastFocus.focus()}
Q(".gm-x").addEventListener("click",close);
ov.addEventListener("click",e=>{if(e.target===ov)close()});
document.addEventListener("keydown",e=>{
  if(!S.open)return;
  if(e.key==="Escape"){close();return}
  const inInput=e.target&&e.target.tagName==="INPUT"&&e.target.type!=="range";
  if(inInput)return;
  if(/^[1-6]$/.test(e.key)){const b=ui.querySelectorAll(".gm-ch")[+e.key-1];if(b&&!b.disabled){e.preventDefault();b.click()}}
  else if(e.key==="Enter"&&S.locked){const b=fb.querySelector(".gm-btn");if(b){e.preventDefault();b.click()}}
  else if(e.key==="Enter"&&!S.locked){const b=ui.querySelector(".gm-btn");if(b&&e.target.tagName!=="BUTTON"){e.preventDefault();b.click()}}
});
window.addEventListener("resize",()=>{if(S.open&&S.i>=1&&S.i<=ROUNDS&&!cvEl.hidden){/* a resize mid-round redraws by replaying the round */const g=S.g,i=S.i,sc=S.score,st=S.streak,r=S.right;S.i=i-1;S.score=sc;S.streak=st;S.right=r;next()}});
window.GM={open:start,games:GAMES,close};

/* ── the hook: which vignette is under a point on empty page ── */
/* clicks pass through blank table space inside an open unit; the row headers, links and controls keep their own jobs */
const BLOCK='a,button,input,select,textarea,label,.uhead,.hero,.sbar,.top-bar,.help,.fab,.tipwrap,#gm';
function vigAt(x,y){
  for(const v of vigs){if(!v)continue;
    const span=H+v.h+80,yy=(((v.y-SCY*.1)+v.h+40)%span+span)%span-v.h-40,m=14;
    if(x>=v.x-m&&x<=v.x+v.w+m&&y>=yy-m&&y<=yy+v.h+m+10)return{v,yy}}
  return null;
}
const emptyEl=el=>!!el&&!el.closest(BLOCK);
document.addEventListener("click",e=>{
  if(S.open||e.defaultPrevented||e.button)return;
  if(!emptyEl(e.target))return;
  const hit=vigAt(e.clientX,e.clientY);if(!hit)return;
  const g=KIND2GAME[hit.v.kind]||pick(GAMES);start(g);
});
})();
