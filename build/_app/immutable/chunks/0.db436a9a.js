import { _ as E } from "./app.fbf6c1dc.js";
import {
  S as F,
  i as K,
  s as U,
  H as x,
  e as C,
  a as G,
  k as O,
  C as p,
  D as $,
  E as tt,
  h as g,
  c as J,
  l as z,
  m as I,
  F as V,
  n as o,
  G as M,
  b as S,
  I as w,
  J as A,
  K as et,
  L as N,
  M as B,
  N as R,
  O as st,
  P,
  Q as it,
  y as at,
  z as lt,
  A as rt,
  R as ct,
  T as nt,
  U as ot,
  g as q,
  d as H,
  B as ut,
  o as ht,
} from "./index.0e418277.js";
import { v as ft } from "./viewChoice.8f180d66.js";
import {
  s as mt,
  m as j,
  a as _t,
  b as dt,
} from "./ProgressBar.svelte_svelte_type_style_lang.077146c8.js";
const gt = !0,
  Ot = Object.freeze(
    Object.defineProperty(
      { __proto__: null, prerender: gt },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function bt(e) {
  let i,
    a = `<script>(${mt.toString()})();<\/script>`,
    c,
    f,
    t,
    s,
    n,
    m,
    k,
    u,
    _,
    d,
    b,
    L,
    y;
  return {
    c() {
      (i = new x(!1)),
        (c = C()),
        (f = G()),
        (t = O("div")),
        (s = O("div")),
        (n = p("svg")),
        (m = p("path")),
        this.h();
    },
    l(r) {
      const h = $("svelte-1fqad1o", document.head);
      (i = tt(h, !1)),
        (c = C()),
        h.forEach(g),
        (f = J(r)),
        (t = z(r, "DIV", {
          class: !0,
          role: !0,
          "aria-label": !0,
          "aria-checked": !0,
          title: !0,
          tabindex: !0,
        }));
      var v = I(t);
      s = z(v, "DIV", { class: !0 });
      var D = I(s);
      n = V(D, "svg", { class: !0, xmlns: !0, viewBox: !0 });
      var T = I(n);
      (m = V(T, "path", { d: !0 })),
        I(m).forEach(g),
        T.forEach(g),
        D.forEach(g),
        v.forEach(g),
        this.h();
    },
    h() {
      (i.a = c),
        o(m, "d", (k = e[0] ? e[4].sun : e[4].moon)),
        o(n, "class", (u = "lightswitch-icon " + e[1])),
        o(n, "xmlns", "http://www.w3.org/2000/svg"),
        o(n, "viewBox", "0 0 512 512"),
        o(s, "class", (_ = "lightswitch-thumb " + e[2])),
        o(t, "class", (d = "lightswitch-track " + e[3])),
        o(t, "role", "switch"),
        o(t, "aria-label", "Light Switch"),
        o(t, "aria-checked", e[0]),
        o(
          t,
          "title",
          (b = "Toggle " + (e[0] === !0 ? "Dark" : "Light") + " Mode")
        ),
        o(t, "tabindex", "0");
    },
    m(r, h) {
      i.m(a, document.head),
        M(document.head, c),
        S(r, f, h),
        S(r, t, h),
        M(t, s),
        M(s, n),
        M(n, m),
        L ||
          ((y = [
            w(t, "click", e[5]),
            w(t, "click", e[18]),
            w(t, "keydown", yt),
            w(t, "keydown", e[19]),
            w(t, "keyup", e[20]),
            w(t, "keypress", e[21]),
          ]),
          (L = !0));
    },
    p(r, [h]) {
      h & 1 && k !== (k = r[0] ? r[4].sun : r[4].moon) && o(m, "d", k),
        h & 2 && u !== (u = "lightswitch-icon " + r[1]) && o(n, "class", u),
        h & 4 && _ !== (_ = "lightswitch-thumb " + r[2]) && o(s, "class", _),
        h & 8 && d !== (d = "lightswitch-track " + r[3]) && o(t, "class", d),
        h & 1 && o(t, "aria-checked", r[0]),
        h & 1 &&
          b !== (b = "Toggle " + (r[0] === !0 ? "Dark" : "Light") + " Mode") &&
          o(t, "title", b);
    },
    i: A,
    o: A,
    d(r) {
      g(c), r && i.d(), r && g(f), r && g(t), (L = !1), et(y);
    },
  };
}
const kt = "cursor-pointer",
  Lt = "aspect-square scale-[0.8] flex justify-center items-center",
  vt = "w-[70%] aspect-square";
function yt(e) {
  ["Enter", "Space"].includes(e.code) &&
    (e.preventDefault(), e.currentTarget.click());
}
function wt(e, i, a) {
  let c, f, t, s, n, m, k, u;
  N(e, j, (l) => a(0, (u = l)));
  let { bgLight: _ = "bg-surface-50" } = i,
    { bgDark: d = "bg-surface-900" } = i,
    { fillLight: b = "fill-surface-50" } = i,
    { fillDark: L = "fill-surface-900" } = i,
    { width: y = "w-12" } = i,
    { height: r = "h-6" } = i,
    { ring: h = "ring-[1px] ring-surface-500/30" } = i,
    { rounded: v = "rounded-token" } = i;
  const D = "transition-all duration-[200ms]",
    T = {
      sun: "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z",
      moon: "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z",
    };
  function Q() {
    st(j, (u = !u), u), _t(u), dt(u);
  }
  function W(l) {
    P.call(this, e, l);
  }
  function X(l) {
    P.call(this, e, l);
  }
  function Y(l) {
    P.call(this, e, l);
  }
  function Z(l) {
    P.call(this, e, l);
  }
  return (
    (e.$$set = (l) => {
      a(23, (i = B(B({}, i), R(l)))),
        "bgLight" in l && a(6, (_ = l.bgLight)),
        "bgDark" in l && a(7, (d = l.bgDark)),
        "fillLight" in l && a(8, (b = l.fillLight)),
        "fillDark" in l && a(9, (L = l.fillDark)),
        "width" in l && a(10, (y = l.width)),
        "height" in l && a(11, (r = l.height)),
        "ring" in l && a(12, (h = l.ring)),
        "rounded" in l && a(13, (v = l.rounded));
    }),
    (e.$$.update = () => {
      e.$$.dirty & 193 && a(17, (c = u === !0 ? _ : d)),
        e.$$.dirty & 193 && a(16, (f = u === !0 ? d : _)),
        e.$$.dirty & 1 && a(15, (t = u === !0 ? "translate-x-[100%]" : "")),
        e.$$.dirty & 769 && a(14, (s = u === !0 ? b : L)),
        a(3, (n = `${kt} ${D} ${y} ${r} ${h} ${v} ${c} ${i.class ?? ""}`)),
        e.$$.dirty & 108544 && a(2, (m = `${Lt} ${D} ${r} ${v} ${f} ${t}`)),
        e.$$.dirty & 16384 && a(1, (k = `${vt} ${s}`));
    }),
    (i = R(i)),
    [u, k, m, n, T, Q, _, d, b, L, y, r, h, v, s, t, f, c, W, X, Y, Z]
  );
}
class Dt extends F {
  constructor(i) {
    super(),
      K(this, i, wt, bt, U, {
        bgLight: 6,
        bgDark: 7,
        fillLight: 8,
        fillDark: 9,
        width: 10,
        height: 11,
        ring: 12,
        rounded: 13,
      });
  }
}
function Tt(e) {
  let i, a, c;
  i = new Dt({});
  const f = e[1].default,
    t = it(f, e, e[0], null);
  return {
    c() {
      at(i.$$.fragment), (a = G()), t && t.c();
    },
    l(s) {
      lt(i.$$.fragment, s), (a = J(s)), t && t.l(s);
    },
    m(s, n) {
      rt(i, s, n), S(s, a, n), t && t.m(s, n), (c = !0);
    },
    p(s, [n]) {
      t &&
        t.p &&
        (!c || n & 1) &&
        ct(t, f, s, s[0], c ? ot(f, s[0], n, null) : nt(s[0]), null);
    },
    i(s) {
      c || (q(i.$$.fragment, s), q(t, s), (c = !0));
    },
    o(s) {
      H(i.$$.fragment, s), H(t, s), (c = !1);
    },
    d(s) {
      ut(i, s), s && g(a), t && t.d(s);
    },
  };
}
function Et(e, i, a) {
  let c;
  N(e, ft, (s) => a(2, (c = s)));
  let { $$slots: f = {}, $$scope: t } = i;
  return (
    ht(async () => {
      c === "literature"
        ? await E(
            () => Promise.resolve({}),
            ["../assets/theme-skeleton.5338c4be.css"],
            import.meta.url
          )
        : c === "science"
        ? await E(
            () => Promise.resolve({}),
            ["../assets/theme-modern.fcc6c979.css"],
            import.meta.url
          )
        : c === "music"
        ? await E(
            () => Promise.resolve({}),
            ["../assets/theme-rocket.d7ab7f0f.css"],
            import.meta.url
          )
        : c === "interdisciplinarity" &&
          (await E(
            () => Promise.resolve({}),
            ["../assets/theme-seasonal.665ae83a.css"],
            import.meta.url
          ));
    }),
    (e.$$set = (s) => {
      "$$scope" in s && a(0, (t = s.$$scope));
    }),
    [t, f]
  );
}
class It extends F {
  constructor(i) {
    super(), K(this, i, Et, Tt, U, {});
  }
}
const pt = It;
export { pt as component, Ot as universal };
