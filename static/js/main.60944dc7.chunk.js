/*! For license information please see main.60944dc7.chunk.js.LICENSE.txt */
(this.webpackJsonpgrain=this.webpackJsonpgrain||[]).push([[0],[,,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t){CanvasRenderingContext2D.prototype.curve=CanvasRenderingContext2D.prototype.curve||function(e,t,n,i){"use strict";t="number"===typeof t?t:.5,n=n||25;var a,r=1,o=e.length,c=0,s=new Float32Array((o-2)*n+2+(i?2*n:0)),l=new Float32Array(4*(n+2)),d=4;for(a=e.slice(0),i?(a.unshift(e[o-1]),a.unshift(e[o-2]),a.push(e[0],e[1])):(a.unshift(e[1]),a.unshift(e[0]),a.push(e[o-2],e[o-1])),l[0]=1;r<n;r++){var u=r/n,h=u*u,f=h*u,g=2*f,b=3*h;l[d++]=g-b+1,l[d++]=b-g,l[d++]=f-2*h+u,l[d++]=f-h}function j(e,i,a){for(var r,o=2;o<a;o+=2){var l=e[o],d=e[o+1],u=e[o+2],h=e[o+3],f=(u-e[o-2])*t,g=(h-e[o-1])*t,b=(e[o+4]-l)*t,j=(e[o+5]-d)*t;for(r=0;r<n;r++){var x=r<<2,v=i[x],O=i[x+1],p=i[x+2],y=i[x+3];s[c++]=v*l+O*u+p*f+y*b,s[c++]=v*d+O*h+p*g+y*j}}}for(l[++d]=1,j(a,l,o),i&&((a=[]).push(e[o-4],e[o-3],e[o-2],e[o-1]),a.push(e[0],e[1],e[2],e[3]),j(a,l,4)),o=i?0:e.length-2,s[c++]=e[o],s[c]=e[o+1],r=0,o=s.length;r<o;r+=2)this.lineTo(s[r],s[r+1]);return s}},function(e,t){var n=function(e){this.smoothing=e||.5,this.buffer=[],this.bufferMaxSize=10};n.prototype={init:function(e){for(var t=0;t<e.length;t++)this.__push(e[t]);return this.buffer},__push:function(e){var t=this.buffer.length===this.bufferMaxSize?this.buffer.shift():0;return this.buffer.push(e),t},next:function(e){var t=this,n=this.__push(e),i=this.buffer.reduce((function(e,n){return t.smoothing*n+(1-t.smoothing)*e}),n);return this.buffer[this.buffer.length-1]=i,i},smoothArray:function(e){for(var t=e[0],n=1;n<e.length;n++){t+=(e[n]-t)*this.smoothing,e[n]=Math.round(t)}return e}},e.exports=new n},function(e,t,n){"use strict";n.r(t);var i=n(0),a=n(1),r=n(5),o=n.n(r),c=(n(17),n(18),n(2)),s=(n(19),n.p+"static/media/stones.f3314072.jpg"),l=n(8),d=n.n(l);n(26);var u=function(e){var t=Object(a.useState)("0.42em"),n=Object(c.a)(t,2),r=n[0],o=(n[1],{stroke:"#554444",opacity:"0.3",fill:"none",strokeWidth:r}),s={transform:"translate(-2.5em, -2.5em)",top:"30px",preserveAspectRatio:"none"};return Object(a.useEffect)((function(){console.log("useeffect indicator with x, y "+e.x1+", "+e.y1)})),Object(i.jsxs)("div",{id:"indicator",style:{position:"relative",width:"100%",height:"100%"},children:[Object(i.jsx)("svg",{style:{position:"absolute"},width:"100%",height:"100%",children:Object(i.jsx)("line",{id:"line",style:{position:"absolute",stroke:"#6b6b6b",strokeWidth:"0.2em",opacity:"0.7"},x1:e.x1+0,y1:e.y1+0,x2:e.x2+0,y2:e.y2+0})}),Object(i.jsx)(d.a,{id:"draggable1",axis:"both",handle:".handle",position:{x:e.x1,y:e.y1},scale:1,onDrag:function(t,n){e.xyChange(0,n.x,n.y)},children:Object(i.jsx)("div",{id:"handle1",children:Object(i.jsx)("svg",{style:s,className:"handle",width:"5em",height:"5em",viewBox:"56 56 112 112",children:Object(i.jsx)("circle",{style:o,cx:"112",cy:"112",r:"25"})})})}),Object(i.jsx)(d.a,{id:"draggable2",axis:"both",handle:".handle",position:{x:e.x2,y:e.y2},scale:1,onDrag:function(t,n){e.xyChange(1,n.x,n.y)},children:Object(i.jsx)("div",{id:"handle2",children:Object(i.jsx)("svg",{style:s,className:"handle",width:"5em",height:"5em",viewBox:"0 0 112 112",children:Object(i.jsx)("circle",{style:o,cx:"56",cy:"56",r:"25"})})})})]})};n(27);var h=function(e){return Object(a.useEffect)((function(){!function(){var e=document.getElementById("canvasPic").getContext("2d");e.clearRect(0,0,120,400),e.fillStyle="#0000F2",e.fillRect(0,0,1120,364);var t=new Image;t.src=s,t.onload=function(){e.drawImage(t,0,0,2500,600,0,0,2500,600)},e.strokeStyle="#AA9999",e.lineWidth=3,e.moveTo(50,300),e.lineTo(90,210),e.stroke()}()}),[]),Object(i.jsxs)("div",{id:"bildet",children:[Object(i.jsx)("canvas",{ref:e.passRef,id:"canvasPic",width:"1120",height:"364"}),Object(i.jsx)("p",{id:"bildetTitle",children:"draggable circles adjust line measuring image brightness"}),Object(i.jsx)(u,{frameWidth:e.frameWidth,bildetHeight:e.bildetHeight,x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,xyChange:e.xyChange})]})};n(28);var f=function(e){return Object(i.jsxs)("div",{className:"graph",children:[" ",Object(i.jsx)("canvas",{ref:e.passRef,id:"drawingCanvas",width:e.drawingCanvasWidth,height:e.drawingCanvasHeight}),Object(i.jsx)("svg",{id:"playIndexLine",width:"10%",height:"100%",children:Object(i.jsx)("line",{id:"line",x1:"22",y1:"0",x2:"22",y2:"200"})}),Object(i.jsx)("p",{id:"graphTitle",children:"graph represents image brightness along line between circles"})]})};n(29);var g=function(e){return Object(i.jsxs)("div",{id:"ani",className:"animator",children:[Object(i.jsx)("p",{id:"animatorTitle",children:"play CSS transition following brightness graph left to right"}),Object(i.jsx)("svg",{onClick:e.startTransition,id:"playTriangle",viewBox:"0 0 100 100",children:Object(i.jsx)("polygon",{points:"35,35 35,65 65,50"})})]})};n(30),n(31);var b=n(3);var j=function(){var e=Object(a.useState)(100),t=Object(c.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(100),s=Object(c.a)(o,2),l=s[0],d=s[1],u=Object(a.useRef)(null),j=Object(a.useRef)(null),x=Object(a.useState)(100),v=Object(c.a)(x,2),O=v[0],p=v[1],y=Object(a.useState)(100),m=Object(c.a)(y,2),w=m[0],C=m[1],S=Object(a.useState)(300),k=Object(c.a)(S,2),I=k[0],R=k[1],B=Object(a.useState)(200),E=Object(c.a)(B,2),A=E[0],W=E[1],T=Object(a.useState)(.2),F=Object(c.a)(T,2),D=F[0],L=F[1],N=Object(a.useState)(.2),_=Object(c.a)(N,2),H=_[0],z=_[1],M=Object(a.useState)(.3),P=Object(c.a)(M,2),J=P[0],U=P[1],$=Object(a.useState)(.3),q=Object(c.a)($,2),G=q[0],K=q[1],Q=Object(a.useState)(null),V=Object(c.a)(Q,2),X=V[0],Y=V[1],Z=Object(a.useState)(null),ee=Object(c.a)(Z,2),te=ee[0],ne=ee[1],ie=Object(a.useState)(null),ae=Object(c.a)(ie,2),re=(ae[0],ae[1],Object(a.useState)(3)),oe=Object(c.a)(re,2),ce=oe[0],se=(oe[1],100),le=Object(a.useState)(0),de=Object(c.a)(le,2),ue=de[0],he=de[1],fe=[];function ge(){r(document.getElementById("frame").getBoundingClientRect().width),d(document.getElementById("bildet").getBoundingClientRect().height),console.log("resized")}function be(){var e=u.current.getContext("2d"),t=j.current.getContext("2d");t.clearRect(0,0,X,te),t.strokeStyle="#AA9999",t.lineWidth=1,t.lineCap="round",t.beginPath();var i=O*(1120/n),a=w*(1120/n),r=I*(1120/n),o=A*(1120/n),c=255-e.getImageData(i,a,1,1).data[0],s=255-e.getImageData(r,o,1,1).data[0];console.log("first color point "+c);for(var l=0;l<se;l++){var d=e.getImageData(i+(r-i)/se*l,a+(o-a)/se*l,1,1).data;fe.push(255-d[1])}fe=function(e,t,n){for(var i=0;i<30;i++)e.unshift(t);for(i=0;i<30;i++)e.push(n);return e=Object(b.a)(e,ce),e=Object(b.a)(e,ce),e=Object(b.a)(e,ce),e=Object(b.a)(e,ce),(e=Object(b.a)(e,ce)).splice(0,30),e}(fe,c,s);for(l=1;l<se;l++)t.lineTo(X/se*l,fe[l]/255*te);t.stroke(),he(fe[0]),document.getElementById("playTriangle").style.transform="translate("+(480-(fe[0]+ue))+"px)"}return Object(a.useEffect)((function(){console.log("bare f\xf8rste gang"),Y(document.getElementById("drawingCanvas").getBoundingClientRect().width),ne(document.getElementById("drawingCanvas").getBoundingClientRect().height),function(e,t){var n=u.current.getContext("2d"),i=j.current.getContext("2d");n.fillStyle="#FAFAFA",i.fillStyle="#FAF2F2",i.fillRect(0,0,e,t),i.strokeStyle="#AA9999",i.lineWidth=2}(X,te),window.addEventListener("resize",ge),ge()}),[]),Object(a.useEffect)((function(){console.log("hver gang noe endres i frame"),be(),p(D*n),C(l*H),console.log("x1p "+D),R(n*J),W(l*G)})),Object(i.jsxs)("div",{id:"frame",children:[Object(i.jsx)("p",{onClick:function(){console.log("redraw ")},id:"titlen",children:"CSS transition from image"}),Object(i.jsx)(h,{plotLine:be,passRef:u,x1:O,y1:w,x2:I,y2:A,xyChange:function(e,t,i){0==e&&(console.log("n\xe5 flytter vi"),L(t/n),console.log("xgot "+t+" frameWidth "+n+" x1p "+D),p(n*D),z(i/l),C(n*H)),1==e&&(U(t/n),R(n*J),K(i/l),W(n*G))},frameWidth:n,bildetHeight:l}),Object(i.jsx)(f,{passRef:j,drawingCanvasWidth:X,drawingCanvasHeight:te}),Object(i.jsx)(g,{startTransition:function(){var e=setInterval((function(){document.getElementById("playTriangle").style.transform="translate("+(480-(fe[n]+ue))+"px)",1===t&&n++;0===t&&n--;n===se&&(t=0);document.getElementById("playIndexLine").style.transform="translate("+(X-25)/se*n+"px)",-1===n&&(t=1,clearInterval(e))}),15),t=1,n=0}})]})};var x=function(){return Object(i.jsx)("div",{id:"wrapperDiv",children:Object(i.jsx)(j,{})})},v=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(Object(i.jsx)(x,{}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");v?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):O(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):O(e)}))}}()}],[[32,1,2]]]);
//# sourceMappingURL=main.60944dc7.chunk.js.map