import{H as b,s as d}from"./index.38f6bbe7.js";const e=[];function g(i,a=b){let n;const o=new Set;function r(t){if(d(i,t)&&(i=t,n)){const c=!e.length;for(const s of o)s[1](),e.push(s,i);if(c){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function l(t){r(t(i))}function _(t,c=b){const s=[t,c];return o.add(s),o.size===1&&(n=a(r)||b),t(i),()=>{o.delete(s),o.size===0&&n&&(n(),n=null)}}return{set:r,update:l,subscribe:_}}var u;const h=((u=globalThis.__sveltekit_cddju)==null?void 0:u.base)??"";var f;const q=((f=globalThis.__sveltekit_cddju)==null?void 0:f.assets)??h;export{q as a,h as b,g as w};
