import{S as I,i as L,s as P,k as p,q as b,a as q,l as d,m as g,r as x,h as u,c as y,b as m,G as B,g as h,f as S,d as $,a1 as w,y as z,z as A,A as C,B as G,v as H,u as U}from"../chunks/index.b4c0a2ee.js";import{I as j}from"../chunks/InternalLink.ccacd974.js";function k(c,l,o){const n=c.slice();return n[1]=l[o].slug,n[2]=l[o].title,n}function D(c){let l=c[2]+"",o;return{c(){o=b(l)},l(n){o=x(n,l)},m(n,t){m(n,o,t)},p(n,t){t&1&&l!==(l=n[2]+"")&&U(o,l)},d(n){n&&u(o)}}}function v(c){let l,o,n;return o=new j({props:{link:"content/"+c[1],$$slots:{default:[D]},$$scope:{ctx:c}}}),{c(){l=p("li"),z(o.$$.fragment)},l(t){l=d(t,"LI",{});var i=g(l);A(o.$$.fragment,i),i.forEach(u)},m(t,i){m(t,l,i),C(o,l,null),n=!0},p(t,i){const f={};i&1&&(f.link="content/"+t[1]),i&33&&(f.$$scope={dirty:i,ctx:t}),o.$set(f)},i(t){n||(h(o.$$.fragment,t),n=!0)},o(t){$(o.$$.fragment,t),n=!1},d(t){t&&u(l),G(o)}}}function F(c){let l,o,n,t,i,f=c[0].summaries,a=[];for(let e=0;e<f.length;e+=1)a[e]=v(k(c,f,e));const E=e=>$(a[e],1,1,()=>{a[e]=null});return{c(){l=p("h1"),o=b("Page load test"),n=q(),t=p("ul");for(let e=0;e<a.length;e+=1)a[e].c()},l(e){l=d(e,"H1",{});var r=g(l);o=x(r,"Page load test"),r.forEach(u),n=y(e),t=d(e,"UL",{});var s=g(t);for(let _=0;_<a.length;_+=1)a[_].l(s);s.forEach(u)},m(e,r){m(e,l,r),B(l,o),m(e,n,r),m(e,t,r);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(t,null);i=!0},p(e,[r]){if(r&1){f=e[0].summaries;let s;for(s=0;s<f.length;s+=1){const _=k(e,f,s);a[s]?(a[s].p(_,r),h(a[s],1)):(a[s]=v(_),a[s].c(),h(a[s],1),a[s].m(t,null))}for(H(),s=f.length;s<a.length;s+=1)E(s);S()}},i(e){if(!i){for(let r=0;r<f.length;r+=1)h(a[r]);i=!0}},o(e){a=a.filter(Boolean);for(let r=0;r<a.length;r+=1)$(a[r]);i=!1},d(e){e&&u(l),e&&u(n),e&&u(t),w(a,e)}}}function J(c,l,o){let{data:n}=l;return c.$$set=t=>{"data"in t&&o(0,n=t.data)},[n]}class N extends I{constructor(l){super(),L(this,l,J,F,P,{data:0})}}export{N as component};
