import {
  S as d,
  i as v,
  s as P,
  k as m,
  q as u,
  a as q,
  l as _,
  m as f,
  r as h,
  h as o,
  c as y,
  b as p,
  G as x,
  J as c,
} from "./index.0e418277.js";
function A(b) {
  let e, n, l, t, i;
  return {
    c() {
      (e = m("h1")),
        (n = u("About")),
        (l = q()),
        (t = m("p")),
        (i = u("This is an example about page"));
    },
    l(a) {
      e = _(a, "H1", {});
      var s = f(e);
      (n = h(s, "About")), s.forEach(o), (l = y(a)), (t = _(a, "P", {}));
      var r = f(t);
      (i = h(r, "This is an example about page")), r.forEach(o);
    },
    m(a, s) {
      p(a, e, s), x(e, n), p(a, l, s), p(a, t, s), x(t, i);
    },
    p: c,
    i: c,
    o: c,
    d(a) {
      a && o(e), a && o(l), a && o(t);
    },
  };
}
class E extends d {
  constructor(e) {
    super(), v(this, e, null, A, P, {});
  }
}
const T = E;
export { T as component };
