function w(){}function U(t,e){for(const n in e)t[n]=e[n];return t}function D(t){return t()}function L(){return Object.create(null)}function y(t){t.forEach(D)}function B(t){return typeof t=="function"}function pt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let $;function gt(t,e){return $||($=document.createElement("a")),$.href=e,t===$.href}function V(t){return Object.keys(t).length===0}function q(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function yt(t){let e;return q(t,n=>e=n)(),e}function xt(t,e,n){t.$$.on_destroy.push(q(e,n))}function bt(t,e,n,i){if(t){const s=G(t,e,n,i);return t[0](s)}}function G(t,e,n,i){return t[1]&&i?U(n.ctx.slice(),t[1](i(e))):n.ctx}function $t(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const o=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)o[l]=e.dirty[l]|s[l];return o}return e.dirty|s}return e.dirty}function Et(t,e,n,i,s,o){if(s){const r=G(e,n,i,o);t.p(r,s)}}function wt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function vt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Tt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Nt(t){const e={};for(const n in t)e[n]=!0;return e}function At(t,e,n){return t.set(n),e}const kt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let T=!1;function X(){T=!0}function Y(){T=!1}function Z(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function tt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,f=(s>0&&e[n[s]].claim_order<=u?s+1:Z(1,s,b=>e[n[b]].claim_order,u))-1;i[c]=n[f]+1;const a=f+1;n[a]=c,s=Math.max(a,s)}const o=[],r=[];let l=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(o.push(e[c-1]);l>=c;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);o.reverse(),r.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<r.length;c++){for(;u<o.length&&r[c].claim_order>=o[u].claim_order;)u++;const f=u<o.length?o[u]:null;t.insertBefore(r[c],f)}}function et(t,e){if(T){for(tt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function nt(t,e,n){t.insertBefore(e,n||null)}function it(t,e,n){T&&!n?et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function v(t){t.parentNode&&t.parentNode.removeChild(t)}function St(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function R(t){return document.createElement(t)}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function C(t){return document.createTextNode(t)}function Ct(){return C(" ")}function Mt(){return C("")}function jt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function st(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const rt=["width","height"];function Lt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&rt.indexOf(i)===-1?t[i]=e[i]:st(t,i,e[i])}function Ht(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function ct(t){return Array.from(t.childNodes)}function F(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function W(t,e,n,i,s=!1){F(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function I(t,e,n,i){return W(t,s=>s.nodeName===e,s=>{const o=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||o.push(l.name)}o.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Ot(t,e,n){return I(t,e,n,R)}function Pt(t,e,n){return I(t,e,n,z)}function ot(t,e){return W(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>C(e),!0)}function Dt(t){return ot(t," ")}function H(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Bt(t,e){const n=H(t,"HTML_TAG_START",0),i=H(t,"HTML_TAG_END",n);if(n===i)return new O(void 0,e);F(t);const s=t.splice(n,i-n+1);v(s[0]),v(s[s.length-1]);const o=s.slice(1,s.length-1);for(const r of o)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new O(o,e)}function qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Gt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Rt(t,e,n){t.classList[n?"add":"remove"](e)}function lt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function zt(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const o=s.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(s)):o===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class ut{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=z(n.nodeName):this.e=R(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)nt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(v)}}class O extends ut{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)it(this.t,this.n[n],e)}}function Ft(t,e){return new t(e)}let g;function p(t){g=t}function x(){if(!g)throw new Error("Function called outside component initialization");return g}function Wt(t){x().$$.on_mount.push(t)}function It(t){x().$$.after_update.push(t)}function Jt(){const t=x();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const o=lt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,o)}),!o.defaultPrevented}return!0}}function Kt(t,e){return x().$$.context.set(t,e),e}function Qt(t){return x().$$.context.get(t)}function Ut(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const h=[],P=[];let m=[];const A=[],J=Promise.resolve();let k=!1;function K(){k||(k=!0,J.then(Q))}function Vt(){return K(),J}function S(t){m.push(t)}function Xt(t){A.push(t)}const N=new Set;let d=0;function Q(){if(d!==0)return;const t=g;do{try{for(;d<h.length;){const e=h[d];d++,p(e),at(e.$$)}}catch(e){throw h.length=0,d=0,e}for(p(null),h.length=0,d=0;P.length;)P.pop()();for(let e=0;e<m.length;e+=1){const n=m[e];N.has(n)||(N.add(n),n())}m.length=0}while(h.length);for(;A.length;)A.pop()();k=!1,N.clear(),p(t)}function at(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}function ft(t){const e=[],n=[];m.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),m=e}const E=new Set;let _;function Yt(){_={r:0,c:[],p:_}}function Zt(){_.r||y(_.c),_=_.p}function _t(t,e){t&&t.i&&(E.delete(t),t.i(e))}function te(t,e,n,i){if(t&&t.o){if(E.has(t))return;E.add(t),_.c.push(()=>{E.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function ee(t,e){const n={},i={},s={$$scope:1};let o=t.length;for(;o--;){const r=t[o],l=e[o];if(l){for(const c in r)c in l||(i[c]=1);for(const c in l)s[c]||(n[c]=l[c],s[c]=1);t[o]=l}else for(const c in r)s[c]=1}for(const r in i)r in n||(n[r]=void 0);return n}function ne(t){return typeof t=="object"&&t!==null?t:{}}function ie(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function se(t){t&&t.c()}function re(t,e){t&&t.l(e)}function dt(t,e,n,i){const{fragment:s,after_update:o}=t.$$;s&&s.m(e,n),i||S(()=>{const r=t.$$.on_mount.map(D).filter(B);t.$$.on_destroy?t.$$.on_destroy.push(...r):y(r),t.$$.on_mount=[]}),o.forEach(S)}function ht(t,e){const n=t.$$;n.fragment!==null&&(ft(n.after_update),y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function mt(t,e){t.$$.dirty[0]===-1&&(h.push(t),K(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ce(t,e,n,i,s,o,r,l=[-1]){const c=g;p(t);const u=t.$$={fragment:null,ctx:[],props:o,update:w,not_equal:s,bound:L(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:L(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};r&&r(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(a,b,...M)=>{const j=M.length?M[0]:b;return u.ctx&&s(u.ctx[a],u.ctx[a]=j)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](j),f&&mt(t,a)),b}):[],u.update(),f=!0,y(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){X();const a=ct(e.target);u.fragment&&u.fragment.l(a),a.forEach(v)}else u.fragment&&u.fragment.c();e.intro&&_t(t.$$.fragment),dt(t,e.target,e.anchor,e.customElement),Y(),Q()}p(c)}class oe{$destroy(){ht(this,1),this.$destroy=w}$on(e,n){if(!B(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!V(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ie as $,dt as A,ht as B,z as C,zt as D,Bt as E,Pt as F,et as G,O as H,jt as I,w as J,y as K,xt as L,U as M,vt as N,At as O,Ut as P,bt as Q,Et as R,oe as S,wt as T,$t as U,Kt as V,Ht as W,Lt as X,ee as Y,Tt as Z,Qt as _,Ct as a,Xt as a0,St as a1,kt as a2,gt as a3,Rt as a4,Nt as a5,ne as a6,Jt as a7,yt as a8,it as b,Dt as c,te as d,Mt as e,Zt as f,_t as g,v as h,ce as i,It as j,R as k,Ot as l,ct as m,st as n,Wt as o,Gt as p,C as q,ot as r,pt as s,Vt as t,qt as u,Yt as v,P as w,Ft as x,se as y,re as z};
