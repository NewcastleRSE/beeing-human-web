import {
  S as h,
  i as d,
  s as k,
  Q as g,
  k as b,
  l as p,
  m as v,
  h as u,
  n as f,
  b as I,
  R as S,
  T as q,
  U as A,
  g as C,
  d as E,
  Z as _,
  M as c,
  N as L,
} from "./index.0e418277.js";
import { b as m } from "./paths.d527816c.js";
function M(n) {
  let e, i, r, l;
  const o = n[3].default,
    a = g(o, n, n[2], null);
  return {
    c() {
      (e = b("a")), a && a.c(), this.h();
    },
    l(s) {
      e = p(s, "A", { href: !0, class: !0 });
      var t = v(e);
      a && a.l(t), t.forEach(u), this.h();
    },
    h() {
      f(e, "href", (i = m + "/" + n[0])), f(e, "class", (r = n[1].class || ""));
    },
    m(s, t) {
      I(s, e, t), a && a.m(e, null), (l = !0);
    },
    p(s, [t]) {
      a &&
        a.p &&
        (!l || t & 4) &&
        S(a, o, s, s[2], l ? A(o, s[2], t, null) : q(s[2]), null),
        (!l || (t & 1 && i !== (i = m + "/" + s[0]))) && f(e, "href", i),
        (!l || (t & 2 && r !== (r = s[1].class || ""))) && f(e, "class", r);
    },
    i(s) {
      l || (C(a, s), (l = !0));
    },
    o(s) {
      E(a, s), (l = !1);
    },
    d(s) {
      s && u(e), a && a.d(s);
    },
  };
}
function N(n, e, i) {
  const r = ["link"];
  let l = _(e, r),
    { $$slots: o = {}, $$scope: a } = e,
    { link: s } = e;
  return (
    (n.$$set = (t) => {
      (e = c(c({}, e), L(t))),
        i(1, (l = _(e, r))),
        "link" in t && i(0, (s = t.link)),
        "$$scope" in t && i(2, (a = t.$$scope));
    }),
    [s, l, a, o]
  );
}
class R extends h {
  constructor(e) {
    super(), d(this, e, N, M, k, { link: 0 });
  }
}
export { R as I };
