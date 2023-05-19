function v() {}
function U(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function O(t) {
  return t();
}
function L() {
  return Object.create(null);
}
function g(t) {
  t.forEach(O);
}
function q(t) {
  return typeof t == "function";
}
function pt(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == "object") || typeof t == "function";
}
let $;
function yt(t, e) {
  return $ || ($ = document.createElement("a")), ($.href = e), t === $.href;
}
function V(t) {
  return Object.keys(t).length === 0;
}
function B(t, ...e) {
  if (t == null) return v;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function gt(t) {
  let e;
  return B(t, (n) => (e = n))(), e;
}
function xt(t, e, n) {
  t.$$.on_destroy.push(B(e, n));
}
function bt(t, e, n, i) {
  if (t) {
    const r = G(t, e, n, i);
    return t[0](r);
  }
}
function G(t, e, n, i) {
  return t[1] && i ? U(n.ctx.slice(), t[1](i(e))) : n.ctx;
}
function $t(t, e, n, i) {
  if (t[2] && i) {
    const r = t[2](i(n));
    if (e.dirty === void 0) return r;
    if (typeof r == "object") {
      const o = [],
        s = Math.max(e.dirty.length, r.length);
      for (let l = 0; l < s; l += 1) o[l] = e.dirty[l] | r[l];
      return o;
    }
    return e.dirty | r;
  }
  return e.dirty;
}
function Et(t, e, n, i, r, o) {
  if (r) {
    const s = G(e, n, i, o);
    t.p(s, r);
  }
}
function vt(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let i = 0; i < n; i++) e[i] = -1;
    return e;
  }
  return -1;
}
function wt(t) {
  const e = {};
  for (const n in t) n[0] !== "$" && (e[n] = t[n]);
  return e;
}
function Tt(t, e) {
  const n = {};
  e = new Set(e);
  for (const i in t) !e.has(i) && i[0] !== "$" && (n[i] = t[i]);
  return n;
}
function Nt(t) {
  const e = {};
  for (const n in t) e[n] = !0;
  return e;
}
function At(t, e, n) {
  return t.set(n), e;
}
let T = !1;
function X() {
  T = !0;
}
function Y() {
  T = !1;
}
function Z(t, e, n, i) {
  for (; t < e; ) {
    const r = t + ((e - t) >> 1);
    n(r) <= i ? (t = r + 1) : (e = r);
  }
  return t;
}
function tt(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let e = t.childNodes;
  if (t.nodeName === "HEAD") {
    const c = [];
    for (let u = 0; u < e.length; u++) {
      const f = e[u];
      f.claim_order !== void 0 && c.push(f);
    }
    e = c;
  }
  const n = new Int32Array(e.length + 1),
    i = new Int32Array(e.length);
  n[0] = -1;
  let r = 0;
  for (let c = 0; c < e.length; c++) {
    const u = e[c].claim_order,
      f =
        (r > 0 && e[n[r]].claim_order <= u
          ? r + 1
          : Z(1, r, (b) => e[n[b]].claim_order, u)) - 1;
    i[c] = n[f] + 1;
    const a = f + 1;
    (n[a] = c), (r = Math.max(a, r));
  }
  const o = [],
    s = [];
  let l = e.length - 1;
  for (let c = n[r] + 1; c != 0; c = i[c - 1]) {
    for (o.push(e[c - 1]); l >= c; l--) s.push(e[l]);
    l--;
  }
  for (; l >= 0; l--) s.push(e[l]);
  o.reverse(), s.sort((c, u) => c.claim_order - u.claim_order);
  for (let c = 0, u = 0; c < s.length; c++) {
    for (; u < o.length && s[c].claim_order >= o[u].claim_order; ) u++;
    const f = u < o.length ? o[u] : null;
    t.insertBefore(s[c], f);
  }
}
function et(t, e) {
  if (T) {
    for (
      tt(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null &&
            t.actual_end_child.parentNode !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling;
    e !== t.actual_end_child
      ? (e.claim_order !== void 0 || e.parentNode !== t) &&
        t.insertBefore(e, t.actual_end_child)
      : (t.actual_end_child = e.nextSibling);
  } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function nt(t, e, n) {
  t.insertBefore(e, n || null);
}
function it(t, e, n) {
  T && !n
    ? et(t, e)
    : (e.parentNode !== t || e.nextSibling != n) &&
      t.insertBefore(e, n || null);
}
function w(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function kt(t, e) {
  for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function R(t) {
  return document.createElement(t);
}
function z(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function M(t) {
  return document.createTextNode(t);
}
function St() {
  return M(" ");
}
function Mt() {
  return M("");
}
function Ct(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function rt(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function jt(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const i in e)
    e[i] == null
      ? t.removeAttribute(i)
      : i === "style"
      ? (t.style.cssText = e[i])
      : i === "__value"
      ? (t.value = t[i] = e[i])
      : n[i] && n[i].set
      ? (t[i] = e[i])
      : rt(t, i, e[i]);
}
function Lt(t) {
  let e;
  return {
    p(...n) {
      (e = n), e.forEach((i) => t.push(i));
    },
    r() {
      e.forEach((n) => t.splice(t.indexOf(n), 1));
    },
  };
}
function st(t) {
  return Array.from(t.childNodes);
}
function F(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function W(t, e, n, i, r = !1) {
  F(t);
  const o = (() => {
    for (let s = t.claim_info.last_index; s < t.length; s++) {
      const l = t[s];
      if (e(l)) {
        const c = n(l);
        return (
          c === void 0 ? t.splice(s, 1) : (t[s] = c),
          r || (t.claim_info.last_index = s),
          l
        );
      }
    }
    for (let s = t.claim_info.last_index - 1; s >= 0; s--) {
      const l = t[s];
      if (e(l)) {
        const c = n(l);
        return (
          c === void 0 ? t.splice(s, 1) : (t[s] = c),
          r
            ? c === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = s),
          l
        );
      }
    }
    return i();
  })();
  return (
    (o.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    o
  );
}
function I(t, e, n, i) {
  return W(
    t,
    (r) => r.nodeName === e,
    (r) => {
      const o = [];
      for (let s = 0; s < r.attributes.length; s++) {
        const l = r.attributes[s];
        n[l.name] || o.push(l.name);
      }
      o.forEach((s) => r.removeAttribute(s));
    },
    () => i(e)
  );
}
function Ht(t, e, n) {
  return I(t, e, n, R);
}
function Pt(t, e, n) {
  return I(t, e, n, z);
}
function ct(t, e) {
  return W(
    t,
    (n) => n.nodeType === 3,
    (n) => {
      const i = "" + e;
      if (n.data.startsWith(i)) {
        if (n.data.length !== i.length) return n.splitText(i.length);
      } else n.data = i;
    },
    () => M(e),
    !0
  );
}
function Dt(t) {
  return ct(t, " ");
}
function H(t, e, n) {
  for (let i = n; i < t.length; i += 1) {
    const r = t[i];
    if (r.nodeType === 8 && r.textContent.trim() === e) return i;
  }
  return t.length;
}
function Ot(t, e) {
  const n = H(t, "HTML_TAG_START", 0),
    i = H(t, "HTML_TAG_END", n);
  if (n === i) return new P(void 0, e);
  F(t);
  const r = t.splice(n, i - n + 1);
  w(r[0]), w(r[r.length - 1]);
  const o = r.slice(1, r.length - 1);
  for (const s of o)
    (s.claim_order = t.claim_info.total_claimed),
      (t.claim_info.total_claimed += 1);
  return new P(o, e);
}
function qt(t, e) {
  (e = "" + e), t.data !== e && (t.data = e);
}
function Bt(t, e, n, i) {
  n === null
    ? t.style.removeProperty(e)
    : t.style.setProperty(e, n, i ? "important" : "");
}
function Gt(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function ot(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  const r = document.createEvent("CustomEvent");
  return r.initCustomEvent(t, n, i, e), r;
}
function Rt(t, e) {
  const n = [];
  let i = 0;
  for (const r of e.childNodes)
    if (r.nodeType === 8) {
      const o = r.textContent.trim();
      o === `HEAD_${t}_END`
        ? ((i -= 1), n.push(r))
        : o === `HEAD_${t}_START` && ((i += 1), n.push(r));
    } else i > 0 && n.push(r);
  return n;
}
class lt {
  constructor(e = !1) {
    (this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
  }
  c(e) {
    this.h(e);
  }
  m(e, n, i = null) {
    this.e ||
      (this.is_svg
        ? (this.e = z(n.nodeName))
        : (this.e = R(n.nodeType === 11 ? "TEMPLATE" : n.nodeName)),
      (this.t = n.tagName !== "TEMPLATE" ? n : n.content),
      this.c(e)),
      this.i(i);
  }
  h(e) {
    (this.e.innerHTML = e),
      (this.n = Array.from(
        this.e.nodeName === "TEMPLATE"
          ? this.e.content.childNodes
          : this.e.childNodes
      ));
  }
  i(e) {
    for (let n = 0; n < this.n.length; n += 1) nt(this.t, this.n[n], e);
  }
  p(e) {
    this.d(), this.h(e), this.i(this.a);
  }
  d() {
    this.n.forEach(w);
  }
}
class P extends lt {
  constructor(e, n = !1) {
    super(n), (this.e = this.n = null), (this.l = e);
  }
  c(e) {
    this.l ? (this.n = this.l) : super.c(e);
  }
  i(e) {
    for (let n = 0; n < this.n.length; n += 1) it(this.t, this.n[n], e);
  }
}
function zt(t, e) {
  return new t(e);
}
let y;
function p(t) {
  y = t;
}
function x() {
  if (!y) throw new Error("Function called outside component initialization");
  return y;
}
function Ft(t) {
  x().$$.on_mount.push(t);
}
function Wt(t) {
  x().$$.after_update.push(t);
}
function It() {
  const t = x();
  return (e, n, { cancelable: i = !1 } = {}) => {
    const r = t.$$.callbacks[e];
    if (r) {
      const o = ot(e, n, { cancelable: i });
      return (
        r.slice().forEach((s) => {
          s.call(t, o);
        }),
        !o.defaultPrevented
      );
    }
    return !0;
  };
}
function Jt(t, e) {
  return x().$$.context.set(t, e), e;
}
function Kt(t) {
  return x().$$.context.get(t);
}
function Qt(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((i) => i.call(this, e));
}
const h = [],
  D = [];
let m = [];
const A = [],
  J = Promise.resolve();
let k = !1;
function K() {
  k || ((k = !0), J.then(Q));
}
function Ut() {
  return K(), J;
}
function S(t) {
  m.push(t);
}
function Vt(t) {
  A.push(t);
}
const N = new Set();
let d = 0;
function Q() {
  if (d !== 0) return;
  const t = y;
  do {
    try {
      for (; d < h.length; ) {
        const e = h[d];
        d++, p(e), ut(e.$$);
      }
    } catch (e) {
      throw ((h.length = 0), (d = 0), e);
    }
    for (p(null), h.length = 0, d = 0; D.length; ) D.pop()();
    for (let e = 0; e < m.length; e += 1) {
      const n = m[e];
      N.has(n) || (N.add(n), n());
    }
    m.length = 0;
  } while (h.length);
  for (; A.length; ) A.pop()();
  (k = !1), N.clear(), p(t);
}
function ut(t) {
  if (t.fragment !== null) {
    t.update(), g(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(S);
  }
}
function at(t) {
  const e = [],
    n = [];
  m.forEach((i) => (t.indexOf(i) === -1 ? e.push(i) : n.push(i))),
    n.forEach((i) => i()),
    (m = e);
}
const E = new Set();
let _;
function Xt() {
  _ = { r: 0, c: [], p: _ };
}
function Yt() {
  _.r || g(_.c), (_ = _.p);
}
function ft(t, e) {
  t && t.i && (E.delete(t), t.i(e));
}
function Zt(t, e, n, i) {
  if (t && t.o) {
    if (E.has(t)) return;
    E.add(t),
      _.c.push(() => {
        E.delete(t), i && (n && t.d(1), i());
      }),
      t.o(e);
  } else i && i();
}
function te(t, e) {
  const n = {},
    i = {},
    r = { $$scope: 1 };
  let o = t.length;
  for (; o--; ) {
    const s = t[o],
      l = e[o];
    if (l) {
      for (const c in s) c in l || (i[c] = 1);
      for (const c in l) r[c] || ((n[c] = l[c]), (r[c] = 1));
      t[o] = l;
    } else for (const c in s) r[c] = 1;
  }
  for (const s in i) s in n || (n[s] = void 0);
  return n;
}
function ee(t) {
  return typeof t == "object" && t !== null ? t : {};
}
const _t = [
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
];
[..._t];
function ne(t, e, n) {
  const i = t.$$.props[e];
  i !== void 0 && ((t.$$.bound[i] = n), n(t.$$.ctx[i]));
}
function ie(t) {
  t && t.c();
}
function re(t, e) {
  t && t.l(e);
}
function dt(t, e, n, i) {
  const { fragment: r, after_update: o } = t.$$;
  r && r.m(e, n),
    i ||
      S(() => {
        const s = t.$$.on_mount.map(O).filter(q);
        t.$$.on_destroy ? t.$$.on_destroy.push(...s) : g(s),
          (t.$$.on_mount = []);
      }),
    o.forEach(S);
}
function ht(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (at(n.after_update),
    g(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function mt(t, e) {
  t.$$.dirty[0] === -1 && (h.push(t), K(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function se(t, e, n, i, r, o, s, l = [-1]) {
  const c = y;
  p(t);
  const u = (t.$$ = {
    fragment: null,
    ctx: [],
    props: o,
    update: v,
    not_equal: r,
    bound: L(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: L(),
    dirty: l,
    skip_bound: !1,
    root: e.target || c.$$.root,
  });
  s && s(u.root);
  let f = !1;
  if (
    ((u.ctx = n
      ? n(t, e.props || {}, (a, b, ...C) => {
          const j = C.length ? C[0] : b;
          return (
            u.ctx &&
              r(u.ctx[a], (u.ctx[a] = j)) &&
              (!u.skip_bound && u.bound[a] && u.bound[a](j), f && mt(t, a)),
            b
          );
        })
      : []),
    u.update(),
    (f = !0),
    g(u.before_update),
    (u.fragment = i ? i(u.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      X();
      const a = st(e.target);
      u.fragment && u.fragment.l(a), a.forEach(w);
    } else u.fragment && u.fragment.c();
    e.intro && ft(t.$$.fragment),
      dt(t, e.target, e.anchor, e.customElement),
      Y(),
      Q();
  }
  p(c);
}
class ce {
  $destroy() {
    ht(this, 1), (this.$destroy = v);
  }
  $on(e, n) {
    if (!q(n)) return v;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      i.push(n),
      () => {
        const r = i.indexOf(n);
        r !== -1 && i.splice(r, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !V(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
export {
  ne as $,
  dt as A,
  ht as B,
  z as C,
  Rt as D,
  Ot as E,
  Pt as F,
  et as G,
  P as H,
  Ct as I,
  v as J,
  g as K,
  xt as L,
  U as M,
  wt as N,
  At as O,
  Qt as P,
  bt as Q,
  Et as R,
  ce as S,
  vt as T,
  $t as U,
  Jt as V,
  Lt as W,
  jt as X,
  te as Y,
  Tt as Z,
  Kt as _,
  St as a,
  Vt as a0,
  kt as a1,
  Gt as a2,
  Nt as a3,
  ee as a4,
  yt as a5,
  It as a6,
  gt as a7,
  it as b,
  Dt as c,
  Zt as d,
  Mt as e,
  Yt as f,
  ft as g,
  w as h,
  se as i,
  Wt as j,
  R as k,
  Ht as l,
  st as m,
  rt as n,
  Ft as o,
  Bt as p,
  M as q,
  ct as r,
  pt as s,
  Ut as t,
  qt as u,
  Xt as v,
  D as w,
  zt as x,
  ie as y,
  re as z,
};
