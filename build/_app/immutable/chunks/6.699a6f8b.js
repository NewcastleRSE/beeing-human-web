import { v as p } from "./viewChoice.8f180d66.js";
import {
  S as _,
  i as f,
  s as u,
  k as $,
  q as d,
  a as h,
  y as g,
  l as v,
  m as b,
  r as j,
  h as c,
  c as w,
  z as y,
  b as l,
  G as S,
  A as P,
  u as q,
  g as z,
  d as I,
  B as M,
  L as O,
} from "./index.0e418277.js";
import { I as V } from "./InjectMD.23ce860c.js";
function k({ params: s }) {}
const G = Object.freeze(
  Object.defineProperty({ __proto__: null, load: k }, Symbol.toStringTag, {
    value: "Module",
  })
);
function x(s) {
  let n, r, o, t, i;
  return (
    (t = new V({ props: { chosenView: s[0], section: "intro" } })),
    {
      c() {
        (n = $("h1")), (r = d(s[0])), (o = h()), g(t.$$.fragment);
      },
      l(e) {
        n = v(e, "H1", {});
        var a = b(n);
        (r = j(a, s[0])), a.forEach(c), (o = w(e)), y(t.$$.fragment, e);
      },
      m(e, a) {
        l(e, n, a), S(n, r), l(e, o, a), P(t, e, a), (i = !0);
      },
      p(e, [a]) {
        (!i || a & 1) && q(r, e[0]);
        const m = {};
        a & 1 && (m.chosenView = e[0]), t.$set(m);
      },
      i(e) {
        i || (z(t.$$.fragment, e), (i = !0));
      },
      o(e) {
        I(t.$$.fragment, e), (i = !1);
      },
      d(e) {
        e && c(n), e && c(o), M(t, e);
      },
    }
  );
}
function A(s, n, r) {
  let o;
  return O(s, p, (t) => r(0, (o = t))), [o];
}
class B extends _ {
  constructor(n) {
    super(), f(this, n, A, x, u, {});
  }
}
const H = B;
export { H as component, G as universal };
