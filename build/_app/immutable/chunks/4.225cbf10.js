import {
  S as E,
  i as I,
  s as L,
  k as p,
  q as P,
  a as q,
  l as d,
  m as g,
  r as b,
  h as u,
  c as y,
  b as m,
  G as B,
  g as h,
  f as S,
  d as $,
  a1 as w,
  y as z,
  z as A,
  A as C,
  B as G,
  v as H,
  u as U,
} from "./index.0e418277.js";
import { I as j } from "./InternalLink.c91eec11.js";
function k(c, n, o) {
  const l = c.slice();
  return (l[1] = n[o].slug), (l[2] = n[o].title), l;
}
function D(c) {
  let n = c[2] + "",
    o;
  return {
    c() {
      o = P(n);
    },
    l(l) {
      o = b(l, n);
    },
    m(l, t) {
      m(l, o, t);
    },
    p(l, t) {
      t & 1 && n !== (n = l[2] + "") && U(o, n);
    },
    d(l) {
      l && u(o);
    },
  };
}
function v(c) {
  let n, o, l;
  return (
    (o = new j({
      props: {
        link: "content/" + c[1],
        $$slots: { default: [D] },
        $$scope: { ctx: c },
      },
    })),
    {
      c() {
        (n = p("li")), z(o.$$.fragment);
      },
      l(t) {
        n = d(t, "LI", {});
        var i = g(n);
        A(o.$$.fragment, i), i.forEach(u);
      },
      m(t, i) {
        m(t, n, i), C(o, n, null), (l = !0);
      },
      p(t, i) {
        const f = {};
        i & 1 && (f.link = "content/" + t[1]),
          i & 33 && (f.$$scope = { dirty: i, ctx: t }),
          o.$set(f);
      },
      i(t) {
        l || (h(o.$$.fragment, t), (l = !0));
      },
      o(t) {
        $(o.$$.fragment, t), (l = !1);
      },
      d(t) {
        t && u(n), G(o);
      },
    }
  );
}
function F(c) {
  let n,
    o,
    l,
    t,
    i,
    f = c[0].summaries,
    a = [];
  for (let e = 0; e < f.length; e += 1) a[e] = v(k(c, f, e));
  const x = (e) =>
    $(a[e], 1, 1, () => {
      a[e] = null;
    });
  return {
    c() {
      (n = p("h1")), (o = P("Page load test")), (l = q()), (t = p("ul"));
      for (let e = 0; e < a.length; e += 1) a[e].c();
    },
    l(e) {
      n = d(e, "H1", {});
      var r = g(n);
      (o = b(r, "Page load test")),
        r.forEach(u),
        (l = y(e)),
        (t = d(e, "UL", {}));
      var s = g(t);
      for (let _ = 0; _ < a.length; _ += 1) a[_].l(s);
      s.forEach(u);
    },
    m(e, r) {
      m(e, n, r), B(n, o), m(e, l, r), m(e, t, r);
      for (let s = 0; s < a.length; s += 1) a[s] && a[s].m(t, null);
      i = !0;
    },
    p(e, [r]) {
      if (r & 1) {
        f = e[0].summaries;
        let s;
        for (s = 0; s < f.length; s += 1) {
          const _ = k(e, f, s);
          a[s]
            ? (a[s].p(_, r), h(a[s], 1))
            : ((a[s] = v(_)), a[s].c(), h(a[s], 1), a[s].m(t, null));
        }
        for (H(), s = f.length; s < a.length; s += 1) x(s);
        S();
      }
    },
    i(e) {
      if (!i) {
        for (let r = 0; r < f.length; r += 1) h(a[r]);
        i = !0;
      }
    },
    o(e) {
      a = a.filter(Boolean);
      for (let r = 0; r < a.length; r += 1) $(a[r]);
      i = !1;
    },
    d(e) {
      e && u(n), e && u(l), e && u(t), w(a, e);
    },
  };
}
function J(c, n, o) {
  let { data: l } = n;
  return (
    (c.$$set = (t) => {
      "data" in t && o(0, (l = t.data));
    }),
    [l]
  );
}
class K extends E {
  constructor(n) {
    super(), I(this, n, J, F, L, { data: 0 });
  }
}
const O = K;
export { O as component };
