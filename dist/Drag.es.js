function b(i) {
  const X = i.trigger_el ?? i.main_el, e = i.main_el;
  e.style.willChange = "transform", e.style.touchAction = "none", e.style.userSelect = "none";
  let _ = 0, h = 0, o = 0, r = 0, u = 0, p = 0, y = 0, g = 0, f = 0, v = 0;
  const l = { clientX: 0, clientY: 0 };
  let x = !1, a = null, s = !1, t = null;
  const Y = () => {
    e.style.transform = `translate3d(${o}px, ${r}px, 0)`;
  }, E = () => {
    o < u && (o = u), r < p && (r = p), o > y && (o = y), r > g && (r = g);
  }, w = (c) => {
    f = c.clientX, v = c.clientY, s || (s = !0, a = requestAnimationFrame(() => {
      s = !1;
      const n = f - l.clientX, m = v - l.clientY;
      l.clientX = f, l.clientY = v, o += n, r += m, E(), Y();
    }));
  }, L = (c) => {
    var m;
    const n = e.getBoundingClientRect();
    _ = n.width, h = n.height, o = n.x, r = n.y, t || (t = {
      x: n.x,
      y: n.y
    }, u = (i.left_boundary ?? 0) - t.x, p = (i.top_boundary ?? 0) - t.y, y = (i.right_boundary ?? window.innerWidth) - _ - t.x, g = (i.bottom_boundary ?? window.innerHeight) - h - t.y), l.clientX = c.clientX + t.x, l.clientY = c.clientY + t.y, x = !0, (m = e.setPointerCapture) == null || m.call(e, c.pointerId), document.addEventListener("pointermove", w, { passive: !0 }), document.addEventListener("pointerup", d), document.addEventListener("pointercancel", d);
  }, d = () => {
    x && (x = !1, document.removeEventListener("pointermove", w), document.removeEventListener("pointerup", d), document.removeEventListener("pointercancel", d), a && (cancelAnimationFrame(a), a = null, s = !1));
  };
  X.addEventListener("pointerdown", L);
}
export {
  b as default
};
