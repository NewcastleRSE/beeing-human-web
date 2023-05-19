import {
  S as Ve,
  i as Ne,
  s as qe,
  Q as vt,
  k as I,
  l as L,
  m as S,
  h as r,
  n as T,
  b as y,
  R as kt,
  T as pt,
  U as Et,
  g as U,
  d as V,
  V as ue,
  M as we,
  N as Ue,
  W as Lt,
  a as D,
  c as M,
  X as ht,
  G as s,
  I as ie,
  Y as yt,
  K as Pt,
  Z as bt,
  _ as fe,
  P as Y,
  w as Se,
  y as Z,
  z as F,
  A as J,
  B as O,
  L as It,
  $ as Ce,
  a0 as Re,
  q as k,
  r as p,
  u as St,
} from "./index.0e418277.js";
import { I as $e } from "./InternalLink.c91eec11.js";
import "./ProgressBar.svelte_svelte_type_style_lang.077146c8.js";
import { v as de } from "./viewChoice.8f180d66.js";
import { h as wt } from "./singletons.04b4d720.js";
function Gt(l) {
  let e, t, a;
  const o = l[13].default,
    _ = vt(o, l, l[12], null);
  return {
    c() {
      (e = I("div")), _ && _.c(), this.h();
    },
    l(d) {
      e = L(d, "DIV", {
        class: !0,
        "data-testid": !0,
        role: !0,
        "aria-labelledby": !0,
      });
      var u = S(e);
      _ && _.l(u), u.forEach(r), this.h();
    },
    h() {
      T(e, "class", (t = "radio-group " + l[1])),
        T(e, "data-testid", "radio-group"),
        T(e, "role", "radiogroup"),
        T(e, "aria-labelledby", l[0]);
    },
    m(d, u) {
      y(d, e, u), _ && _.m(e, null), (a = !0);
    },
    p(d, [u]) {
      _ &&
        _.p &&
        (!a || u & 4096) &&
        kt(_, o, d, d[12], a ? Et(o, d[12], u, null) : pt(d[12]), null),
        (!a || (u & 2 && t !== (t = "radio-group " + d[1]))) &&
          T(e, "class", t),
        (!a || u & 1) && T(e, "aria-labelledby", d[0]);
    },
    i(d) {
      a || (U(_, d), (a = !0));
    },
    o(d) {
      V(_, d), (a = !1);
    },
    d(d) {
      d && r(e), _ && _.d(d);
    },
  };
}
const At = "p-1";
function Dt(l, e, t) {
  let a,
    { $$slots: o = {}, $$scope: _ } = e,
    { display: d = "inline-flex" } = e,
    { background: u = "bg-surface-200-700-token" } = e,
    { border: A = "border-token border-surface-400-500-token" } = e,
    { spacing: G = "space-x-1" } = e,
    { rounded: P = "rounded-token" } = e,
    { padding: w = "px-4 py-1" } = e,
    { active: g = "variant-filled" } = e,
    { hover: B = "hover:variant-soft" } = e,
    { color: v = "" } = e,
    { fill: m = "" } = e,
    { labelledby: E = "" } = e;
  return (
    ue("rounded", P),
    ue("padding", w),
    ue("active", g),
    ue("hover", B),
    ue("color", v),
    ue("fill", m),
    (l.$$set = (c) => {
      t(14, (e = we(we({}, e), Ue(c)))),
        "display" in c && t(2, (d = c.display)),
        "background" in c && t(3, (u = c.background)),
        "border" in c && t(4, (A = c.border)),
        "spacing" in c && t(5, (G = c.spacing)),
        "rounded" in c && t(6, (P = c.rounded)),
        "padding" in c && t(7, (w = c.padding)),
        "active" in c && t(8, (g = c.active)),
        "hover" in c && t(9, (B = c.hover)),
        "color" in c && t(10, (v = c.color)),
        "fill" in c && t(11, (m = c.fill)),
        "labelledby" in c && t(0, (E = c.labelledby)),
        "$$scope" in c && t(12, (_ = c.$$scope));
    }),
    (l.$$.update = () => {
      t(1, (a = `${At} ${d} ${u} ${A} ${G} ${P} ${e.class ?? ""}`));
    }),
    (e = Ue(e)),
    [E, a, d, u, A, G, P, w, g, B, v, m, _, o]
  );
}
class Mt extends Ve {
  constructor(e) {
    super(),
      Ne(this, e, Dt, Gt, qe, {
        display: 2,
        background: 3,
        border: 4,
        spacing: 5,
        rounded: 6,
        padding: 7,
        active: 8,
        hover: 9,
        color: 10,
        fill: 11,
        labelledby: 0,
      });
  }
}
function Tt(l) {
  let e,
    t,
    a,
    o,
    _,
    d,
    u,
    A,
    G,
    P,
    w = [
      { type: "radio" },
      { name: l[1] },
      { __value: l[2] },
      l[9](),
      { tabindex: "-1" },
    ],
    g = {};
  for (let m = 0; m < w.length; m += 1) g = we(g, w[m]);
  const B = l[19].default,
    v = vt(B, l, l[18], null);
  return (
    (A = Lt(l[27][0])),
    {
      c() {
        (e = I("label")),
          (t = I("div")),
          (a = I("div")),
          (o = I("input")),
          (_ = D()),
          v && v.c(),
          this.h();
      },
      l(m) {
        e = L(m, "LABEL", {});
        var E = S(e);
        t = L(E, "DIV", {
          class: !0,
          "data-testid": !0,
          role: !0,
          "aria-checked": !0,
          "aria-label": !0,
          tabindex: !0,
          title: !0,
        });
        var c = S(t);
        a = L(c, "DIV", { class: !0 });
        var H = S(a);
        (o = L(H, "INPUT", { type: !0, name: !0, tabindex: !0 })),
          H.forEach(r),
          (_ = M(c)),
          v && v.l(c),
          c.forEach(r),
          E.forEach(r),
          this.h();
      },
      h() {
        ht(o, g),
          T(a, "class", "h-0 w-0 overflow-hidden"),
          T(t, "class", (d = "radio-item " + l[7])),
          T(t, "data-testid", "radio-item"),
          T(t, "role", "radio"),
          T(t, "aria-checked", l[5]),
          T(t, "aria-label", l[4]),
          T(t, "tabindex", "0"),
          T(t, "title", l[3]),
          A.p(o);
      },
      m(m, E) {
        y(m, e, E),
          s(e, t),
          s(t, a),
          s(a, o),
          o.autofocus && o.focus(),
          l[25](o),
          (o.checked = o.__value === l[0]),
          s(t, _),
          v && v.m(t, null),
          (u = !0),
          G ||
            ((P = [
              ie(o, "change", l[26]),
              ie(o, "click", l[23]),
              ie(o, "change", l[24]),
              ie(t, "keydown", l[8]),
              ie(t, "keydown", l[20]),
              ie(t, "keyup", l[21]),
              ie(t, "keypress", l[22]),
            ]),
            (G = !0));
      },
      p(m, [E]) {
        ht(
          o,
          (g = yt(w, [
            { type: "radio" },
            (!u || E & 2) && { name: m[1] },
            (!u || E & 4) && { __value: m[2] },
            m[9](),
            { tabindex: "-1" },
          ]))
        ),
          E & 1 && (o.checked = o.__value === m[0]),
          v &&
            v.p &&
            (!u || E & 262144) &&
            kt(v, B, m, m[18], u ? Et(B, m[18], E, null) : pt(m[18]), null),
          (!u || (E & 128 && d !== (d = "radio-item " + m[7]))) &&
            T(t, "class", d),
          (!u || E & 32) && T(t, "aria-checked", m[5]),
          (!u || E & 16) && T(t, "aria-label", m[4]),
          (!u || E & 8) && T(t, "title", m[3]);
      },
      i(m) {
        u || (U(v, m), (u = !0));
      },
      o(m) {
        V(v, m), (u = !1);
      },
      d(m) {
        m && r(e), l[25](null), v && v.d(m), A.r(), (G = !1), Pt(P);
      },
    }
  );
}
const Bt = "flex-auto text-base text-center cursor-pointer",
  Ht = "opacity-50 cursor-not-allowed";
