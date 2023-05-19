import { w as i } from "./index.4d678d2c.js";
import { a7 as p } from "./index.0e418277.js";
i(void 0);
i(void 0);
function S() {
  const { subscribe: e, set: n, update: s } = i({});
  return {
    subscribe: e,
    set: n,
    update: s,
    open: (t) => s(() => ({ open: !0, ...t })),
    close: () => s((t) => ((t.open = !1), t)),
  };
}
S();
function I() {
  const { subscribe: e, set: n, update: s } = i([]);
  return {
    subscribe: e,
    set: n,
    update: s,
    trigger: (t) => s((r) => (r.push(t), r)),
    close: () => s((t) => (t.length > 0 && t.shift(), t)),
    clear: () => n([]),
  };
}
I();
const M = { message: "Missing Toast Message", autohide: !0, timeout: 5e3 };
function P() {
  const e = Math.random();
  return Number(e).toString(32);
}
function U(e) {
  if (e.autohide === !0)
    return setTimeout(() => {
      _.close(e.id);
    }, e.timeout);
}
function v() {
  const { subscribe: e, set: n, update: s } = i([]);
  return {
    subscribe: e,
    trigger: (t) =>
      s((r) => {
        const a = P();
        t && t.callback && t.callback({ id: a, status: "queued" });
        const o = { ...M, ...t, id: a };
        return (o.timeoutId = U(o)), r.push(o), r;
      }),
    close: (t) =>
      s((r) => {
        if (r.length > 0) {
          const a = r.findIndex((u) => u.id === t),
            o = r[a];
          o &&
            (o.callback && o.callback({ id: t, status: "closed" }),
            o.timeoutId && clearTimeout(o.timeoutId),
            r.splice(a, 1));
        }
        return r;
      }),
    clear: () => n([]),
  };
}
const _ = v(),
  m = {};
function w(e) {
  return e === "local" ? localStorage : sessionStorage;
}
function g(e, n, s) {
  const t = (s == null ? void 0 : s.serializer) ?? JSON,
    r = (s == null ? void 0 : s.storage) ?? "local",
    a = typeof window < "u" && typeof document < "u";
  function o(u, d) {
    a && w(r).setItem(u, t.stringify(d));
  }
  if (!m[e]) {
    const u = i(n, (c) => {
        const l = a ? w(r).getItem(e) : null;
        if ((l && c(t.parse(l)), a)) {
          const h = (f) => {
            f.key === e && c(f.newValue ? t.parse(f.newValue) : null);
          };
          return (
            window.addEventListener("storage", h),
            () => window.removeEventListener("storage", h)
          );
        }
      }),
      { subscribe: d, set: b } = u;
    m[e] = {
      set(c) {
        o(e, c), b(c);
      },
      update(c) {
        const l = c(p(u));
        o(e, l), b(l);
      },
      subscribe: d,
    };
  }
  return m[e];
}
g("modeOsPrefers", !1);
const C = g("modeUserPrefers", void 0),
  L = g("modeCurrent", !1);
function k(e) {
  C.set(e);
}
function x(e) {
  const n = document.documentElement.classList,
    s = "dark";
  e === !0 ? n.remove(s) : n.add(s), L.set(e);
}
function D() {
  const e = document.documentElement.classList,
    n = localStorage.getItem("modeUserPrefers") === "false",
    s = !("modeUserPrefers" in localStorage),
    t = window.matchMedia("(prefers-color-scheme: dark)").matches;
  n || (s && t) ? e.add("dark") : e.remove("dark");
}
export { k as a, x as b, g as l, L as m, D as s };
