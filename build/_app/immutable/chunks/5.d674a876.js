import {
  S as A,
  i as C,
  s as D,
  k,
  q as w,
  a as j,
  e as g,
  l as y,
  m as E,
  r as H,
  h as u,
  c as q,
  b as h,
  G as B,
  u as P,
  g as d,
  f as S,
  d as b,
  a1 as G,
  v as V,
  y as M,
  z as F,
  A as J,
  B as K,
} from "./index.0e418277.js";
import { I as L } from "./InjectMD.23ce860c.js";
function I(_, n, r) {
  const e = _.slice();
  return (e[1] = n[r][0]), (e[2] = n[r][1]), e;
}
function N(_) {
  let n,
    r = _[1] + "",
    e,
    l,
    f,
    m;
  return (
    (f = new L({ props: { section: _[2] } })),
    {
      c() {
        (n = k("h2")), (e = w(r)), (l = j()), M(f.$$.fragment);
      },
      l(i) {
        n = y(i, "H2", {});
        var c = E(n);
        (e = H(c, r)), c.forEach(u), (l = q(i)), F(f.$$.fragment, i);
      },
      m(i, c) {
        h(i, n, c), B(n, e), h(i, l, c), J(f, i, c), (m = !0);
      },
      p(i, c) {
        (!m || c & 1) && r !== (r = i[1] + "") && P(e, r);
        const p = {};
        c & 1 && (p.section = i[2]), f.$set(p);
      },
      i(i) {
        m || (d(f.$$.fragment, i), (m = !0));
      },
      o(i) {
        b(f.$$.fragment, i), (m = !1);
      },
      d(i) {
        i && u(n), i && u(l), K(f, i);
      },
    }
  );
}
function O(_) {
  let n,
    r,
    e = _[2].type === "md" && N(_);
  return {
    c() {
      e && e.c(), (n = g());
    },
    l(l) {
      e && e.l(l), (n = g());
    },
    m(l, f) {
      e && e.m(l, f), h(l, n, f), (r = !0);
    },
    p(l, f) {
      l[2].type === "md"
        ? e
          ? (e.p(l, f), f & 1 && d(e, 1))
          : ((e = N(l)), e.c(), d(e, 1), e.m(n.parentNode, n))
        : e &&
          (V(),
          b(e, 1, 1, () => {
            e = null;
          }),
          S());
    },
    i(l) {
      r || (d(e), (r = !0));
    },
    o(l) {
      b(e), (r = !1);
    },
    d(l) {
      e && e.d(l), l && u(n);
    },
  };
}
function Q(_) {
  let n,
    r,
    e,
    l,
    f = _[0].view.title + "",
    m,
    i,
    c,
    p,
    v = Object.entries(_[0].view.sections),
    a = [];
  for (let t = 0; t < v.length; t += 1) a[t] = O(I(_, v, t));
  const z = (t) =>
    b(a[t], 1, 1, () => {
      a[t] = null;
    });
  return {
    c() {
      (n = k("h1")),
        (r = w("View page")),
        (e = j()),
        (l = k("h1")),
        (m = w(f)),
        (i = j());
      for (let t = 0; t < a.length; t += 1) a[t].c();
      c = g();
    },
    l(t) {
      n = y(t, "H1", {});
      var s = E(n);
      (r = H(s, "View page")), s.forEach(u), (e = q(t)), (l = y(t, "H1", {}));
      var o = E(l);
      (m = H(o, f)), o.forEach(u), (i = q(t));
      for (let $ = 0; $ < a.length; $ += 1) a[$].l(t);
      c = g();
    },
    m(t, s) {
      h(t, n, s), B(n, r), h(t, e, s), h(t, l, s), B(l, m), h(t, i, s);
      for (let o = 0; o < a.length; o += 1) a[o] && a[o].m(t, s);
      h(t, c, s), (p = !0);
    },
    p(t, [s]) {
      if (
        ((!p || s & 1) && f !== (f = t[0].view.title + "") && P(m, f), s & 1)
      ) {
        v = Object.entries(t[0].view.sections);
        let o;
        for (o = 0; o < v.length; o += 1) {
          const $ = I(t, v, o);
          a[o]
            ? (a[o].p($, s), d(a[o], 1))
            : ((a[o] = O($)), a[o].c(), d(a[o], 1), a[o].m(c.parentNode, c));
        }
        for (V(), o = v.length; o < a.length; o += 1) z(o);
        S();
      }
    },
    i(t) {
      if (!p) {
        for (let s = 0; s < v.length; s += 1) d(a[s]);
        p = !0;
      }
    },
    o(t) {
      a = a.filter(Boolean);
      for (let s = 0; s < a.length; s += 1) b(a[s]);
      p = !1;
    },
    d(t) {
      t && u(n), t && u(e), t && u(l), t && u(i), G(a, t), t && u(c);
    },
  };
}
function R(_, n, r) {
  let { data: e } = n;
  return (
    console.log(e),
    (_.$$set = (l) => {
      "data" in l && r(0, (e = l.data));
    }),
    [e]
  );
}
class T extends A {
  constructor(n) {
    super(), C(this, n, R, Q, D, { data: 0 });
  }
}
const X = T;
export { X as component };