function Ct(l, e, t) {
  let a, o, _, d;
  const u = [
    "group",
    "name",
    "value",
    "title",
    "label",
    "rounded",
    "padding",
    "active",
    "hover",
    "color",
    "fill",
  ];
  let A = bt(e, u),
    { $$slots: G = {}, $$scope: P } = e,
    { group: w } = e,
    { name: g } = e,
    { value: B } = e,
    { title: v = "" } = e,
    { label: m = "" } = e,
    { rounded: E = fe("rounded") } = e,
    { padding: c = fe("padding") } = e,
    { active: H = fe("active") } = e,
    { hover: K = fe("hover") } = e,
    { color: R = fe("color") } = e,
    { fill: n = fe("fill") } = e,
    h;
  function z(f) {
    ["Enter", "Space"].includes(f.code) && (f.preventDefault(), h.click());
  }
  function Q() {
    return delete A.class, A;
  }
  const j = [[]];
  function W(f) {
    Y.call(this, l, f);
  }
  function ce(f) {
    Y.call(this, l, f);
  }
  function te(f) {
    Y.call(this, l, f);
  }
  function me(f) {
    Y.call(this, l, f);
  }
  function _e(f) {
    Y.call(this, l, f);
  }
  function le(f) {
    Se[f ? "unshift" : "push"](() => {
      (h = f), t(6, h);
    });
  }
  function ge() {
    (w = this.__value), t(0, w);
  }
  return (
    (l.$$set = (f) => {
      t(29, (e = we(we({}, e), Ue(f)))),
        t(28, (A = bt(e, u))),
        "group" in f && t(0, (w = f.group)),
        "name" in f && t(1, (g = f.name)),
        "value" in f && t(2, (B = f.value)),
        "title" in f && t(3, (v = f.title)),
        "label" in f && t(4, (m = f.label)),
        "rounded" in f && t(10, (E = f.rounded)),
        "padding" in f && t(11, (c = f.padding)),
        "active" in f && t(12, (H = f.active)),
        "hover" in f && t(13, (K = f.hover)),
        "color" in f && t(14, (R = f.color)),
        "fill" in f && t(15, (n = f.fill)),
        "$$scope" in f && t(18, (P = f.$$scope));
    }),
    (l.$$.update = () => {
      l.$$.dirty & 5 && t(5, (a = B === w)),
        l.$$.dirty & 61472 && t(17, (o = a ? `${H} ${R} ${n}` : K)),
        t(16, (_ = e.disabled ? Ht : "")),
        t(7, (d = `${Bt} ${c} ${E} ${o} ${_} ${e.class ?? ""}`));
    }),
    (e = Ue(e)),
    [
      w,
      g,
      B,
      v,
      m,
      a,
      h,
      d,
      z,
      Q,
      E,
      c,
      H,
      K,
      R,
      n,
      _,
      o,
      P,
      G,
      W,
      ce,
      te,
      me,
      _e,
      le,
      ge,
      j,
    ]
  );
}
class je extends Ve {
  constructor(e) {
    super(),
      Ne(this, e, Ct, Tt, qe, {
        group: 0,
        name: 1,
        value: 2,
        title: 3,
        label: 4,
        rounded: 10,
        padding: 11,
        active: 12,
        hover: 13,
        color: 14,
        fill: 15,
      });
  }
}
function Rt(l) {
  let e;
  return {
    c() {
      e = k("Literature");
    },
    l(t) {
      e = p(t, "Literature");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function jt(l) {
  let e;
  return {
    c() {
      e = k("Science");
    },
    l(t) {
      e = p(t, "Science");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function Ut(l) {
  let e;
  return {
    c() {
      e = k("Music");
    },
    l(t) {
      e = p(t, "Music");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function Vt(l) {
  let e;
  return {
    c() {
      e = k("Interdisciplinarity");
    },
    l(t) {
      e = p(t, "Interdisciplinarity");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function Nt(l) {
  let e, t, a, o, _, d, u, A, G, P, w, g;
  function B(n) {
    l[1](n);
  }
  let v = {
    name: "viewGroup",
    value: "literature",
    $$slots: { default: [Rt] },
    $$scope: { ctx: l },
  };
  l[0] !== void 0 && (v.group = l[0]),
    (e = new je({ props: v })),
    Se.push(() => Ce(e, "group", B)),
    e.$on("click", l[2]);
  function m(n) {
    l[3](n);
  }
  let E = {
    name: "viewGroup",
    value: "science",
    $$slots: { default: [jt] },
    $$scope: { ctx: l },
  };
  l[0] !== void 0 && (E.group = l[0]),
    (o = new je({ props: E })),
    Se.push(() => Ce(o, "group", m)),
    o.$on("click", l[4]);
  function c(n) {
    l[5](n);
  }
  let H = {
    name: "viewGroup",
    value: "music",
    $$slots: { default: [Ut] },
    $$scope: { ctx: l },
  };
  l[0] !== void 0 && (H.group = l[0]),
    (u = new je({ props: H })),
    Se.push(() => Ce(u, "group", c)),
    u.$on("click", l[6]);
  function K(n) {
    l[7](n);
  }
  let R = {
    name: "viewGroup",
    value: "interdisciplinarity",
    $$slots: { default: [Vt] },
    $$scope: { ctx: l },
  };
  return (
    l[0] !== void 0 && (R.group = l[0]),
    (P = new je({ props: R })),
    Se.push(() => Ce(P, "group", K)),
    P.$on("click", l[8]),
    {
      c() {
        Z(e.$$.fragment),
          (a = D()),
          Z(o.$$.fragment),
          (d = D()),
          Z(u.$$.fragment),
          (G = D()),
          Z(P.$$.fragment);
      },
      l(n) {
        F(e.$$.fragment, n),
          (a = M(n)),
          F(o.$$.fragment, n),
          (d = M(n)),
          F(u.$$.fragment, n),
          (G = M(n)),
          F(P.$$.fragment, n);
      },
      m(n, h) {
        J(e, n, h),
          y(n, a, h),
          J(o, n, h),
          y(n, d, h),
          J(u, n, h),
          y(n, G, h),
          J(P, n, h),
          (g = !0);
      },
      p(n, h) {
        const z = {};
        h & 512 && (z.$$scope = { dirty: h, ctx: n }),
          !t && h & 1 && ((t = !0), (z.group = n[0]), Re(() => (t = !1))),
          e.$set(z);
        const Q = {};
        h & 512 && (Q.$$scope = { dirty: h, ctx: n }),
          !_ && h & 1 && ((_ = !0), (Q.group = n[0]), Re(() => (_ = !1))),
          o.$set(Q);
        const j = {};
        h & 512 && (j.$$scope = { dirty: h, ctx: n }),
          !A && h & 1 && ((A = !0), (j.group = n[0]), Re(() => (A = !1))),
          u.$set(j);
        const W = {};
        h & 512 && (W.$$scope = { dirty: h, ctx: n }),
          !w && h & 1 && ((w = !0), (W.group = n[0]), Re(() => (w = !1))),
          P.$set(W);
      },
      i(n) {
        g ||
          (U(e.$$.fragment, n),
          U(o.$$.fragment, n),
          U(u.$$.fragment, n),
          U(P.$$.fragment, n),
          (g = !0));
      },
      o(n) {
        V(e.$$.fragment, n),
          V(o.$$.fragment, n),
          V(u.$$.fragment, n),
          V(P.$$.fragment, n),
          (g = !1);
      },
      d(n) {
        O(e, n), n && r(a), O(o, n), n && r(d), O(u, n), n && r(G), O(P, n);
      },
    }
  );
}
function qt(l) {
  let e, t;
  return (
    (e = new Mt({
      props: { $$slots: { default: [Nt] }, $$scope: { ctx: l } },
    })),
    {
      c() {
        Z(e.$$.fragment);
      },
      l(a) {
        F(e.$$.fragment, a);
      },
      m(a, o) {
        J(e, a, o), (t = !0);
      },
      p(a, [o]) {
        const _ = {};
        o & 513 && (_.$$scope = { dirty: o, ctx: a }), e.$set(_);
      },
      i(a) {
        t || (U(e.$$.fragment, a), (t = !0));
      },
      o(a) {
        V(e.$$.fragment, a), (t = !1);
      },
      d(a) {
        O(e, a);
      },
    }
  );
}
function Kt(l, e, t) {
  let a;
  It(l, de, (g) => t(0, (a = g)));
  function o(g) {
    (a = g), de.set(a);
  }
  function _(g) {
    Y.call(this, l, g);
  }
  function d(g) {
    (a = g), de.set(a);
  }
  function u(g) {
    Y.call(this, l, g);
  }
  function A(g) {
    (a = g), de.set(a);
  }
  function G(g) {
    Y.call(this, l, g);
  }
  function P(g) {
    (a = g), de.set(a);
  }
  function w(g) {
    Y.call(this, l, g);
  }
  return [a, o, _, d, u, A, G, P, w];
}
class zt extends Ve {
  constructor(e) {
    super(), Ne(this, e, Kt, qt, qe, {});
  }
}
const Qt = wt("invalidate_all");
function Wt(l) {
  let e;
  return {
    c() {
      e = k("Github Pages");
    },
    l(t) {
      e = p(t, "Github Pages");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function Xt(l) {
  let e;
  return {
    c() {
      e = k("About");
    },
    l(t) {
      e = p(t, "About");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function Yt(l) {
  let e;
  return {
    c() {
      e = k("Go");
    },
    l(t) {
      e = p(t, "Go");
    },
    m(t, a) {
      y(t, e, a);
    },
    d(t) {
      t && r(e);
    },
  };
}
function Zt(l) {
  let e,
    t,
    a,
    o,
    _,
    d,
    u,
    A,
    G,
    P,
    w,
    g,
    B,
    v,
    m,
    E,
    c,
    H,
    K,
    R,
    n,
    h,
    z,
    Q,
    j,
    W,
    ce,
    te,
    me,
    _e,
    le,
    ge,
    f,
    he,
    Ke,
    Ge,
    ae,
    ze,
    Ae,
    N,
    be,
    Qe,
    We,
    ve,
    Xe,
    Ye,
    X,
    ke,
    pe,
    Ze,
    Fe,
    Ee,
    Ie,
    Je,
    Oe,
    Le,
    xe,
    De,
    x,
    Me,
    $,
    Te,
    ee,
    Be,
    ne,
    He,
    ye;
  return (
    (G = new $e({
      props: { link: "", $$slots: { default: [Wt] }, $$scope: { ctx: l } },
    })),
    (x = new $e({
      props: { link: "about", $$slots: { default: [Xt] }, $$scope: { ctx: l } },
    })),
    ($ = new zt({})),
    $.$on("click", l[1]),
    (ee = new $e({
      props: {
        link: "content/" + l[0] + "/  ",
        class: "btn variant-filled",
        $$slots: { default: [Yt] },
        $$scope: { ctx: l },
      },
    })),
    {
      c() {
        (e = I("h1")),
          (t = k("Bee-ing Human")),
          (a = D()),
          (o = I("p")),
          (_ =
            k(`The web portal is in active development and in its initial stages. It is being
  developed in `)),
          (d = I("a")),
          (u = k("Svelte")),
          (A = k(" and is hosted on ")),
          Z(G.$$.fragment),
          (P = k(". It uses the ")),
          (w = I("a")),
          (g = k("Skeleton")),
          (B = k(" component library and ")),
          (v = I("a")),
          (m = k("Svelte-Markdown")),
          (E = k(" to render .md files into HTML.")),
          (c = D()),
          (H = I("h2")),
          (K = k("New update")),
          (R = D()),
          (n = I("ul")),
          (h = I("li")),
          (z = k(
            "Page loading is now automatically done by simply creating a new md file in the correct location"
          )),
          (Q = D()),
          (j = I("li")),
          (W = k(
            "Page loading based on view transformed to follow sveltekit best practices (preload)"
          )),
          (ce = D()),
          (te = I("li")),
          (me = k("Extract injecting markdown into a separate component")),
          (_e = D()),
          (le = I("li")),
          (ge = k("Render markdown according to each view")),
          (f = D()),
          (he = I("li")),
          (Ke = k("Making sure the .nojekyll file becomes persistent.")),
          (Ge = D()),
          (ae = I("h3")),
          (ze = k("Todos at this stage")),
          (Ae = D()),
          (N = I("ul")),
          (be = I("li")),
          (Qe = k("Change theme based on selected view")),
          (We = D()),
          (ve = I("li")),
          (Xe = k("Error catching:")),
          (Ye = D()),
          (X = I("ul")),
          (ke = I("li")),
          (pe = I("del")),
          (Ze = k("markdown file does not exist")),
          (Fe = D()),
          (Ee = I("li")),
          (Ie = I("del")),
          (Je = k("view does not exist/could not be selected")),
          (Oe = D()),
          (Le = I("li")),
          (xe = k("basic layout for dev")),
          (De = D()),
          Z(x.$$.fragment),
          (Me = D()),
          Z($.$$.fragment),
          (Te = D()),
          Z(ee.$$.fragment),
          (Be = D()),
          (ne = I("p")),
          (He = k(l[0])),
          this.h();
      },
      l(i) {
        e = L(i, "H1", {});
        var b = S(e);
        (t = p(b, "Bee-ing Human")),
          b.forEach(r),
          (a = M(i)),
          (o = L(i, "P", {}));
        var C = S(o);
        (_ = p(
          C,
          `The web portal is in active development and in its initial stages. It is being
  developed in `
        )),
          (d = L(C, "A", { href: !0 }));
        var Pe = S(d);
        (u = p(Pe, "Svelte")),
          Pe.forEach(r),
          (A = p(C, " and is hosted on ")),
          F(G.$$.fragment, C),
          (P = p(C, ". It uses the ")),
          (w = L(C, "A", { href: !0 }));
        var oe = S(w);
        (g = p(oe, "Skeleton")),
          oe.forEach(r),
          (B = p(C, " component library and ")),
          (v = L(C, "A", { href: !0 }));
        var et = S(v);
        (m = p(et, "Svelte-Markdown")),
          et.forEach(r),
          (E = p(C, " to render .md files into HTML.")),
          C.forEach(r),
          (c = M(i)),
          (H = L(i, "H2", {}));
        var tt = S(H);
        (K = p(tt, "New update")),
          tt.forEach(r),
          (R = M(i)),
          (n = L(i, "UL", {}));
        var q = S(n);
        h = L(q, "LI", {});
        var lt = S(h);
        (z = p(
          lt,
          "Page loading is now automatically done by simply creating a new md file in the correct location"
        )),
          lt.forEach(r),
          (Q = M(q)),
          (j = L(q, "LI", {}));
        var it = S(j);
        (W = p(
          it,
          "Page loading based on view transformed to follow sveltekit best practices (preload)"
        )),
          it.forEach(r),
          (ce = M(q)),
          (te = L(q, "LI", {}));
        var at = S(te);
        (me = p(at, "Extract injecting markdown into a separate component")),
          at.forEach(r),
          (_e = M(q)),
          (le = L(q, "LI", {}));
        var nt = S(le);
        (ge = p(nt, "Render markdown according to each view")),
          nt.forEach(r),
          (f = M(q)),
          (he = L(q, "LI", {}));
        var ot = S(he);
        (Ke = p(ot, "Making sure the .nojekyll file becomes persistent.")),
          ot.forEach(r),
          q.forEach(r),
          (Ge = M(i)),
          (ae = L(i, "H3", {}));
        var rt = S(ae);
        (ze = p(rt, "Todos at this stage")),
          rt.forEach(r),
          (Ae = M(i)),
          (N = L(i, "UL", {}));
        var re = S(N);
        be = L(re, "LI", {});
        var st = S(be);
        (Qe = p(st, "Change theme based on selected view")),
          st.forEach(r),
          (We = M(re)),
          (ve = L(re, "LI", {}));
        var ut = S(ve);
        (Xe = p(ut, "Error catching:")),
          ut.forEach(r),
          (Ye = M(re)),
          (X = L(re, "UL", {}));
        var se = S(X);
        ke = L(se, "LI", {});
        var ft = S(ke);
        pe = L(ft, "DEL", {});
        var dt = S(pe);
        (Ze = p(dt, "markdown file does not exist")),
          dt.forEach(r),
          ft.forEach(r),
          (Fe = M(se)),
          (Ee = L(se, "LI", {}));
        var ct = S(Ee);
        Ie = L(ct, "DEL", {});
        var mt = S(Ie);
        (Je = p(mt, "view does not exist/could not be selected")),
          mt.forEach(r),
          ct.forEach(r),
          (Oe = M(se)),
          (Le = L(se, "LI", {}));
        var _t = S(Le);
        (xe = p(_t, "basic layout for dev")),
          _t.forEach(r),
          se.forEach(r),
          re.forEach(r),
          (De = M(i)),
          F(x.$$.fragment, i),
          (Me = M(i)),
          F($.$$.fragment, i),
          (Te = M(i)),
          F(ee.$$.fragment, i),
          (Be = M(i)),
          (ne = L(i, "P", {}));
        var gt = S(ne);
        (He = p(gt, l[0])), gt.forEach(r), this.h();
      },
      h() {
        T(d, "href", "https://svelte.dev/"),
          T(w, "href", "https://www.skeleton.dev"),
          T(
            v,
            "href",
            "https://www.npmjs.com/package/svelte-markdown?activeTab=readme"
          );
      },
      m(i, b) {
        y(i, e, b),
          s(e, t),
          y(i, a, b),
          y(i, o, b),
          s(o, _),
          s(o, d),
          s(d, u),
          s(o, A),
          J(G, o, null),
          s(o, P),
          s(o, w),
          s(w, g),
          s(o, B),
          s(o, v),
          s(v, m),
          s(o, E),
          y(i, c, b),
          y(i, H, b),
          s(H, K),
          y(i, R, b),
          y(i, n, b),
          s(n, h),
          s(h, z),
          s(n, Q),
          s(n, j),
          s(j, W),
          s(n, ce),
          s(n, te),
          s(te, me),
          s(n, _e),
          s(n, le),
          s(le, ge),
          s(n, f),
          s(n, he),
          s(he, Ke),
          y(i, Ge, b),
          y(i, ae, b),
          s(ae, ze),
          y(i, Ae, b),
          y(i, N, b),
          s(N, be),
          s(be, Qe),
          s(N, We),
          s(N, ve),
          s(ve, Xe),
          s(N, Ye),
          s(N, X),
          s(X, ke),
          s(ke, pe),
          s(pe, Ze),
          s(X, Fe),
          s(X, Ee),
          s(Ee, Ie),
          s(Ie, Je),
          s(X, Oe),
          s(X, Le),
          s(Le, xe),
          y(i, De, b),
          J(x, i, b),
          y(i, Me, b),
          J($, i, b),
          y(i, Te, b),
          J(ee, i, b),
          y(i, Be, b),
          y(i, ne, b),
          s(ne, He),
          (ye = !0);
      },
      p(i, [b]) {
        const C = {};
        b & 4 && (C.$$scope = { dirty: b, ctx: i }), G.$set(C);
        const Pe = {};
        b & 4 && (Pe.$$scope = { dirty: b, ctx: i }), x.$set(Pe);
        const oe = {};
        b & 1 && (oe.link = "content/" + i[0] + "/  "),
          b & 4 && (oe.$$scope = { dirty: b, ctx: i }),
          ee.$set(oe),
          (!ye || b & 1) && St(He, i[0]);
      },
      i(i) {
        ye ||
          (U(G.$$.fragment, i),
          U(x.$$.fragment, i),
          U($.$$.fragment, i),
          U(ee.$$.fragment, i),
          (ye = !0));
      },
      o(i) {
        V(G.$$.fragment, i),
          V(x.$$.fragment, i),
          V($.$$.fragment, i),
          V(ee.$$.fragment, i),
          (ye = !1);
      },
      d(i) {
        i && r(e),
          i && r(a),
          i && r(o),
          O(G),
          i && r(c),
          i && r(H),
          i && r(R),
          i && r(n),
          i && r(Ge),
          i && r(ae),
          i && r(Ae),
          i && r(N),
          i && r(De),
          O(x, i),
          i && r(Me),
          O($, i),
          i && r(Te),
          O(ee, i),
          i && r(Be),
          i && r(ne);
      },
    }
  );
}
function Ft(l, e, t) {
  let a;
  It(l, de, (_) => t(0, (a = _)));
  function o() {
    Qt();
  }
  return [a, o];
}
class Jt extends Ve {
  constructor(e) {
    super(), Ne(this, e, Ft, Zt, qe, {});
  }
}
const ll = Jt;
export { ll as component };
