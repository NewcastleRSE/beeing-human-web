import{w as u}from"./index.4d678d2c.js";import{a as g}from"./paths.583b836b.js";const b="1684234894347",E="sveltekit:snapshot",A="sveltekit:scroll",R="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function S(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function y(){return{x:pageXOffset,y:pageYOffset}}function i(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function _(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function I(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=_(e)}}function T(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const l=e instanceof SVGAElement?e.target.baseVal:e.target,s=!n||!!l||m(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),r=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:s,target:l,download:r}}function x(e){let t=null,n=null,l=null,s=null,r=null,a=null,o=e;for(;o&&o!==document.documentElement;)l===null&&(l=i(o,"preload-code")),s===null&&(s=i(o,"preload-data")),t===null&&(t=i(o,"keepfocus")),n===null&&(n=i(o,"noscroll")),r===null&&(r=i(o,"reload")),a===null&&(a=i(o,"replacestate")),o=_(o);return{preload_code:d[l??"off"],preload_data:d[s??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:r==="off"?!1:r===""?!0:null,replace_state:a==="off"?!1:a===""?!0:null}}function p(e){const t=u(e);let n=!0;function l(){n=!0,t.update(a=>a)}function s(a){n=!1,t.set(a)}function r(a){let o;return t.subscribe(c=>{(o===void 0||n&&c!==o)&&a(o=c)})}return{notify:l,set:s,subscribe:r}}function v(){const{set:e,subscribe:t}=u(!1);let n;async function l(){clearTimeout(n);try{const s=await fetch(`${g}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!s.ok)return!1;const a=(await s.json()).version!==b;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:l}}function m(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let h;function O(e){h=e.client}function U(e){return(...t)=>h[e](...t)}const L={url:p({}),page:p({}),navigating:u(null),updated:v()};export{R as I,f as P,A as S,E as a,T as b,x as c,y as d,O as e,I as f,S as g,U as h,m as i,L as s};
