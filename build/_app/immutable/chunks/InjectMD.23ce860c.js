var rt = Object.defineProperty;
var st = (s, e, n) =>
  e in s
    ? rt(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (s[e] = n);
var ye = (s, e, n) => (st(s, typeof e != "symbol" ? e + "" : e, n), n);
import {
  S as D,
  i as q,
  s as O,
  k as I,
  C as pe,
  l as A,
  m as R,
  F as de,
  h as p,
  n as m,
  p as ce,
  a2 as xe,
  b,
  G as le,
  g as h,
  v as L,
  d as g,
  f as N,
  a3 as ot,
  j as at,
  M as Y,
  N as we,
  Q as Z,
  R as M,
  T as U,
  U as H,
  o as Ye,
  e as z,
  Z as Re,
  a1 as ie,
  y as S,
  z as j,
  A as T,
  Y as re,
  a4 as se,
  B as y,
  x as P,
  a as fe,
  c as ue,
  q as ke,
  r as be,
  u as $e,
  J as F,
  _ as ft,
  a5 as Ee,
  H as ut,
  E as ct,
  a6 as ht,
  V as pt,
} from "./index.0e418277.js";
import "./ProgressBar.svelte_svelte_type_style_lang.077146c8.js";
function Ie(s) {
  let e, n, l;
  const t = s[13].default,
    i = Z(t, s, s[12], null);
  return {
    c() {
      (e = pe("text")), i && i.c(), this.h();
    },
    l(r) {
      e = de(r, "text", {
        x: !0,
        y: !0,
        "text-anchor": !0,
        "dominant-baseline": !0,
        "font-weight": !0,
        "font-size": !0,
        class: !0,
      });
      var a = R(e);
      i && i.l(a), a.forEach(p), this.h();
    },
    h() {
      m(e, "x", "50%"),
        m(e, "y", "50%"),
        m(e, "text-anchor", "middle"),
        m(e, "dominant-baseline", "middle"),
        m(e, "font-weight", "bold"),
        m(e, "font-size", s[2]),
        m(e, "class", (n = "progress-radial-text " + s[5]));
    },
    m(r, a) {
      b(r, e, a), i && i.m(e, null), (l = !0);
    },
    p(r, a) {
      i &&
        i.p &&
        (!l || a & 4096) &&
        M(i, t, r, r[12], l ? H(t, r[12], a, null) : U(r[12]), null),
        (!l || a & 4) && m(e, "font-size", r[2]),
        (!l || (a & 32 && n !== (n = "progress-radial-text " + r[5]))) &&
          m(e, "class", n);
    },
    i(r) {
      l || (h(i, r), (l = !0));
    },
    o(r) {
      g(i, r), (l = !1);
    },
    d(r) {
      r && p(e), i && i.d(r);
    },
  };
}
function dt(s) {
  let e,
    n,
    l,
    t,
    i,
    r,
    a = `${s[7]}
			${s[7]}`,
    o,
    f,
    u,
    d,
    _ = s[0] != null && s[0] >= 0 && s[10].default && Ie(s);
  return {
    c() {
      (e = I("figure")),
        (n = pe("svg")),
        (l = pe("circle")),
        (i = pe("circle")),
        _ && _.c(),
        this.h();
    },
    l(c) {
      e = A(c, "FIGURE", {
        class: !0,
        "data-testid": !0,
        role: !0,
        "aria-labelledby": !0,
        "aria-valuenow": !0,
        "aria-valuetext": !0,
        "aria-valuemin": !0,
        "aria-valuemax": !0,
      });
      var v = R(e);
      n = de(v, "svg", { viewBox: !0, class: !0 });
      var x = R(n);
      (l = de(x, "circle", {
        class: !0,
        "stroke-width": !0,
        r: !0,
        cx: !0,
        cy: !0,
      })),
        R(l).forEach(p),
        (i = de(x, "circle", {
          class: !0,
          "stroke-width": !0,
          r: !0,
          cx: !0,
          cy: !0,
        })),
        R(i).forEach(p),
        _ && _.l(x),
        x.forEach(p),
        v.forEach(p),
        this.h();
    },
    h() {
      m(l, "class", (t = "progress-radial-track " + Ae + " " + s[4])),
        m(l, "stroke-width", s[1]),
        m(l, "r", ae / 2),
        m(l, "cx", "50%"),
        m(l, "cy", "50%"),
        m(i, "class", (r = "progress-radial-meter " + Be + " " + s[3])),
        m(i, "stroke-width", s[1]),
        m(i, "r", ae / 2),
        m(i, "cx", "50%"),
        m(i, "cy", "50%"),
        ce(i, "stroke-dasharray", a),
        ce(i, "stroke-dashoffset", s[8]),
        m(n, "viewBox", "0 0 " + ae + " " + ae),
        m(n, "class", "rounded-full"),
        xe(n, "animate-spin", s[0] === void 0),
        m(e, "class", (o = "progress-radial " + s[9])),
        m(e, "data-testid", "progress-radial"),
        m(e, "role", "meter"),
        m(e, "aria-labelledby", s[6]),
        m(e, "aria-valuenow", (f = s[0] || 0)),
        m(
          e,
          "aria-valuetext",
          (u = s[0] ? `${s[0]}%` : "Indeterminate Spinner")
        ),
        m(e, "aria-valuemin", 0),
        m(e, "aria-valuemax", 100);
    },
    m(c, v) {
      b(c, e, v), le(e, n), le(n, l), le(n, i), _ && _.m(n, null), (d = !0);
    },
    p(c, [v]) {
      (!d ||
        (v & 16 && t !== (t = "progress-radial-track " + Ae + " " + c[4]))) &&
        m(l, "class", t),
        (!d || v & 2) && m(l, "stroke-width", c[1]),
        (!d ||
          (v & 8 && r !== (r = "progress-radial-meter " + Be + " " + c[3]))) &&
          m(i, "class", r),
        (!d || v & 2) && m(i, "stroke-width", c[1]),
        v & 128 &&
          a !==
            (a = `${c[7]}
			${c[7]}`) &&
          ce(i, "stroke-dasharray", a),
        v & 256 && ce(i, "stroke-dashoffset", c[8]),
        c[0] != null && c[0] >= 0 && c[10].default
          ? _
            ? (_.p(c, v), v & 1025 && h(_, 1))
            : ((_ = Ie(c)), _.c(), h(_, 1), _.m(n, null))
          : _ &&
            (L(),
            g(_, 1, 1, () => {
              _ = null;
            }),
            N()),
        (!d || v & 1) && xe(n, "animate-spin", c[0] === void 0),
        (!d || (v & 512 && o !== (o = "progress-radial " + c[9]))) &&
          m(e, "class", o),
        (!d || v & 64) && m(e, "aria-labelledby", c[6]),
        (!d || (v & 1 && f !== (f = c[0] || 0))) && m(e, "aria-valuenow", f),
        (!d ||
          (v & 1 && u !== (u = c[0] ? `${c[0]}%` : "Indeterminate Spinner"))) &&
          m(e, "aria-valuetext", u);
    },
    i(c) {
      d || (h(_), (d = !0));
    },
    o(c) {
      g(_), (d = !1);
    },
    d(c) {
      c && p(e), _ && _.d();
    },
  };
}
const gt = "progress-radial relative overflow-hidden",
  Ae = "fill-transparent",
  Be =
    "fill-transparent transition-[stroke-dashoffset] duration-200 -rotate-90 origin-[50%_50%]",
  ae = 512;
function _t(s, e, n) {
  let l,
    { $$slots: t = {}, $$scope: i } = e;
  const r = ot(t);
  let { value: a = void 0 } = e,
    { stroke: o = 40 } = e,
    { font: f = 56 } = e,
    { width: u = "w-36" } = e,
    { meter: d = "stroke-surface-900 dark:stroke-surface-50" } = e,
    { track: _ = "stroke-surface-500/30" } = e,
    { fill: c = "fill-token" } = e,
    { labelledby: v = "" } = e;
  const x = ae / 2;
  let W = x,
    B;
  function Q(E) {
    n(7, (W = x * 2 * Math.PI)), n(8, (B = W - (E / 100) * W));
  }
  return (
    Q(0),
    at(() => {
      Q(a === void 0 ? 25 : a);
    }),
    (s.$$set = (E) => {
      n(16, (e = Y(Y({}, e), we(E)))),
        "value" in E && n(0, (a = E.value)),
        "stroke" in E && n(1, (o = E.stroke)),
        "font" in E && n(2, (f = E.font)),
        "width" in E && n(11, (u = E.width)),
        "meter" in E && n(3, (d = E.meter)),
        "track" in E && n(4, (_ = E.track)),
        "fill" in E && n(5, (c = E.fill)),
        "labelledby" in E && n(6, (v = E.labelledby)),
        "$$scope" in E && n(12, (i = E.$$scope));
    }),
    (s.$$.update = () => {
      n(9, (l = `${gt} ${u} ${e.class ?? ""}`));
    }),
    (e = we(e)),
    [a, o, f, d, _, c, v, W, B, l, r, u, i, t]
  );
}
class mt extends D {
  constructor(e) {
    super(),
      q(this, e, _t, dt, O, {
        value: 0,
        stroke: 1,
        font: 2,
        width: 11,
        meter: 3,
        track: 4,
        fill: 5,
        labelledby: 6,
      });
  }
}
function kt() {
  const s = console.warn;
  (console.warn = (e) => {
    e.includes("unknown prop") || e.includes("unexpected slot") || s(e);
  }),
    Ye(() => {
      console.warn = s;
    });
}
function Ce(s, e, n) {
  const l = s.slice();
  return (l[18] = e[n]), l;
}
function Le(s, e, n) {
  const l = s.slice();
  return (l[18] = e[n]), l;
}
function Ne(s, e, n) {
  const l = s.slice();
  return (l[10] = e[n]), l;
}
function De(s, e, n) {
  const l = s.slice();
  return (l[13] = e[n]), (l[15] = n), l;
}
function qe(s, e, n) {
  const l = s.slice();
  return (l[16] = e[n]), (l[15] = n), l;
}
function Oe(s, e, n) {
  const l = s.slice();
  return (l[7] = e[n]), l;
}
function bt(s) {
  let e, n, l, t;
  const i = [vt, zt, wt],
    r = [];
  function a(o, f) {
    return o[0] === "table" ? 0 : o[0] === "list" ? 1 : 2;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, f) {
        let u = e;
        (e = a(o)),
          e === u
            ? r[e].p(o, f)
            : (L(),
              g(r[u], 1, 1, () => {
                r[u] = null;
              }),
              N(),
              (n = r[e]),
              n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
              h(n, 1),
              n.m(l.parentNode, l));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function $t(s) {
  let e,
    n,
    l = s[1],
    t = [];
  for (let r = 0; r < l.length; r += 1) t[r] = je(Oe(s, l, r));
  const i = (r) =>
    g(t[r], 1, 1, () => {
      t[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < t.length; r += 1) t[r].c();
      e = z();
    },
    l(r) {
      for (let a = 0; a < t.length; a += 1) t[a].l(r);
      e = z();
    },
    m(r, a) {
      for (let o = 0; o < t.length; o += 1) t[o] && t[o].m(r, a);
      b(r, e, a), (n = !0);
    },
    p(r, a) {
      if (a & 34) {
        l = r[1];
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = Oe(r, l, o);
          t[o]
            ? (t[o].p(f, a), h(t[o], 1))
            : ((t[o] = je(f)), t[o].c(), h(t[o], 1), t[o].m(e.parentNode, e));
        }
        for (L(), o = l.length; o < t.length; o += 1) i(o);
        N();
      }
    },
    i(r) {
      if (!n) {
        for (let a = 0; a < l.length; a += 1) h(t[a]);
        n = !0;
      }
    },
    o(r) {
      t = t.filter(Boolean);
      for (let a = 0; a < t.length; a += 1) g(t[a]);
      n = !1;
    },
    d(r) {
      ie(t, r), r && p(e);
    },
  };
}
function wt(s) {
  let e, n, l;
  const t = [s[6]];
  var i = s[5][s[0]];
  function r(a) {
    let o = { $$slots: { default: [yt] }, $$scope: { ctx: a } };
    for (let f = 0; f < t.length; f += 1) o = Y(o, t[f]);
    return { props: o };
  }
  return (
    i && (e = P(i, r(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(a) {
        e && j(e.$$.fragment, a), (n = z());
      },
      m(a, o) {
        e && T(e, a, o), b(a, n, o), (l = !0);
      },
      p(a, o) {
        const f = o & 64 ? re(t, [se(a[6])]) : {};
        if (
          (o & 8388706 && (f.$$scope = { dirty: o, ctx: a }),
          o & 33 && i !== (i = a[5][a[0]]))
        ) {
          if (e) {
            L();
            const u = e;
            g(u.$$.fragment, 1, 0, () => {
              y(u, 1);
            }),
              N();
          }
          i
            ? ((e = P(i, r(a))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else i && e.$set(f);
      },
      i(a) {
        l || (e && h(e.$$.fragment, a), (l = !0));
      },
      o(a) {
        e && g(e.$$.fragment, a), (l = !1);
      },
      d(a) {
        a && p(n), e && y(e, a);
      },
    }
  );
}
function zt(s) {
  let e, n, l, t;
  const i = [Rt, xt],
    r = [];
  function a(o, f) {
    return o[4] ? 0 : 1;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, f) {
        let u = e;
        (e = a(o)),
          e === u
            ? r[e].p(o, f)
            : (L(),
              g(r[u], 1, 1, () => {
                r[u] = null;
              }),
              N(),
              (n = r[e]),
              n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
              h(n, 1),
              n.m(l.parentNode, l));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function vt(s) {
  let e, n, l;
  var t = s[5].table;
  function i(r) {
    return { props: { $$slots: { default: [Pt] }, $$scope: { ctx: r } } };
  }
  return (
    t && (e = P(t, i(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(r) {
        e && j(e.$$.fragment, r), (n = z());
      },
      m(r, a) {
        e && T(e, r, a), b(r, n, a), (l = !0);
      },
      p(r, a) {
        const o = {};
        if (
          (a & 8388716 && (o.$$scope = { dirty: a, ctx: r }),
          a & 32 && t !== (t = r[5].table))
        ) {
          if (e) {
            L();
            const f = e;
            g(f.$$.fragment, 1, 0, () => {
              y(f, 1);
            }),
              N();
          }
          t
            ? ((e = P(t, i(r))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else t && e.$set(o);
      },
      i(r) {
        l || (e && h(e.$$.fragment, r), (l = !0));
      },
      o(r) {
        e && g(e.$$.fragment, r), (l = !1);
      },
      d(r) {
        r && p(n), e && y(e, r);
      },
    }
  );
}
function St(s) {
  let e = s[6].raw + "",
    n;
  return {
    c() {
      n = ke(e);
    },
    l(l) {
      n = be(l, e);
    },
    m(l, t) {
      b(l, n, t);
    },
    p(l, t) {
      t & 64 && e !== (e = l[6].raw + "") && $e(n, e);
    },
    i: F,
    o: F,
    d(l) {
      l && p(n);
    },
  };
}
function Tt(s) {
  let e, n;
  return (
    (e = new te({ props: { tokens: s[1], renderers: s[5] } })),
    {
      c() {
        S(e.$$.fragment);
      },
      l(l) {
        j(e.$$.fragment, l);
      },
      m(l, t) {
        T(e, l, t), (n = !0);
      },
      p(l, t) {
        const i = {};
        t & 2 && (i.tokens = l[1]), t & 32 && (i.renderers = l[5]), e.$set(i);
      },
      i(l) {
        n || (h(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        g(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        y(e, l);
      },
    }
  );
}
function yt(s) {
  let e, n, l, t;
  const i = [Tt, St],
    r = [];
  function a(o, f) {
    return o[1] ? 0 : 1;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, f) {
        let u = e;
        (e = a(o)),
          e === u
            ? r[e].p(o, f)
            : (L(),
              g(r[u], 1, 1, () => {
                r[u] = null;
              }),
              N(),
              (n = r[e]),
              n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
              h(n, 1),
              n.m(l.parentNode, l));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function xt(s) {
  let e, n, l;
  const t = [{ ordered: s[4] }, s[6]];
  var i = s[5].list;
  function r(a) {
    let o = { $$slots: { default: [It] }, $$scope: { ctx: a } };
    for (let f = 0; f < t.length; f += 1) o = Y(o, t[f]);
    return { props: o };
  }
  return (
    i && (e = P(i, r(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(a) {
        e && j(e.$$.fragment, a), (n = z());
      },
      m(a, o) {
        e && T(e, a, o), b(a, n, o), (l = !0);
      },
      p(a, o) {
        const f =
          o & 80
            ? re(t, [o & 16 && { ordered: a[4] }, o & 64 && se(a[6])])
            : {};
        if (
          (o & 8388704 && (f.$$scope = { dirty: o, ctx: a }),
          o & 32 && i !== (i = a[5].list))
        ) {
          if (e) {
            L();
            const u = e;
            g(u.$$.fragment, 1, 0, () => {
              y(u, 1);
            }),
              N();
          }
          i
            ? ((e = P(i, r(a))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else i && e.$set(f);
      },
      i(a) {
        l || (e && h(e.$$.fragment, a), (l = !0));
      },
      o(a) {
        e && g(e.$$.fragment, a), (l = !1);
      },
      d(a) {
        a && p(n), e && y(e, a);
      },
    }
  );
}
function Rt(s) {
  let e, n, l;
  const t = [{ ordered: s[4] }, s[6]];
  var i = s[5].list;
  function r(a) {
    let o = { $$slots: { default: [Bt] }, $$scope: { ctx: a } };
    for (let f = 0; f < t.length; f += 1) o = Y(o, t[f]);
    return { props: o };
  }
  return (
    i && (e = P(i, r(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(a) {
        e && j(e.$$.fragment, a), (n = z());
      },
      m(a, o) {
        e && T(e, a, o), b(a, n, o), (l = !0);
      },
      p(a, o) {
        const f =
          o & 80
            ? re(t, [o & 16 && { ordered: a[4] }, o & 64 && se(a[6])])
            : {};
        if (
          (o & 8388704 && (f.$$scope = { dirty: o, ctx: a }),
          o & 32 && i !== (i = a[5].list))
        ) {
          if (e) {
            L();
            const u = e;
            g(u.$$.fragment, 1, 0, () => {
              y(u, 1);
            }),
              N();
          }
          i
            ? ((e = P(i, r(a))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else i && e.$set(f);
      },
      i(a) {
        l || (e && h(e.$$.fragment, a), (l = !0));
      },
      o(a) {
        e && g(e.$$.fragment, a), (l = !1);
      },
      d(a) {
        a && p(n), e && y(e, a);
      },
    }
  );
}
function Et(s) {
  let e, n, l;
  return (
    (e = new te({ props: { tokens: s[18].tokens, renderers: s[5] } })),
    {
      c() {
        S(e.$$.fragment), (n = fe());
      },
      l(t) {
        j(e.$$.fragment, t), (n = ue(t));
      },
      m(t, i) {
        T(e, t, i), b(t, n, i), (l = !0);
      },
      p(t, i) {
        const r = {};
        i & 64 && (r.tokens = t[18].tokens),
          i & 32 && (r.renderers = t[5]),
          e.$set(r);
      },
      i(t) {
        l || (h(e.$$.fragment, t), (l = !0));
      },
      o(t) {
        g(e.$$.fragment, t), (l = !1);
      },
      d(t) {
        y(e, t), t && p(n);
      },
    }
  );
}
function Pe(s) {
  let e, n, l;
  const t = [s[18]];
  var i = s[5].unorderedlistitem || s[5].listitem;
  function r(a) {
    let o = { $$slots: { default: [Et] }, $$scope: { ctx: a } };
    for (let f = 0; f < t.length; f += 1) o = Y(o, t[f]);
    return { props: o };
  }
  return (
    i && (e = P(i, r(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(a) {
        e && j(e.$$.fragment, a), (n = z());
      },
      m(a, o) {
        e && T(e, a, o), b(a, n, o), (l = !0);
      },
      p(a, o) {
        const f = o & 64 ? re(t, [se(a[18])]) : {};
        if (
          (o & 8388704 && (f.$$scope = { dirty: o, ctx: a }),
          o & 32 && i !== (i = a[5].unorderedlistitem || a[5].listitem))
        ) {
          if (e) {
            L();
            const u = e;
            g(u.$$.fragment, 1, 0, () => {
              y(u, 1);
            }),
              N();
          }
          i
            ? ((e = P(i, r(a))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else i && e.$set(f);
      },
      i(a) {
        l || (e && h(e.$$.fragment, a), (l = !0));
      },
      o(a) {
        e && g(e.$$.fragment, a), (l = !1);
      },
      d(a) {
        a && p(n), e && y(e, a);
      },
    }
  );
}
function It(s) {
  let e,
    n,
    l = s[6].items,
    t = [];
  for (let r = 0; r < l.length; r += 1) t[r] = Pe(Ce(s, l, r));
  const i = (r) =>
    g(t[r], 1, 1, () => {
      t[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < t.length; r += 1) t[r].c();
      e = z();
    },
    l(r) {
      for (let a = 0; a < t.length; a += 1) t[a].l(r);
      e = z();
    },
    m(r, a) {
      for (let o = 0; o < t.length; o += 1) t[o] && t[o].m(r, a);
      b(r, e, a), (n = !0);
    },
    p(r, a) {
      if (a & 96) {
        l = r[6].items;
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = Ce(r, l, o);
          t[o]
            ? (t[o].p(f, a), h(t[o], 1))
            : ((t[o] = Pe(f)), t[o].c(), h(t[o], 1), t[o].m(e.parentNode, e));
        }
        for (L(), o = l.length; o < t.length; o += 1) i(o);
        N();
      }
    },
    i(r) {
      if (!n) {
        for (let a = 0; a < l.length; a += 1) h(t[a]);
        n = !0;
      }
    },
    o(r) {
      t = t.filter(Boolean);
      for (let a = 0; a < t.length; a += 1) g(t[a]);
      n = !1;
    },
    d(r) {
      ie(t, r), r && p(e);
    },
  };
}
function At(s) {
  let e, n, l;
  return (
    (e = new te({ props: { tokens: s[18].tokens, renderers: s[5] } })),
    {
      c() {
        S(e.$$.fragment), (n = fe());
      },
      l(t) {
        j(e.$$.fragment, t), (n = ue(t));
      },
      m(t, i) {
        T(e, t, i), b(t, n, i), (l = !0);
      },
      p(t, i) {
        const r = {};
        i & 64 && (r.tokens = t[18].tokens),
          i & 32 && (r.renderers = t[5]),
          e.$set(r);
      },
      i(t) {
        l || (h(e.$$.fragment, t), (l = !0));
      },
      o(t) {
        g(e.$$.fragment, t), (l = !1);
      },
      d(t) {
        y(e, t), t && p(n);
      },
    }
  );
}
function Ze(s) {
  let e, n, l;
  const t = [s[18]];
  var i = s[5].orderedlistitem || s[5].listitem;
  function r(a) {
    let o = { $$slots: { default: [At] }, $$scope: { ctx: a } };
    for (let f = 0; f < t.length; f += 1) o = Y(o, t[f]);
    return { props: o };
  }
  return (
    i && (e = P(i, r(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(a) {
        e && j(e.$$.fragment, a), (n = z());
      },
      m(a, o) {
        e && T(e, a, o), b(a, n, o), (l = !0);
      },
      p(a, o) {
        const f = o & 64 ? re(t, [se(a[18])]) : {};
        if (
          (o & 8388704 && (f.$$scope = { dirty: o, ctx: a }),
          o & 32 && i !== (i = a[5].orderedlistitem || a[5].listitem))
        ) {
          if (e) {
            L();
            const u = e;
            g(u.$$.fragment, 1, 0, () => {
              y(u, 1);
            }),
              N();
          }
          i
            ? ((e = P(i, r(a))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else i && e.$set(f);
      },
      i(a) {
        l || (e && h(e.$$.fragment, a), (l = !0));
      },
      o(a) {
        e && g(e.$$.fragment, a), (l = !1);
      },
      d(a) {
        a && p(n), e && y(e, a);
      },
    }
  );
}
function Bt(s) {
  let e,
    n,
    l = s[6].items,
    t = [];
  for (let r = 0; r < l.length; r += 1) t[r] = Ze(Le(s, l, r));
  const i = (r) =>
    g(t[r], 1, 1, () => {
      t[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < t.length; r += 1) t[r].c();
      e = z();
    },
    l(r) {
      for (let a = 0; a < t.length; a += 1) t[a].l(r);
      e = z();
    },
    m(r, a) {
      for (let o = 0; o < t.length; o += 1) t[o] && t[o].m(r, a);
      b(r, e, a), (n = !0);
    },
    p(r, a) {
      if (a & 96) {
        l = r[6].items;
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = Le(r, l, o);
          t[o]
            ? (t[o].p(f, a), h(t[o], 1))
            : ((t[o] = Ze(f)), t[o].c(), h(t[o], 1), t[o].m(e.parentNode, e));
        }
        for (L(), o = l.length; o < t.length; o += 1) i(o);
        N();
      }
    },
    i(r) {
      if (!n) {
        for (let a = 0; a < l.length; a += 1) h(t[a]);
        n = !0;
      }
    },
    o(r) {
      t = t.filter(Boolean);
      for (let a = 0; a < t.length; a += 1) g(t[a]);
      n = !1;
    },
    d(r) {
      ie(t, r), r && p(e);
    },
  };
}
function Ct(s) {
  let e, n, l;
  return (
    (e = new te({ props: { tokens: s[16].tokens, renderers: s[5] } })),
    {
      c() {
        S(e.$$.fragment), (n = fe());
      },
      l(t) {
        j(e.$$.fragment, t), (n = ue(t));
      },
      m(t, i) {
        T(e, t, i), b(t, n, i), (l = !0);
      },
      p(t, i) {
        const r = {};
        i & 4 && (r.tokens = t[16].tokens),
          i & 32 && (r.renderers = t[5]),
          e.$set(r);
      },
      i(t) {
        l || (h(e.$$.fragment, t), (l = !0));
      },
      o(t) {
        g(e.$$.fragment, t), (l = !1);
      },
      d(t) {
        y(e, t), t && p(n);
      },
    }
  );
}
function Me(s) {
  let e, n, l;
  var t = s[5].tablecell;
  function i(r) {
    return {
      props: {
        header: !0,
        align: r[6].align[r[15]] || "center",
        $$slots: { default: [Ct] },
        $$scope: { ctx: r },
      },
    };
  }
  return (
    t && (e = P(t, i(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(r) {
        e && j(e.$$.fragment, r), (n = z());
      },
      m(r, a) {
        e && T(e, r, a), b(r, n, a), (l = !0);
      },
      p(r, a) {
        const o = {};
        if (
          (a & 64 && (o.align = r[6].align[r[15]] || "center"),
          a & 8388644 && (o.$$scope = { dirty: a, ctx: r }),
          a & 32 && t !== (t = r[5].tablecell))
        ) {
          if (e) {
            L();
            const f = e;
            g(f.$$.fragment, 1, 0, () => {
              y(f, 1);
            }),
              N();
          }
          t
            ? ((e = P(t, i(r))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else t && e.$set(o);
      },
      i(r) {
        l || (e && h(e.$$.fragment, r), (l = !0));
      },
      o(r) {
        e && g(e.$$.fragment, r), (l = !1);
      },
      d(r) {
        r && p(n), e && y(e, r);
      },
    }
  );
}
function Lt(s) {
  let e,
    n,
    l = s[2],
    t = [];
  for (let r = 0; r < l.length; r += 1) t[r] = Me(qe(s, l, r));
  const i = (r) =>
    g(t[r], 1, 1, () => {
      t[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < t.length; r += 1) t[r].c();
      e = z();
    },
    l(r) {
      for (let a = 0; a < t.length; a += 1) t[a].l(r);
      e = z();
    },
    m(r, a) {
      for (let o = 0; o < t.length; o += 1) t[o] && t[o].m(r, a);
      b(r, e, a), (n = !0);
    },
    p(r, a) {
      if (a & 100) {
        l = r[2];
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = qe(r, l, o);
          t[o]
            ? (t[o].p(f, a), h(t[o], 1))
            : ((t[o] = Me(f)), t[o].c(), h(t[o], 1), t[o].m(e.parentNode, e));
        }
        for (L(), o = l.length; o < t.length; o += 1) i(o);
        N();
      }
    },
    i(r) {
      if (!n) {
        for (let a = 0; a < l.length; a += 1) h(t[a]);
        n = !0;
      }
    },
    o(r) {
      t = t.filter(Boolean);
      for (let a = 0; a < t.length; a += 1) g(t[a]);
      n = !1;
    },
    d(r) {
      ie(t, r), r && p(e);
    },
  };
}
function Nt(s) {
  let e, n, l;
  var t = s[5].tablerow;
  function i(r) {
    return { props: { $$slots: { default: [Lt] }, $$scope: { ctx: r } } };
  }
  return (
    t && (e = P(t, i(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(r) {
        e && j(e.$$.fragment, r), (n = z());
      },
      m(r, a) {
        e && T(e, r, a), b(r, n, a), (l = !0);
      },
      p(r, a) {
        const o = {};
        if (
          (a & 8388708 && (o.$$scope = { dirty: a, ctx: r }),
          a & 32 && t !== (t = r[5].tablerow))
        ) {
          if (e) {
            L();
            const f = e;
            g(f.$$.fragment, 1, 0, () => {
              y(f, 1);
            }),
              N();
          }
          t
            ? ((e = P(t, i(r))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else t && e.$set(o);
      },
      i(r) {
        l || (e && h(e.$$.fragment, r), (l = !0));
      },
      o(r) {
        e && g(e.$$.fragment, r), (l = !1);
      },
      d(r) {
        r && p(n), e && y(e, r);
      },
    }
  );
}
function Dt(s) {
  let e, n;
  return (
    (e = new te({ props: { tokens: s[13].tokens, renderers: s[5] } })),
    {
      c() {
        S(e.$$.fragment);
      },
      l(l) {
        j(e.$$.fragment, l);
      },
      m(l, t) {
        T(e, l, t), (n = !0);
      },
      p(l, t) {
        const i = {};
        t & 8 && (i.tokens = l[13].tokens),
          t & 32 && (i.renderers = l[5]),
          e.$set(i);
      },
      i(l) {
        n || (h(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        g(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        y(e, l);
      },
    }
  );
}
function Ue(s) {
  let e, n, l;
  var t = s[5].tablecell;
  function i(r) {
    return {
      props: {
        header: !1,
        align: r[6].align[r[15]] || "center",
        $$slots: { default: [Dt] },
        $$scope: { ctx: r },
      },
    };
  }
  return (
    t && (e = P(t, i(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(r) {
        e && j(e.$$.fragment, r), (n = z());
      },
      m(r, a) {
        e && T(e, r, a), b(r, n, a), (l = !0);
      },
      p(r, a) {
        const o = {};
        if (
          (a & 64 && (o.align = r[6].align[r[15]] || "center"),
          a & 8388648 && (o.$$scope = { dirty: a, ctx: r }),
          a & 32 && t !== (t = r[5].tablecell))
        ) {
          if (e) {
            L();
            const f = e;
            g(f.$$.fragment, 1, 0, () => {
              y(f, 1);
            }),
              N();
          }
          t
            ? ((e = P(t, i(r))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else t && e.$set(o);
      },
      i(r) {
        l || (e && h(e.$$.fragment, r), (l = !0));
      },
      o(r) {
        e && g(e.$$.fragment, r), (l = !1);
      },
      d(r) {
        r && p(n), e && y(e, r);
      },
    }
  );
}
function qt(s) {
  let e,
    n,
    l = s[10],
    t = [];
  for (let r = 0; r < l.length; r += 1) t[r] = Ue(De(s, l, r));
  const i = (r) =>
    g(t[r], 1, 1, () => {
      t[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < t.length; r += 1) t[r].c();
      e = fe();
    },
    l(r) {
      for (let a = 0; a < t.length; a += 1) t[a].l(r);
      e = ue(r);
    },
    m(r, a) {
      for (let o = 0; o < t.length; o += 1) t[o] && t[o].m(r, a);
      b(r, e, a), (n = !0);
    },
    p(r, a) {
      if (a & 104) {
        l = r[10];
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = De(r, l, o);
          t[o]
            ? (t[o].p(f, a), h(t[o], 1))
            : ((t[o] = Ue(f)), t[o].c(), h(t[o], 1), t[o].m(e.parentNode, e));
        }
        for (L(), o = l.length; o < t.length; o += 1) i(o);
        N();
      }
    },
    i(r) {
      if (!n) {
        for (let a = 0; a < l.length; a += 1) h(t[a]);
        n = !0;
      }
    },
    o(r) {
      t = t.filter(Boolean);
      for (let a = 0; a < t.length; a += 1) g(t[a]);
      n = !1;
    },
    d(r) {
      ie(t, r), r && p(e);
    },
  };
}
function He(s) {
  let e, n, l;
  var t = s[5].tablerow;
  function i(r) {
    return { props: { $$slots: { default: [qt] }, $$scope: { ctx: r } } };
  }
  return (
    t && (e = P(t, i(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = z());
      },
      l(r) {
        e && j(e.$$.fragment, r), (n = z());
      },
      m(r, a) {
        e && T(e, r, a), b(r, n, a), (l = !0);
      },
      p(r, a) {
        const o = {};
        if (
          (a & 8388712 && (o.$$scope = { dirty: a, ctx: r }),
          a & 32 && t !== (t = r[5].tablerow))
        ) {
          if (e) {
            L();
            const f = e;
            g(f.$$.fragment, 1, 0, () => {
              y(f, 1);
            }),
              N();
          }
          t
            ? ((e = P(t, i(r))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else t && e.$set(o);
      },
      i(r) {
        l || (e && h(e.$$.fragment, r), (l = !0));
      },
      o(r) {
        e && g(e.$$.fragment, r), (l = !1);
      },
      d(r) {
        r && p(n), e && y(e, r);
      },
    }
  );
}
function Ot(s) {
  let e,
    n,
    l = s[3],
    t = [];
  for (let r = 0; r < l.length; r += 1) t[r] = He(Ne(s, l, r));
  const i = (r) =>
    g(t[r], 1, 1, () => {
      t[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < t.length; r += 1) t[r].c();
      e = z();
    },
    l(r) {
      for (let a = 0; a < t.length; a += 1) t[a].l(r);
      e = z();
    },
    m(r, a) {
      for (let o = 0; o < t.length; o += 1) t[o] && t[o].m(r, a);
      b(r, e, a), (n = !0);
    },
    p(r, a) {
      if (a & 104) {
        l = r[3];
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = Ne(r, l, o);
          t[o]
            ? (t[o].p(f, a), h(t[o], 1))
            : ((t[o] = He(f)), t[o].c(), h(t[o], 1), t[o].m(e.parentNode, e));
        }
        for (L(), o = l.length; o < t.length; o += 1) i(o);
        N();
      }
    },
    i(r) {
      if (!n) {
        for (let a = 0; a < l.length; a += 1) h(t[a]);
        n = !0;
      }
    },
    o(r) {
      t = t.filter(Boolean);
      for (let a = 0; a < t.length; a += 1) g(t[a]);
      n = !1;
    },
    d(r) {
      ie(t, r), r && p(e);
    },
  };
}
function Pt(s) {
  let e, n, l, t, i;
  var r = s[5].tablehead;
  function a(u) {
    return { props: { $$slots: { default: [Nt] }, $$scope: { ctx: u } } };
  }
  r && (e = P(r, a(s)));
  var o = s[5].tablebody;
  function f(u) {
    return { props: { $$slots: { default: [Ot] }, $$scope: { ctx: u } } };
  }
  return (
    o && (l = P(o, f(s))),
    {
      c() {
        e && S(e.$$.fragment), (n = fe()), l && S(l.$$.fragment), (t = z());
      },
      l(u) {
        e && j(e.$$.fragment, u),
          (n = ue(u)),
          l && j(l.$$.fragment, u),
          (t = z());
      },
      m(u, d) {
        e && T(e, u, d), b(u, n, d), l && T(l, u, d), b(u, t, d), (i = !0);
      },
      p(u, d) {
        const _ = {};
        if (
          (d & 8388708 && (_.$$scope = { dirty: d, ctx: u }),
          d & 32 && r !== (r = u[5].tablehead))
        ) {
          if (e) {
            L();
            const v = e;
            g(v.$$.fragment, 1, 0, () => {
              y(v, 1);
            }),
              N();
          }
          r
            ? ((e = P(r, a(u))),
              S(e.$$.fragment),
              h(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        } else r && e.$set(_);
        const c = {};
        if (
          (d & 8388712 && (c.$$scope = { dirty: d, ctx: u }),
          d & 32 && o !== (o = u[5].tablebody))
        ) {
          if (l) {
            L();
            const v = l;
            g(v.$$.fragment, 1, 0, () => {
              y(v, 1);
            }),
              N();
          }
          o
            ? ((l = P(o, f(u))),
              S(l.$$.fragment),
              h(l.$$.fragment, 1),
              T(l, t.parentNode, t))
            : (l = null);
        } else o && l.$set(c);
      },
      i(u) {
        i || (e && h(e.$$.fragment, u), l && h(l.$$.fragment, u), (i = !0));
      },
      o(u) {
        e && g(e.$$.fragment, u), l && g(l.$$.fragment, u), (i = !1);
      },
      d(u) {
        e && y(e, u), u && p(n), u && p(t), l && y(l, u);
      },
    }
  );
}
function je(s) {
  let e, n;
  const l = [s[7], { renderers: s[5] }];
  let t = {};
  for (let i = 0; i < l.length; i += 1) t = Y(t, l[i]);
  return (
    (e = new te({ props: t })),
    {
      c() {
        S(e.$$.fragment);
      },
      l(i) {
        j(e.$$.fragment, i);
      },
      m(i, r) {
        T(e, i, r), (n = !0);
      },
      p(i, r) {
        const a =
          r & 34
            ? re(l, [r & 2 && se(i[7]), r & 32 && { renderers: i[5] }])
            : {};
        e.$set(a);
      },
      i(i) {
        n || (h(e.$$.fragment, i), (n = !0));
      },
      o(i) {
        g(e.$$.fragment, i), (n = !1);
      },
      d(i) {
        y(e, i);
      },
    }
  );
}
function Zt(s) {
  let e, n, l, t;
  const i = [$t, bt],
    r = [];
  function a(o, f) {
    return o[0] ? (o[5][o[0]] ? 1 : -1) : 0;
  }
  return (
    ~(e = a(s)) && (n = r[e] = i[e](s)),
    {
      c() {
        n && n.c(), (l = z());
      },
      l(o) {
        n && n.l(o), (l = z());
      },
      m(o, f) {
        ~e && r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, [f]) {
        let u = e;
        (e = a(o)),
          e === u
            ? ~e && r[e].p(o, f)
            : (n &&
                (L(),
                g(r[u], 1, 1, () => {
                  r[u] = null;
                }),
                N()),
              ~e
                ? ((n = r[e]),
                  n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
                  h(n, 1),
                  n.m(l.parentNode, l))
                : (n = null));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        ~e && r[e].d(o), o && p(l);
      },
    }
  );
}
function Mt(s, e, n) {
  const l = ["type", "tokens", "header", "rows", "ordered", "renderers"];
  let t = Re(e, l),
    { type: i = void 0 } = e,
    { tokens: r = void 0 } = e,
    { header: a = void 0 } = e,
    { rows: o = void 0 } = e,
    { ordered: f = !1 } = e,
    { renderers: u } = e;
  return (
    kt(),
    (s.$$set = (d) => {
      (e = Y(Y({}, e), we(d))),
        n(6, (t = Re(e, l))),
        "type" in d && n(0, (i = d.type)),
        "tokens" in d && n(1, (r = d.tokens)),
        "header" in d && n(2, (a = d.header)),
        "rows" in d && n(3, (o = d.rows)),
        "ordered" in d && n(4, (f = d.ordered)),
        "renderers" in d && n(5, (u = d.renderers));
    }),
    [i, r, a, o, f, u, t]
  );
}
let te = class extends D {
  constructor(e) {
    super(),
      q(this, e, Mt, Zt, O, {
        type: 0,
        tokens: 1,
        header: 2,
        rows: 3,
        ordered: 4,
        renderers: 5,
      });
  }
};
function Je() {
  return {
    async: !1,
    baseUrl: null,
    breaks: !1,
    extensions: null,
    gfm: !0,
    headerIds: !0,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: !0,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartypants: !1,
    tokenizer: null,
    walkTokens: null,
    xhtml: !1,
  };
}
let ne = Je();
function Ut(s) {
  ne = s;
}
const Ke = /[&<>"']/,
  Ht = new RegExp(Ke.source, "g"),
  et = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  jt = new RegExp(et.source, "g"),
  Qt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  Qe = (s) => Qt[s];
function G(s, e) {
  if (e) {
    if (Ke.test(s)) return s.replace(Ht, Qe);
  } else if (et.test(s)) return s.replace(jt, Qe);
  return s;
}
const Ft = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function tt(s) {
  return s.replace(
    Ft,
    (e, n) => (
      (n = n.toLowerCase()),
      n === "colon"
        ? ":"
        : n.charAt(0) === "#"
        ? n.charAt(1) === "x"
          ? String.fromCharCode(parseInt(n.substring(2), 16))
          : String.fromCharCode(+n.substring(1))
        : ""
    )
  );
}
const Gt = /(^|[^\[])\^/g;
function C(s, e) {
  (s = typeof s == "string" ? s : s.source), (e = e || "");
  const n = {
    replace: (l, t) => (
      (t = t.source || t), (t = t.replace(Gt, "$1")), (s = s.replace(l, t)), n
    ),
    getRegex: () => new RegExp(s, e),
  };
  return n;
}
const Wt = /[^\w:]/g,
  Xt = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function Fe(s, e, n) {
  if (s) {
    let l;
    try {
      l = decodeURIComponent(tt(n)).replace(Wt, "").toLowerCase();
    } catch {
      return null;
    }
    if (
      l.indexOf("javascript:") === 0 ||
      l.indexOf("vbscript:") === 0 ||
      l.indexOf("data:") === 0
    )
      return null;
  }
  e && !Xt.test(n) && (n = Kt(e, n));
  try {
    n = encodeURI(n).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return n;
}
const he = {},
  Vt = /^[^:]+:\/*[^/]*$/,
  Yt = /^([^:]+:)[\s\S]*$/,
  Jt = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function Kt(s, e) {
  he[" " + s] ||
    (Vt.test(s) ? (he[" " + s] = s + "/") : (he[" " + s] = ge(s, "/", !0))),
    (s = he[" " + s]);
  const n = s.indexOf(":") === -1;
  return e.substring(0, 2) === "//"
    ? n
      ? e
      : s.replace(Yt, "$1") + e
    : e.charAt(0) === "/"
    ? n
      ? e
      : s.replace(Jt, "$1") + e
    : s + e;
}
const _e = { exec: function () {} };
function Ge(s, e) {
  const n = s.replace(/\|/g, (i, r, a) => {
      let o = !1,
        f = r;
      for (; --f >= 0 && a[f] === "\\"; ) o = !o;
      return o ? "|" : " |";
    }),
    l = n.split(/ \|/);
  let t = 0;
  if (
    (l[0].trim() || l.shift(),
    l.length > 0 && !l[l.length - 1].trim() && l.pop(),
    l.length > e)
  )
    l.splice(e);
  else for (; l.length < e; ) l.push("");
  for (; t < l.length; t++) l[t] = l[t].trim().replace(/\\\|/g, "|");
  return l;
}
function ge(s, e, n) {
  const l = s.length;
  if (l === 0) return "";
  let t = 0;
  for (; t < l; ) {
    const i = s.charAt(l - t - 1);
    if (i === e && !n) t++;
    else if (i !== e && n) t++;
    else break;
  }
  return s.slice(0, l - t);
}
function en(s, e) {
  if (s.indexOf(e[1]) === -1) return -1;
  const n = s.length;
  let l = 0,
    t = 0;
  for (; t < n; t++)
    if (s[t] === "\\") t++;
    else if (s[t] === e[0]) l++;
    else if (s[t] === e[1] && (l--, l < 0)) return t;
  return -1;
}
function tn(s) {
  s &&
    s.sanitize &&
    !s.silent &&
    console.warn(
      "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
    );
}
function We(s, e) {
  if (e < 1) return "";
  let n = "";
  for (; e > 1; ) e & 1 && (n += s), (e >>= 1), (s += s);
  return n + s;
}
function Xe(s, e, n, l) {
  const t = e.href,
    i = e.title ? G(e.title) : null,
    r = s[1].replace(/\\([\[\]])/g, "$1");
  if (s[0].charAt(0) !== "!") {
    l.state.inLink = !0;
    const a = {
      type: "link",
      raw: n,
      href: t,
      title: i,
      text: r,
      tokens: l.inlineTokens(r),
    };
    return (l.state.inLink = !1), a;
  }
  return { type: "image", raw: n, href: t, title: i, text: G(r) };
}
function nn(s, e) {
  const n = s.match(/^(\s+)(?:```)/);
  if (n === null) return e;
  const l = n[1];
  return e
    .split(
      `
`
    )
    .map((t) => {
      const i = t.match(/^\s+/);
      if (i === null) return t;
      const [r] = i;
      return r.length >= l.length ? t.slice(l.length) : t;
    }).join(`
`);
}
class ze {
  constructor(e) {
    this.options = e || ne;
  }
  space(e) {
    const n = this.rules.block.newline.exec(e);
    if (n && n[0].length > 0) return { type: "space", raw: n[0] };
  }
  code(e) {
    const n = this.rules.block.code.exec(e);
    if (n) {
      const l = n[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic
          ? l
          : ge(
              l,
              `
`
            ),
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const l = n[0],
        t = nn(l, n[3] || "");
      return {
        type: "code",
        raw: l,
        lang: n[2]
          ? n[2].trim().replace(this.rules.inline._escapes, "$1")
          : n[2],
        text: t,
      };
    }
  }
  heading(e) {
    const n = this.rules.block.heading.exec(e);
    if (n) {
      let l = n[2].trim();
      if (/#$/.test(l)) {
        const t = ge(l, "#");
        (this.options.pedantic || !t || / $/.test(t)) && (l = t.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: l,
        tokens: this.lexer.inline(l),
      };
    }
  }
  hr(e) {
    const n = this.rules.block.hr.exec(e);
    if (n) return { type: "hr", raw: n[0] };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      const l = n[0].replace(/^ *>[ \t]?/gm, ""),
        t = this.lexer.state.top;
      this.lexer.state.top = !0;
      const i = this.lexer.blockTokens(l);
      return (
        (this.lexer.state.top = t),
        { type: "blockquote", raw: n[0], tokens: i, text: l }
      );
    }
  }
  list(e) {
    let n = this.rules.block.list.exec(e);
    if (n) {
      let l,
        t,
        i,
        r,
        a,
        o,
        f,
        u,
        d,
        _,
        c,
        v,
        x = n[1].trim();
      const W = x.length > 1,
        B = {
          type: "list",
          raw: "",
          ordered: W,
          start: W ? +x.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (x = W ? `\\d{1,9}\\${x.slice(-1)}` : `\\${x}`),
        this.options.pedantic && (x = W ? x : "[*+-]");
      const Q = new RegExp(`^( {0,3}${x})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      for (
        ;
        e && ((v = !1), !(!(n = Q.exec(e)) || this.rules.block.hr.test(e)));

      ) {
        if (
          ((l = n[0]),
          (e = e.substring(l.length)),
          (u = n[2]
            .split(
              `
`,
              1
            )[0]
            .replace(/^\t+/, (J) => " ".repeat(3 * J.length))),
          (d = e.split(
            `
`,
            1
          )[0]),
          this.options.pedantic
            ? ((r = 2), (c = u.trimLeft()))
            : ((r = n[2].search(/[^ ]/)),
              (r = r > 4 ? 1 : r),
              (c = u.slice(r)),
              (r += n[1].length)),
          (o = !1),
          !u &&
            /^ *$/.test(d) &&
            ((l +=
              d +
              `
`),
            (e = e.substring(d.length + 1)),
            (v = !0)),
          !v)
        ) {
          const J = new RegExp(
              `^ {0,${Math.min(
                3,
                r - 1
              )}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
            ),
            X = new RegExp(
              `^ {0,${Math.min(
                3,
                r - 1
              )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
            ),
            V = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`),
            oe = new RegExp(`^ {0,${Math.min(3, r - 1)}}#`);
          for (
            ;
            e &&
            ((_ = e.split(
              `
`,
              1
            )[0]),
            (d = _),
            this.options.pedantic &&
              (d = d.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
            !(V.test(d) || oe.test(d) || J.test(d) || X.test(e)));

          ) {
            if (d.search(/[^ ]/) >= r || !d.trim())
              c +=
                `
` + d.slice(r);
            else {
              if (
                o ||
                u.search(/[^ ]/) >= 4 ||
                V.test(u) ||
                oe.test(u) ||
                X.test(u)
              )
                break;
              c +=
                `
` + d;
            }
            !o && !d.trim() && (o = !0),
              (l +=
                _ +
                `
`),
              (e = e.substring(_.length + 1)),
              (u = d.slice(r));
          }
        }
        B.loose || (f ? (B.loose = !0) : /\n *\n *$/.test(l) && (f = !0)),
          this.options.gfm &&
            ((t = /^\[[ xX]\] /.exec(c)),
            t && ((i = t[0] !== "[ ] "), (c = c.replace(/^\[[ xX]\] +/, "")))),
          B.items.push({
            type: "list_item",
            raw: l,
            task: !!t,
            checked: i,
            loose: !1,
            text: c,
          }),
          (B.raw += l);
      }
      (B.items[B.items.length - 1].raw = l.trimRight()),
        (B.items[B.items.length - 1].text = c.trimRight()),
        (B.raw = B.raw.trimRight());
      const E = B.items.length;
      for (a = 0; a < E; a++)
        if (
          ((this.lexer.state.top = !1),
          (B.items[a].tokens = this.lexer.blockTokens(B.items[a].text, [])),
          !B.loose)
        ) {
          const J = B.items[a].tokens.filter((V) => V.type === "space"),
            X = J.length > 0 && J.some((V) => /\n.*\n/.test(V.raw));
          B.loose = X;
        }
      if (B.loose) for (a = 0; a < E; a++) B.items[a].loose = !0;
      return B;
    }
  }
  html(e) {
    const n = this.rules.block.html.exec(e);
    if (n) {
      const l = {
        type: "html",
        raw: n[0],
        pre:
          !this.options.sanitizer &&
          (n[1] === "pre" || n[1] === "script" || n[1] === "style"),
        text: n[0],
      };
      if (this.options.sanitize) {
        const t = this.options.sanitizer
          ? this.options.sanitizer(n[0])
          : G(n[0]);
        (l.type = "paragraph"), (l.text = t), (l.tokens = this.lexer.inline(t));
      }
      return l;
    }
  }
  def(e) {
    const n = this.rules.block.def.exec(e);
    if (n) {
      const l = n[1].toLowerCase().replace(/\s+/g, " "),
        t = n[2]
          ? n[2]
              .replace(/^<(.*)>$/, "$1")
              .replace(this.rules.inline._escapes, "$1")
          : "",
        i = n[3]
          ? n[3]
              .substring(1, n[3].length - 1)
              .replace(this.rules.inline._escapes, "$1")
          : n[3];
      return { type: "def", tag: l, raw: n[0], href: t, title: i };
    }
  }
  table(e) {
    const n = this.rules.block.table.exec(e);
    if (n) {
      const l = {
        type: "table",
        header: Ge(n[1]).map((t) => ({ text: t })),
        align: n[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows:
          n[3] && n[3].trim()
            ? n[3].replace(/\n[ \t]*$/, "").split(`
`)
            : [],
      };
      if (l.header.length === l.align.length) {
        l.raw = n[0];
        let t = l.align.length,
          i,
          r,
          a,
          o;
        for (i = 0; i < t; i++)
          /^ *-+: *$/.test(l.align[i])
            ? (l.align[i] = "right")
            : /^ *:-+: *$/.test(l.align[i])
            ? (l.align[i] = "center")
            : /^ *:-+ *$/.test(l.align[i])
            ? (l.align[i] = "left")
            : (l.align[i] = null);
        for (t = l.rows.length, i = 0; i < t; i++)
          l.rows[i] = Ge(l.rows[i], l.header.length).map((f) => ({ text: f }));
        for (t = l.header.length, r = 0; r < t; r++)
          l.header[r].tokens = this.lexer.inline(l.header[r].text);
        for (t = l.rows.length, r = 0; r < t; r++)
          for (o = l.rows[r], a = 0; a < o.length; a++)
            o[a].tokens = this.lexer.inline(o[a].text);
        return l;
      }
    }
  }
  lheading(e) {
    const n = this.rules.block.lheading.exec(e);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1]),
      };
  }
  paragraph(e) {
    const n = this.rules.block.paragraph.exec(e);
    if (n) {
      const l =
        n[1].charAt(n[1].length - 1) ===
        `
`
          ? n[1].slice(0, -1)
          : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: l,
        tokens: this.lexer.inline(l),
      };
    }
  }
  text(e) {
    const n = this.rules.block.text.exec(e);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0]),
      };
  }
  escape(e) {
    const n = this.rules.inline.escape.exec(e);
    if (n) return { type: "escape", raw: n[0], text: G(n[1]) };
  }
  tag(e) {
    const n = this.rules.inline.tag.exec(e);
    if (n)
      return (
        !this.lexer.state.inLink && /^<a /i.test(n[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(n[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: this.options.sanitize ? "text" : "html",
          raw: n[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(n[0])
              : G(n[0])
            : n[0],
        }
      );
  }
  link(e) {
    const n = this.rules.inline.link.exec(e);
    if (n) {
      const l = n[2].trim();
      if (!this.options.pedantic && /^</.test(l)) {
        if (!/>$/.test(l)) return;
        const r = ge(l.slice(0, -1), "\\");
        if ((l.length - r.length) % 2 === 0) return;
      } else {
        const r = en(n[2], "()");
        if (r > -1) {
          const o = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + r;
          (n[2] = n[2].substring(0, r)),
            (n[0] = n[0].substring(0, o).trim()),
            (n[3] = "");
        }
      }
      let t = n[2],
        i = "";
      if (this.options.pedantic) {
        const r = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(t);
        r && ((t = r[1]), (i = r[3]));
      } else i = n[3] ? n[3].slice(1, -1) : "";
      return (
        (t = t.trim()),
        /^</.test(t) &&
          (this.options.pedantic && !/>$/.test(l)
            ? (t = t.slice(1))
            : (t = t.slice(1, -1))),
        Xe(
          n,
          {
            href: t && t.replace(this.rules.inline._escapes, "$1"),
            title: i && i.replace(this.rules.inline._escapes, "$1"),
          },
          n[0],
          this.lexer
        )
      );
    }
  }
  reflink(e, n) {
    let l;
    if (
      (l = this.rules.inline.reflink.exec(e)) ||
      (l = this.rules.inline.nolink.exec(e))
    ) {
      let t = (l[2] || l[1]).replace(/\s+/g, " ");
      if (((t = n[t.toLowerCase()]), !t)) {
        const i = l[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return Xe(l, t, l[0], this.lexer);
    }
  }
  emStrong(e, n, l = "") {
    let t = this.rules.inline.emStrong.lDelim.exec(e);
    if (!t || (t[3] && l.match(/[\p{L}\p{N}]/u))) return;
    const i = t[1] || t[2] || "";
    if (!i || (i && (l === "" || this.rules.inline.punctuation.exec(l)))) {
      const r = t[0].length - 1;
      let a,
        o,
        f = r,
        u = 0;
      const d =
        t[0][0] === "*"
          ? this.rules.inline.emStrong.rDelimAst
          : this.rules.inline.emStrong.rDelimUnd;
      for (
        d.lastIndex = 0, n = n.slice(-1 * e.length + r);
        (t = d.exec(n)) != null;

      ) {
        if (((a = t[1] || t[2] || t[3] || t[4] || t[5] || t[6]), !a)) continue;
        if (((o = a.length), t[3] || t[4])) {
          f += o;
          continue;
        } else if ((t[5] || t[6]) && r % 3 && !((r + o) % 3)) {
          u += o;
          continue;
        }
        if (((f -= o), f > 0)) continue;
        o = Math.min(o, o + f + u);
        const _ = e.slice(0, r + t.index + (t[0].length - a.length) + o);
        if (Math.min(r, o) % 2) {
          const v = _.slice(1, -1);
          return {
            type: "em",
            raw: _,
            text: v,
            tokens: this.lexer.inlineTokens(v),
          };
        }
        const c = _.slice(2, -2);
        return {
          type: "strong",
          raw: _,
          text: c,
          tokens: this.lexer.inlineTokens(c),
        };
      }
    }
  }
  codespan(e) {
    const n = this.rules.inline.code.exec(e);
    if (n) {
      let l = n[2].replace(/\n/g, " ");
      const t = /[^ ]/.test(l),
        i = /^ /.test(l) && / $/.test(l);
      return (
        t && i && (l = l.substring(1, l.length - 1)),
        (l = G(l, !0)),
        { type: "codespan", raw: n[0], text: l }
      );
    }
  }
  br(e) {
    const n = this.rules.inline.br.exec(e);
    if (n) return { type: "br", raw: n[0] };
  }
  del(e) {
    const n = this.rules.inline.del.exec(e);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2]),
      };
  }
  autolink(e, n) {
    const l = this.rules.inline.autolink.exec(e);
    if (l) {
      let t, i;
      return (
        l[2] === "@"
          ? ((t = G(this.options.mangle ? n(l[1]) : l[1])), (i = "mailto:" + t))
          : ((t = G(l[1])), (i = t)),
        {
          type: "link",
          raw: l[0],
          text: t,
          href: i,
          tokens: [{ type: "text", raw: t, text: t }],
        }
      );
    }
  }
  url(e, n) {
    let l;
    if ((l = this.rules.inline.url.exec(e))) {
      let t, i;
      if (l[2] === "@")
        (t = G(this.options.mangle ? n(l[0]) : l[0])), (i = "mailto:" + t);
      else {
        let r;
        do (r = l[0]), (l[0] = this.rules.inline._backpedal.exec(l[0])[0]);
        while (r !== l[0]);
        (t = G(l[0])), l[1] === "www." ? (i = "http://" + l[0]) : (i = l[0]);
      }
      return {
        type: "link",
        raw: l[0],
        text: t,
        href: i,
        tokens: [{ type: "text", raw: t, text: t }],
      };
    }
  }
  inlineText(e, n) {
    const l = this.rules.inline.text.exec(e);
    if (l) {
      let t;
      return (
        this.lexer.state.inRawBlock
          ? (t = this.options.sanitize
              ? this.options.sanitizer
                ? this.options.sanitizer(l[0])
                : G(l[0])
              : l[0])
          : (t = G(this.options.smartypants ? n(l[0]) : l[0])),
        { type: "text", raw: l[0], text: t }
      );
    }
  }
}
const $ = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences:
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: _e,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph:
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/,
};
$._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
$._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
$.def = C($.def)
  .replace("label", $._label)
  .replace("title", $._title)
  .getRegex();
$.bullet = /(?:[*+-]|\d{1,9}[.)])/;
$.listItemStart = C(/^( *)(bull) */)
  .replace("bull", $.bullet)
  .getRegex();
$.list = C($.list)
  .replace(/bull/g, $.bullet)
  .replace(
    "hr",
    "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
  )
  .replace("def", "\\n+(?=" + $.def.source + ")")
  .getRegex();
$._tag =
  "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
$._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
$.html = C($.html, "i")
  .replace("comment", $._comment)
  .replace("tag", $._tag)
  .replace(
    "attribute",
    / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
  )
  .getRegex();
$.paragraph = C($._paragraph)
  .replace("hr", $.hr)
  .replace("heading", " {0,3}#{1,6} ")
  .replace("|lheading", "")
  .replace("|table", "")
  .replace("blockquote", " {0,3}>")
  .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
  .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
  .replace(
    "html",
    "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
  )
  .replace("tag", $._tag)
  .getRegex();
$.blockquote = C($.blockquote).replace("paragraph", $.paragraph).getRegex();
$.normal = { ...$ };
$.gfm = {
  ...$.normal,
  table:
    "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
};
$.gfm.table = C($.gfm.table)
  .replace("hr", $.hr)
  .replace("heading", " {0,3}#{1,6} ")
  .replace("blockquote", " {0,3}>")
  .replace("code", " {4}[^\\n]")
  .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
  .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
  .replace(
    "html",
    "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
  )
  .replace("tag", $._tag)
  .getRegex();
$.gfm.paragraph = C($._paragraph)
  .replace("hr", $.hr)
  .replace("heading", " {0,3}#{1,6} ")
  .replace("|lheading", "")
  .replace("table", $.gfm.table)
  .replace("blockquote", " {0,3}>")
  .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
  .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
  .replace(
    "html",
    "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
  )
  .replace("tag", $._tag)
  .getRegex();
$.pedantic = {
  ...$.normal,
  html: C(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  )
    .replace("comment", $._comment)
    .replace(
      /tag/g,
      "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
    )
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: _e,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: C($.normal._paragraph)
    .replace("hr", $.hr)
    .replace(
      "heading",
      ` *#{1,6} *[^
]`
    )
    .replace("lheading", $.lheading)
    .replace("blockquote", " {0,3}>")
    .replace("|fences", "")
    .replace("|list", "")
    .replace("|html", "")
    .getRegex(),
};
const k = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: _e,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst:
      /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd:
      /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: _e,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/,
};
k._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
k.punctuation = C(k.punctuation)
  .replace(/punctuation/g, k._punctuation)
  .getRegex();
k.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
k.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
k._comment = C($._comment).replace("(?:-->|$)", "-->").getRegex();
k.emStrong.lDelim = C(k.emStrong.lDelim)
  .replace(/punct/g, k._punctuation)
  .getRegex();
k.emStrong.rDelimAst = C(k.emStrong.rDelimAst, "g")
  .replace(/punct/g, k._punctuation)
  .getRegex();
k.emStrong.rDelimUnd = C(k.emStrong.rDelimUnd, "g")
  .replace(/punct/g, k._punctuation)
  .getRegex();
k._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
k._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
k._email =
  /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
k.autolink = C(k.autolink)
  .replace("scheme", k._scheme)
  .replace("email", k._email)
  .getRegex();
k._attribute =
  /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
k.tag = C(k.tag)
  .replace("comment", k._comment)
  .replace("attribute", k._attribute)
  .getRegex();
k._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
k._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
k._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
k.link = C(k.link)
  .replace("label", k._label)
  .replace("href", k._href)
  .replace("title", k._title)
  .getRegex();
k.reflink = C(k.reflink)
  .replace("label", k._label)
  .replace("ref", $._label)
  .getRegex();
k.nolink = C(k.nolink).replace("ref", $._label).getRegex();
k.reflinkSearch = C(k.reflinkSearch, "g")
  .replace("reflink", k.reflink)
  .replace("nolink", k.nolink)
  .getRegex();
k.normal = { ...k };
k.pedantic = {
  ...k.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g,
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g,
  },
  link: C(/^!?\[(label)\]\((.*?)\)/)
    .replace("label", k._label)
    .getRegex(),
  reflink: C(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace("label", k._label)
    .getRegex(),
};
k.gfm = {
  ...k.normal,
  escape: C(k.escape).replace("])", "~|])").getRegex(),
  _extended_email:
    /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal:
    /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
};
k.gfm.url = C(k.gfm.url, "i")
  .replace("email", k.gfm._extended_email)
  .getRegex();
k.breaks = {
  ...k.gfm,
  br: C(k.br).replace("{2,}", "*").getRegex(),
  text: C(k.gfm.text)
    .replace("\\b_", "\\b_| {2,}\\n")
    .replace(/\{2,\}/g, "*")
    .getRegex(),
};
function ln(s) {
  return s
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/\.{3}/g, "…");
}
function Ve(s) {
  let e = "",
    n,
    l;
  const t = s.length;
  for (n = 0; n < t; n++)
    (l = s.charCodeAt(n)),
      Math.random() > 0.5 && (l = "x" + l.toString(16)),
      (e += "&#" + l + ";");
  return e;
}
class K {
  constructor(e) {
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || ne),
      (this.options.tokenizer = this.options.tokenizer || new ze()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
    const n = { block: $.normal, inline: k.normal };
    this.options.pedantic
      ? ((n.block = $.pedantic), (n.inline = k.pedantic))
      : this.options.gfm &&
        ((n.block = $.gfm),
        this.options.breaks ? (n.inline = k.breaks) : (n.inline = k.gfm)),
      (this.tokenizer.rules = n);
  }
  static get rules() {
    return { block: $, inline: k };
  }
  static lex(e, n) {
    return new K(n).lex(e);
  }
  static lexInline(e, n) {
    return new K(n).inlineTokens(e);
  }
  lex(e) {
    (e = e.replace(
      /\r\n|\r/g,
      `
`
    )),
      this.blockTokens(e, this.tokens);
    let n;
    for (; (n = this.inlineQueue.shift()); ) this.inlineTokens(n.src, n.tokens);
    return this.tokens;
  }
  blockTokens(e, n = []) {
    this.options.pedantic
      ? (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
      : (e = e.replace(
          /^( *)(\t+)/gm,
          (a, o, f) => o + "    ".repeat(f.length)
        ));
    let l, t, i, r;
    for (; e; )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some((a) =>
            (l = a.call({ lexer: this }, e, n))
              ? ((e = e.substring(l.raw.length)), n.push(l), !0)
              : !1
          )
        )
      ) {
        if ((l = this.tokenizer.space(e))) {
          (e = e.substring(l.raw.length)),
            l.raw.length === 1 && n.length > 0
              ? (n[n.length - 1].raw += `
`)
              : n.push(l);
          continue;
        }
        if ((l = this.tokenizer.code(e))) {
          (e = e.substring(l.raw.length)),
            (t = n[n.length - 1]),
            t && (t.type === "paragraph" || t.type === "text")
              ? ((t.raw +=
                  `
` + l.raw),
                (t.text +=
                  `
` + l.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = t.text))
              : n.push(l);
          continue;
        }
        if ((l = this.tokenizer.fences(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.heading(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.hr(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.blockquote(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.list(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.html(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.def(e))) {
          (e = e.substring(l.raw.length)),
            (t = n[n.length - 1]),
            t && (t.type === "paragraph" || t.type === "text")
              ? ((t.raw +=
                  `
` + l.raw),
                (t.text +=
                  `
` + l.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = t.text))
              : this.tokens.links[l.tag] ||
                (this.tokens.links[l.tag] = { href: l.href, title: l.title });
          continue;
        }
        if ((l = this.tokenizer.table(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.lheading(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if (
          ((i = e),
          this.options.extensions && this.options.extensions.startBlock)
        ) {
          let a = 1 / 0;
          const o = e.slice(1);
          let f;
          this.options.extensions.startBlock.forEach(function (u) {
            (f = u.call({ lexer: this }, o)),
              typeof f == "number" && f >= 0 && (a = Math.min(a, f));
          }),
            a < 1 / 0 && a >= 0 && (i = e.substring(0, a + 1));
        }
        if (this.state.top && (l = this.tokenizer.paragraph(i))) {
          (t = n[n.length - 1]),
            r && t.type === "paragraph"
              ? ((t.raw +=
                  `
` + l.raw),
                (t.text +=
                  `
` + l.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = t.text))
              : n.push(l),
            (r = i.length !== e.length),
            (e = e.substring(l.raw.length));
          continue;
        }
        if ((l = this.tokenizer.text(e))) {
          (e = e.substring(l.raw.length)),
            (t = n[n.length - 1]),
            t && t.type === "text"
              ? ((t.raw +=
                  `
` + l.raw),
                (t.text +=
                  `
` + l.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = t.text))
              : n.push(l);
          continue;
        }
        if (e) {
          const a = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(a);
            break;
          } else throw new Error(a);
        }
      }
    return (this.state.top = !0), n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  inlineTokens(e, n = []) {
    let l,
      t,
      i,
      r = e,
      a,
      o,
      f;
    if (this.tokens.links) {
      const u = Object.keys(this.tokens.links);
      if (u.length > 0)
        for (
          ;
          (a = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null;

        )
          u.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) &&
            (r =
              r.slice(0, a.index) +
              "[" +
              We("a", a[0].length - 2) +
              "]" +
              r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (a = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; )
      r =
        r.slice(0, a.index) +
        "[" +
        We("a", a[0].length - 2) +
        "]" +
        r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (a = this.tokenizer.rules.inline.escapedEmSt.exec(r)) != null; )
      (r =
        r.slice(0, a.index + a[0].length - 2) +
        "++" +
        r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex)),
        this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
    for (; e; )
      if (
        (o || (f = ""),
        (o = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some((u) =>
            (l = u.call({ lexer: this }, e, n))
              ? ((e = e.substring(l.raw.length)), n.push(l), !0)
              : !1
          )
        ))
      ) {
        if ((l = this.tokenizer.escape(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.tag(e))) {
          (e = e.substring(l.raw.length)),
            (t = n[n.length - 1]),
            t && l.type === "text" && t.type === "text"
              ? ((t.raw += l.raw), (t.text += l.text))
              : n.push(l);
          continue;
        }
        if ((l = this.tokenizer.link(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.reflink(e, this.tokens.links))) {
          (e = e.substring(l.raw.length)),
            (t = n[n.length - 1]),
            t && l.type === "text" && t.type === "text"
              ? ((t.raw += l.raw), (t.text += l.text))
              : n.push(l);
          continue;
        }
        if ((l = this.tokenizer.emStrong(e, r, f))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.codespan(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.br(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.del(e))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.autolink(e, Ve))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if (!this.state.inLink && (l = this.tokenizer.url(e, Ve))) {
          (e = e.substring(l.raw.length)), n.push(l);
          continue;
        }
        if (
          ((i = e),
          this.options.extensions && this.options.extensions.startInline)
        ) {
          let u = 1 / 0;
          const d = e.slice(1);
          let _;
          this.options.extensions.startInline.forEach(function (c) {
            (_ = c.call({ lexer: this }, d)),
              typeof _ == "number" && _ >= 0 && (u = Math.min(u, _));
          }),
            u < 1 / 0 && u >= 0 && (i = e.substring(0, u + 1));
        }
        if ((l = this.tokenizer.inlineText(i, ln))) {
          (e = e.substring(l.raw.length)),
            l.raw.slice(-1) !== "_" && (f = l.raw.slice(-1)),
            (o = !0),
            (t = n[n.length - 1]),
            t && t.type === "text"
              ? ((t.raw += l.raw), (t.text += l.text))
              : n.push(l);
          continue;
        }
        if (e) {
          const u = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(u);
            break;
          } else throw new Error(u);
        }
      }
    return n;
  }
}
class ve {
  constructor(e) {
    this.options = e || ne;
  }
  code(e, n, l) {
    const t = (n || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const i = this.options.highlight(e, t);
      i != null && i !== e && ((l = !0), (e = i));
    }
    return (
      (e =
        e.replace(/\n$/, "") +
        `
`),
      t
        ? '<pre><code class="' +
          this.options.langPrefix +
          G(t) +
          '">' +
          (l ? e : G(e, !0)) +
          `</code></pre>
`
        : "<pre><code>" +
          (l ? e : G(e, !0)) +
          `</code></pre>
`
    );
  }
  blockquote(e) {
    return `<blockquote>
${e}</blockquote>
`;
  }
  html(e) {
    return e;
  }
  heading(e, n, l, t) {
    if (this.options.headerIds) {
      const i = this.options.headerPrefix + t.slug(l);
      return `<h${n} id="${i}">${e}</h${n}>
`;
    }
    return `<h${n}>${e}</h${n}>
`;
  }
  hr() {
    return this.options.xhtml
      ? `<hr/>
`
      : `<hr>
`;
  }
  list(e, n, l) {
    const t = n ? "ol" : "ul",
      i = n && l !== 1 ? ' start="' + l + '"' : "";
    return (
      "<" +
      t +
      i +
      `>
` +
      e +
      "</" +
      t +
      `>
`
    );
  }
  listitem(e) {
    return `<li>${e}</li>
`;
  }
  checkbox(e) {
    return (
      "<input " +
      (e ? 'checked="" ' : "") +
      'disabled="" type="checkbox"' +
      (this.options.xhtml ? " /" : "") +
      "> "
    );
  }
  paragraph(e) {
    return `<p>${e}</p>
`;
  }
  table(e, n) {
    return (
      n && (n = `<tbody>${n}</tbody>`),
      `<table>
<thead>
` +
        e +
        `</thead>
` +
        n +
        `</table>
`
    );
  }
  tablerow(e) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e, n) {
    const l = n.header ? "th" : "td";
    return (
      (n.align ? `<${l} align="${n.align}">` : `<${l}>`) +
      e +
      `</${l}>
`
    );
  }
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, n, l) {
    if (((e = Fe(this.options.sanitize, this.options.baseUrl, e)), e === null))
      return l;
    let t = '<a href="' + e + '"';
    return n && (t += ' title="' + n + '"'), (t += ">" + l + "</a>"), t;
  }
  image(e, n, l) {
    if (((e = Fe(this.options.sanitize, this.options.baseUrl, e)), e === null))
      return l;
    let t = `<img src="${e}" alt="${l}"`;
    return (
      n && (t += ` title="${n}"`), (t += this.options.xhtml ? "/>" : ">"), t
    );
  }
  text(e) {
    return e;
  }
}
class nt {
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, n, l) {
    return "" + l;
  }
  image(e, n, l) {
    return "" + l;
  }
  br() {
    return "";
  }
}
class Se {
  constructor() {
    this.seen = {};
  }
  serialize(e) {
    return e
      .toLowerCase()
      .trim()
      .replace(/<[!\/a-z].*?>/gi, "")
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ""
      )
      .replace(/\s/g, "-");
  }
  getNextSafeSlug(e, n) {
    let l = e,
      t = 0;
    if (this.seen.hasOwnProperty(l)) {
      t = this.seen[e];
      do t++, (l = e + "-" + t);
      while (this.seen.hasOwnProperty(l));
    }
    return n || ((this.seen[e] = t), (this.seen[l] = 0)), l;
  }
  slug(e, n = {}) {
    const l = this.serialize(e);
    return this.getNextSafeSlug(l, n.dryrun);
  }
}
class ee {
  constructor(e) {
    (this.options = e || ne),
      (this.options.renderer = this.options.renderer || new ve()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new nt()),
      (this.slugger = new Se());
  }
  static parse(e, n) {
    return new ee(n).parse(e);
  }
  static parseInline(e, n) {
    return new ee(n).parseInline(e);
  }
  parse(e, n = !0) {
    let l = "",
      t,
      i,
      r,
      a,
      o,
      f,
      u,
      d,
      _,
      c,
      v,
      x,
      W,
      B,
      Q,
      E,
      J,
      X,
      V;
    const oe = e.length;
    for (t = 0; t < oe; t++) {
      if (
        ((c = e[t]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[c.type] &&
          ((V = this.options.extensions.renderers[c.type].call(
            { parser: this },
            c
          )),
          V !== !1 ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "html",
              "paragraph",
              "text",
            ].includes(c.type)))
      ) {
        l += V || "";
        continue;
      }
      switch (c.type) {
        case "space":
          continue;
        case "hr": {
          l += this.renderer.hr();
          continue;
        }
        case "heading": {
          l += this.renderer.heading(
            this.parseInline(c.tokens),
            c.depth,
            tt(this.parseInline(c.tokens, this.textRenderer)),
            this.slugger
          );
          continue;
        }
        case "code": {
          l += this.renderer.code(c.text, c.lang, c.escaped);
          continue;
        }
        case "table": {
          for (d = "", u = "", a = c.header.length, i = 0; i < a; i++)
            u += this.renderer.tablecell(this.parseInline(c.header[i].tokens), {
              header: !0,
              align: c.align[i],
            });
          for (
            d += this.renderer.tablerow(u), _ = "", a = c.rows.length, i = 0;
            i < a;
            i++
          ) {
            for (f = c.rows[i], u = "", o = f.length, r = 0; r < o; r++)
              u += this.renderer.tablecell(this.parseInline(f[r].tokens), {
                header: !1,
                align: c.align[r],
              });
            _ += this.renderer.tablerow(u);
          }
          l += this.renderer.table(d, _);
          continue;
        }
        case "blockquote": {
          (_ = this.parse(c.tokens)), (l += this.renderer.blockquote(_));
          continue;
        }
        case "list": {
          for (
            v = c.ordered,
              x = c.start,
              W = c.loose,
              a = c.items.length,
              _ = "",
              i = 0;
            i < a;
            i++
          )
            (Q = c.items[i]),
              (E = Q.checked),
              (J = Q.task),
              (B = ""),
              Q.task &&
                ((X = this.renderer.checkbox(E)),
                W
                  ? Q.tokens.length > 0 && Q.tokens[0].type === "paragraph"
                    ? ((Q.tokens[0].text = X + " " + Q.tokens[0].text),
                      Q.tokens[0].tokens &&
                        Q.tokens[0].tokens.length > 0 &&
                        Q.tokens[0].tokens[0].type === "text" &&
                        (Q.tokens[0].tokens[0].text =
                          X + " " + Q.tokens[0].tokens[0].text))
                    : Q.tokens.unshift({ type: "text", text: X })
                  : (B += X)),
              (B += this.parse(Q.tokens, W)),
              (_ += this.renderer.listitem(B, J, E));
          l += this.renderer.list(_, v, x);
          continue;
        }
        case "html": {
          l += this.renderer.html(c.text);
          continue;
        }
        case "paragraph": {
          l += this.renderer.paragraph(this.parseInline(c.tokens));
          continue;
        }
        case "text": {
          for (
            _ = c.tokens ? this.parseInline(c.tokens) : c.text;
            t + 1 < oe && e[t + 1].type === "text";

          )
            (c = e[++t]),
              (_ +=
                `
` + (c.tokens ? this.parseInline(c.tokens) : c.text));
          l += n ? this.renderer.paragraph(_) : _;
          continue;
        }
        default: {
          const Te = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) {
            console.error(Te);
            return;
          } else throw new Error(Te);
        }
      }
    }
    return l;
  }
  parseInline(e, n) {
    n = n || this.renderer;
    let l = "",
      t,
      i,
      r;
    const a = e.length;
    for (t = 0; t < a; t++) {
      if (
        ((i = e[t]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[i.type] &&
          ((r = this.options.extensions.renderers[i.type].call(
            { parser: this },
            i
          )),
          r !== !1 ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(i.type)))
      ) {
        l += r || "";
        continue;
      }
      switch (i.type) {
        case "escape": {
          l += n.text(i.text);
          break;
        }
        case "html": {
          l += n.html(i.text);
          break;
        }
        case "link": {
          l += n.link(i.href, i.title, this.parseInline(i.tokens, n));
          break;
        }
        case "image": {
          l += n.image(i.href, i.title, i.text);
          break;
        }
        case "strong": {
          l += n.strong(this.parseInline(i.tokens, n));
          break;
        }
        case "em": {
          l += n.em(this.parseInline(i.tokens, n));
          break;
        }
        case "codespan": {
          l += n.codespan(i.text);
          break;
        }
        case "br": {
          l += n.br();
          break;
        }
        case "del": {
          l += n.del(this.parseInline(i.tokens, n));
          break;
        }
        case "text": {
          l += n.text(i.text);
          break;
        }
        default: {
          const o = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent) {
            console.error(o);
            return;
          } else throw new Error(o);
        }
      }
    }
    return l;
  }
}
class me {
  constructor(e) {
    this.options = e || ne;
  }
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
}
ye(me, "passThroughHooks", new Set(["preprocess", "postprocess"]));
function rn(s, e, n) {
  return (l) => {
    if (
      ((l.message += `
Please report this to https://github.com/markedjs/marked.`),
      s)
    ) {
      const t =
        "<p>An error occurred:</p><pre>" + G(l.message + "", !0) + "</pre>";
      if (e) return Promise.resolve(t);
      if (n) {
        n(null, t);
        return;
      }
      return t;
    }
    if (e) return Promise.reject(l);
    if (n) {
      n(l);
      return;
    }
    throw l;
  };
}
function lt(s, e) {
  return (n, l, t) => {
    typeof l == "function" && ((t = l), (l = null));
    const i = { ...l };
    l = { ...w.defaults, ...i };
    const r = rn(l.silent, l.async, t);
    if (typeof n > "u" || n === null)
      return r(new Error("marked(): input parameter is undefined or null"));
    if (typeof n != "string")
      return r(
        new Error(
          "marked(): input parameter is of type " +
            Object.prototype.toString.call(n) +
            ", string expected"
        )
      );
    if ((tn(l), l.hooks && (l.hooks.options = l), t)) {
      const a = l.highlight;
      let o;
      try {
        l.hooks && (n = l.hooks.preprocess(n)), (o = s(n, l));
      } catch (d) {
        return r(d);
      }
      const f = function (d) {
        let _;
        if (!d)
          try {
            l.walkTokens && w.walkTokens(o, l.walkTokens),
              (_ = e(o, l)),
              l.hooks && (_ = l.hooks.postprocess(_));
          } catch (c) {
            d = c;
          }
        return (l.highlight = a), d ? r(d) : t(null, _);
      };
      if (!a || a.length < 3 || (delete l.highlight, !o.length)) return f();
      let u = 0;
      w.walkTokens(o, function (d) {
        d.type === "code" &&
          (u++,
          setTimeout(() => {
            a(d.text, d.lang, function (_, c) {
              if (_) return f(_);
              c != null && c !== d.text && ((d.text = c), (d.escaped = !0)),
                u--,
                u === 0 && f();
            });
          }, 0));
      }),
        u === 0 && f();
      return;
    }
    if (l.async)
      return Promise.resolve(l.hooks ? l.hooks.preprocess(n) : n)
        .then((a) => s(a, l))
        .then((a) =>
          l.walkTokens
            ? Promise.all(w.walkTokens(a, l.walkTokens)).then(() => a)
            : a
        )
        .then((a) => e(a, l))
        .then((a) => (l.hooks ? l.hooks.postprocess(a) : a))
        .catch(r);
    try {
      l.hooks && (n = l.hooks.preprocess(n));
      const a = s(n, l);
      l.walkTokens && w.walkTokens(a, l.walkTokens);
      let o = e(a, l);
      return l.hooks && (o = l.hooks.postprocess(o)), o;
    } catch (a) {
      return r(a);
    }
  };
}
function w(s, e, n) {
  return lt(K.lex, ee.parse)(s, e, n);
}
w.options = w.setOptions = function (s) {
  return (w.defaults = { ...w.defaults, ...s }), Ut(w.defaults), w;
};
w.getDefaults = Je;
w.defaults = ne;
w.use = function (...s) {
  const e = w.defaults.extensions || { renderers: {}, childTokens: {} };
  s.forEach((n) => {
    const l = { ...n };
    if (
      ((l.async = w.defaults.async || l.async || !1),
      n.extensions &&
        (n.extensions.forEach((t) => {
          if (!t.name) throw new Error("extension name required");
          if (t.renderer) {
            const i = e.renderers[t.name];
            i
              ? (e.renderers[t.name] = function (...r) {
                  let a = t.renderer.apply(this, r);
                  return a === !1 && (a = i.apply(this, r)), a;
                })
              : (e.renderers[t.name] = t.renderer);
          }
          if (t.tokenizer) {
            if (!t.level || (t.level !== "block" && t.level !== "inline"))
              throw new Error("extension level must be 'block' or 'inline'");
            e[t.level]
              ? e[t.level].unshift(t.tokenizer)
              : (e[t.level] = [t.tokenizer]),
              t.start &&
                (t.level === "block"
                  ? e.startBlock
                    ? e.startBlock.push(t.start)
                    : (e.startBlock = [t.start])
                  : t.level === "inline" &&
                    (e.startInline
                      ? e.startInline.push(t.start)
                      : (e.startInline = [t.start])));
          }
          t.childTokens && (e.childTokens[t.name] = t.childTokens);
        }),
        (l.extensions = e)),
      n.renderer)
    ) {
      const t = w.defaults.renderer || new ve();
      for (const i in n.renderer) {
        const r = t[i];
        t[i] = (...a) => {
          let o = n.renderer[i].apply(t, a);
          return o === !1 && (o = r.apply(t, a)), o;
        };
      }
      l.renderer = t;
    }
    if (n.tokenizer) {
      const t = w.defaults.tokenizer || new ze();
      for (const i in n.tokenizer) {
        const r = t[i];
        t[i] = (...a) => {
          let o = n.tokenizer[i].apply(t, a);
          return o === !1 && (o = r.apply(t, a)), o;
        };
      }
      l.tokenizer = t;
    }
    if (n.hooks) {
      const t = w.defaults.hooks || new me();
      for (const i in n.hooks) {
        const r = t[i];
        me.passThroughHooks.has(i)
          ? (t[i] = (a) => {
              if (w.defaults.async)
                return Promise.resolve(n.hooks[i].call(t, a)).then((f) =>
                  r.call(t, f)
                );
              const o = n.hooks[i].call(t, a);
              return r.call(t, o);
            })
          : (t[i] = (...a) => {
              let o = n.hooks[i].apply(t, a);
              return o === !1 && (o = r.apply(t, a)), o;
            });
      }
      l.hooks = t;
    }
    if (n.walkTokens) {
      const t = w.defaults.walkTokens;
      l.walkTokens = function (i) {
        let r = [];
        return (
          r.push(n.walkTokens.call(this, i)),
          t && (r = r.concat(t.call(this, i))),
          r
        );
      };
    }
    w.setOptions(l);
  });
};
w.walkTokens = function (s, e) {
  let n = [];
  for (const l of s)
    switch (((n = n.concat(e.call(w, l))), l.type)) {
      case "table": {
        for (const t of l.header) n = n.concat(w.walkTokens(t.tokens, e));
        for (const t of l.rows)
          for (const i of t) n = n.concat(w.walkTokens(i.tokens, e));
        break;
      }
      case "list": {
        n = n.concat(w.walkTokens(l.items, e));
        break;
      }
      default:
        w.defaults.extensions &&
        w.defaults.extensions.childTokens &&
        w.defaults.extensions.childTokens[l.type]
          ? w.defaults.extensions.childTokens[l.type].forEach(function (t) {
              n = n.concat(w.walkTokens(l[t], e));
            })
          : l.tokens && (n = n.concat(w.walkTokens(l.tokens, e)));
    }
  return n;
};
w.parseInline = lt(K.lexInline, ee.parseInline);
w.Parser = ee;
w.parser = ee.parse;
w.Renderer = ve;
w.TextRenderer = nt;
w.Lexer = K;
w.lexer = K.lex;
w.Tokenizer = ze;
w.Slugger = Se;
w.Hooks = me;
w.parse = w;
w.options;
w.setOptions;
w.use;
w.walkTokens;
w.parseInline;
ee.parse;
K.lex;
const it = {};
function sn(s) {
  let e;
  return {
    c() {
      e = ke(s[1]);
    },
    l(n) {
      e = be(n, s[1]);
    },
    m(n, l) {
      b(n, e, l);
    },
    p(n, l) {
      l & 2 && $e(e, n[1]);
    },
    i: F,
    o: F,
    d(n) {
      n && p(e);
    },
  };
}
function on(s) {
  let e, n;
  const l = s[5].default,
    t = Z(l, s, s[4], null);
  return {
    c() {
      (e = I("h6")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "H6", { id: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "id", s[2]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 16) &&
        M(t, l, i, i[4], n ? H(l, i[4], r, null) : U(i[4]), null),
        (!n || r & 4) && m(e, "id", i[2]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function an(s) {
  let e, n;
  const l = s[5].default,
    t = Z(l, s, s[4], null);
  return {
    c() {
      (e = I("h5")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "H5", { id: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "id", s[2]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 16) &&
        M(t, l, i, i[4], n ? H(l, i[4], r, null) : U(i[4]), null),
        (!n || r & 4) && m(e, "id", i[2]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function fn(s) {
  let e, n;
  const l = s[5].default,
    t = Z(l, s, s[4], null);
  return {
    c() {
      (e = I("h4")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "H4", { id: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "id", s[2]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 16) &&
        M(t, l, i, i[4], n ? H(l, i[4], r, null) : U(i[4]), null),
        (!n || r & 4) && m(e, "id", i[2]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function un(s) {
  let e, n;
  const l = s[5].default,
    t = Z(l, s, s[4], null);
  return {
    c() {
      (e = I("h3")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "H3", { id: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "id", s[2]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 16) &&
        M(t, l, i, i[4], n ? H(l, i[4], r, null) : U(i[4]), null),
        (!n || r & 4) && m(e, "id", i[2]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function cn(s) {
  let e, n;
  const l = s[5].default,
    t = Z(l, s, s[4], null);
  return {
    c() {
      (e = I("h2")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "H2", { id: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "id", s[2]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 16) &&
        M(t, l, i, i[4], n ? H(l, i[4], r, null) : U(i[4]), null),
        (!n || r & 4) && m(e, "id", i[2]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function hn(s) {
  let e, n;
  const l = s[5].default,
    t = Z(l, s, s[4], null);
  return {
    c() {
      (e = I("h1")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "H1", { id: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "id", s[2]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 16) &&
        M(t, l, i, i[4], n ? H(l, i[4], r, null) : U(i[4]), null),
        (!n || r & 4) && m(e, "id", i[2]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function pn(s) {
  let e, n, l, t;
  const i = [hn, cn, un, fn, an, on, sn],
    r = [];
  function a(o, f) {
    return o[0] === 1
      ? 0
      : o[0] === 2
      ? 1
      : o[0] === 3
      ? 2
      : o[0] === 4
      ? 3
      : o[0] === 5
      ? 4
      : o[0] === 6
      ? 5
      : 6;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, [f]) {
        let u = e;
        (e = a(o)),
          e === u
            ? r[e].p(o, f)
            : (L(),
              g(r[u], 1, 1, () => {
                r[u] = null;
              }),
              N(),
              (n = r[e]),
              n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
              h(n, 1),
              n.m(l.parentNode, l));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function dn(s, e, n) {
  let l,
    { $$slots: t = {}, $$scope: i } = e,
    { depth: r } = e,
    { raw: a } = e,
    { text: o } = e;
  const { slug: f, getOptions: u } = ft(it),
    d = u();
  return (
    (s.$$set = (_) => {
      "depth" in _ && n(0, (r = _.depth)),
        "raw" in _ && n(1, (a = _.raw)),
        "text" in _ && n(3, (o = _.text)),
        "$$scope" in _ && n(4, (i = _.$$scope));
    }),
    (s.$$.update = () => {
      s.$$.dirty & 8 &&
        n(2, (l = d.headerIds ? d.headerPrefix + f(o) : void 0));
    }),
    [r, a, l, o, i, t]
  );
}
class gn extends D {
  constructor(e) {
    super(), q(this, e, dn, pn, O, { depth: 0, raw: 1, text: 3 });
  }
}
function _n(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("p")), t && t.c();
    },
    l(i) {
      e = A(i, "P", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function mn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class kn extends D {
  constructor(e) {
    super(), q(this, e, mn, _n, O, {});
  }
}
function bn(s) {
  let e;
  const n = s[3].default,
    l = Z(n, s, s[2], null);
  return {
    c() {
      l && l.c();
    },
    l(t) {
      l && l.l(t);
    },
    m(t, i) {
      l && l.m(t, i), (e = !0);
    },
    p(t, [i]) {
      l &&
        l.p &&
        (!e || i & 4) &&
        M(l, n, t, t[2], e ? H(n, t[2], i, null) : U(t[2]), null);
    },
    i(t) {
      e || (h(l, t), (e = !0));
    },
    o(t) {
      g(l, t), (e = !1);
    },
    d(t) {
      l && l.d(t);
    },
  };
}
function $n(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e,
    { text: i } = e,
    { raw: r } = e;
  return (
    (s.$$set = (a) => {
      "text" in a && n(0, (i = a.text)),
        "raw" in a && n(1, (r = a.raw)),
        "$$scope" in a && n(2, (t = a.$$scope));
    }),
    [i, r, t, l]
  );
}
class wn extends D {
  constructor(e) {
    super(), q(this, e, $n, bn, O, { text: 0, raw: 1 });
  }
}
function zn(s) {
  let e, n;
  return {
    c() {
      (e = I("img")), this.h();
    },
    l(l) {
      (e = A(l, "IMG", { src: !0, title: !0, alt: !0 })), this.h();
    },
    h() {
      Ee(e.src, (n = s[0])) || m(e, "src", n),
        m(e, "title", s[1]),
        m(e, "alt", s[2]);
    },
    m(l, t) {
      b(l, e, t);
    },
    p(l, [t]) {
      t & 1 && !Ee(e.src, (n = l[0])) && m(e, "src", n),
        t & 2 && m(e, "title", l[1]),
        t & 4 && m(e, "alt", l[2]);
    },
    i: F,
    o: F,
    d(l) {
      l && p(e);
    },
  };
}
function vn(s, e, n) {
  let { href: l = "" } = e,
    { title: t = void 0 } = e,
    { text: i = "" } = e;
  return (
    (s.$$set = (r) => {
      "href" in r && n(0, (l = r.href)),
        "title" in r && n(1, (t = r.title)),
        "text" in r && n(2, (i = r.text));
    }),
    [l, t, i]
  );
}
class Sn extends D {
  constructor(e) {
    super(), q(this, e, vn, zn, O, { href: 0, title: 1, text: 2 });
  }
}
function Tn(s) {
  let e, n;
  const l = s[3].default,
    t = Z(l, s, s[2], null);
  return {
    c() {
      (e = I("a")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "A", { href: !0, title: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "href", s[0]), m(e, "title", s[1]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 4) &&
        M(t, l, i, i[2], n ? H(l, i[2], r, null) : U(i[2]), null),
        (!n || r & 1) && m(e, "href", i[0]),
        (!n || r & 2) && m(e, "title", i[1]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function yn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e,
    { href: i = "" } = e,
    { title: r = void 0 } = e;
  return (
    (s.$$set = (a) => {
      "href" in a && n(0, (i = a.href)),
        "title" in a && n(1, (r = a.title)),
        "$$scope" in a && n(2, (t = a.$$scope));
    }),
    [i, r, t, l]
  );
}
class xn extends D {
  constructor(e) {
    super(), q(this, e, yn, Tn, O, { href: 0, title: 1 });
  }
}
function Rn(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("em")), t && t.c();
    },
    l(i) {
      e = A(i, "EM", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function En(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class In extends D {
  constructor(e) {
    super(), q(this, e, En, Rn, O, {});
  }
}
function An(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("del")), t && t.c();
    },
    l(i) {
      e = A(i, "DEL", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function Bn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Cn extends D {
  constructor(e) {
    super(), q(this, e, Bn, An, O, {});
  }
}
function Ln(s) {
  let e,
    n = s[0].replace(/`/g, "") + "",
    l;
  return {
    c() {
      (e = I("code")), (l = ke(n));
    },
    l(t) {
      e = A(t, "CODE", {});
      var i = R(e);
      (l = be(i, n)), i.forEach(p);
    },
    m(t, i) {
      b(t, e, i), le(e, l);
    },
    p(t, [i]) {
      i & 1 && n !== (n = t[0].replace(/`/g, "") + "") && $e(l, n);
    },
    i: F,
    o: F,
    d(t) {
      t && p(e);
    },
  };
}
function Nn(s, e, n) {
  let { raw: l } = e;
  return (
    (s.$$set = (t) => {
      "raw" in t && n(0, (l = t.raw));
    }),
    [l]
  );
}
class Dn extends D {
  constructor(e) {
    super(), q(this, e, Nn, Ln, O, { raw: 0 });
  }
}
function qn(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("strong")), t && t.c();
    },
    l(i) {
      e = A(i, "STRONG", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function On(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Pn extends D {
  constructor(e) {
    super(), q(this, e, On, qn, O, {});
  }
}
function Zn(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("table")), t && t.c();
    },
    l(i) {
      e = A(i, "TABLE", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function Mn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Un extends D {
  constructor(e) {
    super(), q(this, e, Mn, Zn, O, {});
  }
}
function Hn(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("thead")), t && t.c();
    },
    l(i) {
      e = A(i, "THEAD", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function jn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Qn extends D {
  constructor(e) {
    super(), q(this, e, jn, Hn, O, {});
  }
}
function Fn(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("tbody")), t && t.c();
    },
    l(i) {
      e = A(i, "TBODY", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function Gn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Wn extends D {
  constructor(e) {
    super(), q(this, e, Gn, Fn, O, {});
  }
}
function Xn(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("tr")), t && t.c();
    },
    l(i) {
      e = A(i, "TR", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function Vn(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Yn extends D {
  constructor(e) {
    super(), q(this, e, Vn, Xn, O, {});
  }
}
function Jn(s) {
  let e, n;
  const l = s[3].default,
    t = Z(l, s, s[2], null);
  return {
    c() {
      (e = I("td")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "TD", { align: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "align", s[1]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 4) &&
        M(t, l, i, i[2], n ? H(l, i[2], r, null) : U(i[2]), null),
        (!n || r & 2) && m(e, "align", i[1]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function Kn(s) {
  let e, n;
  const l = s[3].default,
    t = Z(l, s, s[2], null);
  return {
    c() {
      (e = I("th")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "TH", { align: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "align", s[1]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 4) &&
        M(t, l, i, i[2], n ? H(l, i[2], r, null) : U(i[2]), null),
        (!n || r & 2) && m(e, "align", i[1]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function el(s) {
  let e, n, l, t;
  const i = [Kn, Jn],
    r = [];
  function a(o, f) {
    return o[0] ? 0 : 1;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, [f]) {
        let u = e;
        (e = a(o)),
          e === u
            ? r[e].p(o, f)
            : (L(),
              g(r[u], 1, 1, () => {
                r[u] = null;
              }),
              N(),
              (n = r[e]),
              n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
              h(n, 1),
              n.m(l.parentNode, l));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function tl(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e,
    { header: i } = e,
    { align: r } = e;
  return (
    (s.$$set = (a) => {
      "header" in a && n(0, (i = a.header)),
        "align" in a && n(1, (r = a.align)),
        "$$scope" in a && n(2, (t = a.$$scope));
    }),
    [i, r, t, l]
  );
}
class nl extends D {
  constructor(e) {
    super(), q(this, e, tl, el, O, { header: 0, align: 1 });
  }
}
function ll(s) {
  let e, n;
  const l = s[3].default,
    t = Z(l, s, s[2], null);
  return {
    c() {
      (e = I("ul")), t && t.c();
    },
    l(i) {
      e = A(i, "UL", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 4) &&
        M(t, l, i, i[2], n ? H(l, i[2], r, null) : U(i[2]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function il(s) {
  let e, n;
  const l = s[3].default,
    t = Z(l, s, s[2], null);
  return {
    c() {
      (e = I("ol")), t && t.c(), this.h();
    },
    l(i) {
      e = A(i, "OL", { start: !0 });
      var r = R(e);
      t && t.l(r), r.forEach(p), this.h();
    },
    h() {
      m(e, "start", s[1]);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, r) {
      t &&
        t.p &&
        (!n || r & 4) &&
        M(t, l, i, i[2], n ? H(l, i[2], r, null) : U(i[2]), null),
        (!n || r & 2) && m(e, "start", i[1]);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function rl(s) {
  let e, n, l, t;
  const i = [il, ll],
    r = [];
  function a(o, f) {
    return o[0] ? 0 : 1;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, [f]) {
        let u = e;
        (e = a(o)),
          e === u
            ? r[e].p(o, f)
            : (L(),
              g(r[u], 1, 1, () => {
                r[u] = null;
              }),
              N(),
              (n = r[e]),
              n ? n.p(o, f) : ((n = r[e] = i[e](o)), n.c()),
              h(n, 1),
              n.m(l.parentNode, l));
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function sl(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e,
    { ordered: i } = e,
    { start: r } = e;
  return (
    (s.$$set = (a) => {
      "ordered" in a && n(0, (i = a.ordered)),
        "start" in a && n(1, (r = a.start)),
        "$$scope" in a && n(2, (t = a.$$scope));
    }),
    [i, r, t, l]
  );
}
class ol extends D {
  constructor(e) {
    super(), q(this, e, sl, rl, O, { ordered: 0, start: 1 });
  }
}
function al(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("li")), t && t.c();
    },
    l(i) {
      e = A(i, "LI", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function fl(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class ul extends D {
  constructor(e) {
    super(), q(this, e, fl, al, O, {});
  }
}
function cl(s) {
  let e;
  return {
    c() {
      e = I("hr");
    },
    l(n) {
      e = A(n, "HR", {});
    },
    m(n, l) {
      b(n, e, l);
    },
    p: F,
    i: F,
    o: F,
    d(n) {
      n && p(e);
    },
  };
}
class hl extends D {
  constructor(e) {
    super(), q(this, e, null, cl, O, {});
  }
}
function pl(s) {
  let e, n;
  return {
    c() {
      (e = new ut(!1)), (n = z()), this.h();
    },
    l(l) {
      (e = ct(l, !1)), (n = z()), this.h();
    },
    h() {
      e.a = n;
    },
    m(l, t) {
      e.m(s[0], l, t), b(l, n, t);
    },
    p(l, [t]) {
      t & 1 && e.p(l[0]);
    },
    i: F,
    o: F,
    d(l) {
      l && p(n), l && e.d();
    },
  };
}
function dl(s, e, n) {
  let { text: l } = e;
  return (
    (s.$$set = (t) => {
      "text" in t && n(0, (l = t.text));
    }),
    [l]
  );
}
class gl extends D {
  constructor(e) {
    super(), q(this, e, dl, pl, O, { text: 0 });
  }
}
function _l(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("blockquote")), t && t.c();
    },
    l(i) {
      e = A(i, "BLOCKQUOTE", {});
      var r = R(e);
      t && t.l(r), r.forEach(p);
    },
    m(i, r) {
      b(i, e, r), t && t.m(e, null), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function ml(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class kl extends D {
  constructor(e) {
    super(), q(this, e, ml, _l, O, {});
  }
}
function bl(s) {
  let e, n, l;
  return {
    c() {
      (e = I("pre")), (n = I("code")), (l = ke(s[1])), this.h();
    },
    l(t) {
      e = A(t, "PRE", { class: !0 });
      var i = R(e);
      n = A(i, "CODE", {});
      var r = R(n);
      (l = be(r, s[1])), r.forEach(p), i.forEach(p), this.h();
    },
    h() {
      m(e, "class", s[0]);
    },
    m(t, i) {
      b(t, e, i), le(e, n), le(n, l);
    },
    p(t, [i]) {
      i & 2 && $e(l, t[1]), i & 1 && m(e, "class", t[0]);
    },
    i: F,
    o: F,
    d(t) {
      t && p(e);
    },
  };
}
function $l(s, e, n) {
  let { lang: l } = e,
    { text: t } = e;
  return (
    (s.$$set = (i) => {
      "lang" in i && n(0, (l = i.lang)), "text" in i && n(1, (t = i.text));
    }),
    [l, t]
  );
}
class wl extends D {
  constructor(e) {
    super(), q(this, e, $l, bl, O, { lang: 0, text: 1 });
  }
}
function zl(s) {
  let e, n;
  const l = s[1].default,
    t = Z(l, s, s[0], null);
  return {
    c() {
      (e = I("br")), t && t.c();
    },
    l(i) {
      (e = A(i, "BR", {})), t && t.l(i);
    },
    m(i, r) {
      b(i, e, r), t && t.m(i, r), (n = !0);
    },
    p(i, [r]) {
      t &&
        t.p &&
        (!n || r & 1) &&
        M(t, l, i, i[0], n ? H(l, i[0], r, null) : U(i[0]), null);
    },
    i(i) {
      n || (h(t, i), (n = !0));
    },
    o(i) {
      g(t, i), (n = !1);
    },
    d(i) {
      i && p(e), t && t.d(i);
    },
  };
}
function vl(s, e, n) {
  let { $$slots: l = {}, $$scope: t } = e;
  return (
    (s.$$set = (i) => {
      "$$scope" in i && n(0, (t = i.$$scope));
    }),
    [t, l]
  );
}
class Sl extends D {
  constructor(e) {
    super(), q(this, e, vl, zl, O, {});
  }
}
const Tl = {
    heading: gn,
    paragraph: kn,
    text: wn,
    image: Sn,
    link: xn,
    em: In,
    strong: Pn,
    codespan: Dn,
    del: Cn,
    table: Un,
    tablehead: Qn,
    tablebody: Wn,
    tablerow: Yn,
    tablecell: nl,
    list: ol,
    orderedlistitem: null,
    unorderedlistitem: null,
    listitem: ul,
    hr: hl,
    html: gl,
    blockquote: kl,
    code: wl,
    br: Sl,
  },
  yl = {
    baseUrl: null,
    breaks: !1,
    gfm: !0,
    headerIds: !0,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: !0,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartLists: !1,
    smartypants: !1,
    tokenizer: null,
    xhtml: !1,
  };
function xl(s) {
  let e, n;
  return (
    (e = new te({ props: { tokens: s[0], renderers: s[1] } })),
    {
      c() {
        S(e.$$.fragment);
      },
      l(l) {
        j(e.$$.fragment, l);
      },
      m(l, t) {
        T(e, l, t), (n = !0);
      },
      p(l, [t]) {
        const i = {};
        t & 1 && (i.tokens = l[0]), t & 2 && (i.renderers = l[1]), e.$set(i);
      },
      i(l) {
        n || (h(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        g(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        y(e, l);
      },
    }
  );
}
function Rl(s, e, n) {
  let l,
    t,
    i,
    r,
    { source: a = [] } = e,
    { renderers: o = {} } = e,
    { options: f = {} } = e,
    { isInline: u = !1 } = e;
  const d = ht();
  let _, c, v;
  return (
    pt(it, { slug: (x) => (t ? t.slug(x) : ""), getOptions: () => i }),
    Ye(() => {
      n(7, (v = !0));
    }),
    (s.$$set = (x) => {
      "source" in x && n(2, (a = x.source)),
        "renderers" in x && n(3, (o = x.renderers)),
        "options" in x && n(4, (f = x.options)),
        "isInline" in x && n(5, (u = x.isInline));
    }),
    (s.$$.update = () => {
      s.$$.dirty & 4 && n(8, (l = Array.isArray(a))),
        s.$$.dirty & 4 && (t = a ? new Se() : void 0),
        s.$$.dirty & 16 && n(9, (i = { ...yl, ...f })),
        s.$$.dirty & 869 &&
          (l
            ? n(0, (_ = a))
            : (n(6, (c = new K(i))),
              n(0, (_ = u ? c.inlineTokens(a) : c.lex(a))),
              d("parsed", { tokens: _ }))),
        s.$$.dirty & 8 && n(1, (r = { ...Tl, ...o })),
        s.$$.dirty & 385 && v && !l && d("parsed", { tokens: _ });
    }),
    [_, r, a, o, f, u, c, v, l, i]
  );
}
class El extends D {
  constructor(e) {
    super(),
      q(this, e, Rl, xl, O, {
        source: 2,
        renderers: 3,
        options: 4,
        isInline: 5,
      });
  }
}
function Il(s) {
  let e, n;
  return (
    (e = new El({ props: { source: s[0] } })),
    {
      c() {
        S(e.$$.fragment);
      },
      l(l) {
        j(e.$$.fragment, l);
      },
      m(l, t) {
        T(e, l, t), (n = !0);
      },
      p: F,
      i(l) {
        n || (h(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        g(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        y(e, l);
      },
    }
  );
}
function Al(s) {
  let e, n;
  return (
    (e = new mt({ props: { value: void 0 } })),
    {
      c() {
        S(e.$$.fragment);
      },
      l(l) {
        j(e.$$.fragment, l);
      },
      m(l, t) {
        T(e, l, t), (n = !0);
      },
      p: F,
      i(l) {
        n || (h(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        g(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        y(e, l);
      },
    }
  );
}
function Bl(s) {
  let e, n, l, t;
  const i = [Al, Il],
    r = [];
  function a(o, f) {
    return o[0] === "" ? 0 : 1;
  }
  return (
    (e = a(s)),
    (n = r[e] = i[e](s)),
    {
      c() {
        n.c(), (l = z());
      },
      l(o) {
        n.l(o), (l = z());
      },
      m(o, f) {
        r[e].m(o, f), b(o, l, f), (t = !0);
      },
      p(o, [f]) {
        n.p(o, f);
      },
      i(o) {
        t || (h(n), (t = !0));
      },
      o(o) {
        g(n), (t = !1);
      },
      d(o) {
        r[e].d(o), o && p(l);
      },
    }
  );
}
function Cl(s, e, n) {
  let { section: l } = e,
    t = l.content;
  return (
    (s.$$set = (i) => {
      "section" in i && n(1, (l = i.section));
    }),
    [t, l]
  );
}
class Ol extends D {
  constructor(e) {
    super(), q(this, e, Cl, Bl, O, { section: 1 });
  }
}
export { Ol as I };
