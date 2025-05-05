function L({ main_el: e, top_boundary: p = 0, bottom_boundary: g = 0, right_boundary: u = 0, left_boundary: l = 0, area_el: a = null }) {
  const s = (n) => {
    const i = e.getBoundingClientRect(), t = a ? a.getBoundingClientRect() : null;
    let m = t ? t.right : window.innerWidth, v = t ? t.bottom : window.innerHeight, r = m - i.right, d = v - i.bottom, _ = t ? m - t.left - l : window.innerWidth, h = t ? v - t.top - p : window.innerHeight, c = g, w = u, b = i.height, y = i.width;
    e.style.top = "auto", e.style.left = "auto";
    const f = (d < h - b || n.movementY >= 0) && (d > c || n.movementY <= 0), E = (r > w || n.movementX <= 0) && (r + y < _ || n.movementX >= 0);
    f && (e.style.bottom = `${d - n.movementY}px`), E && (e.style.right = `${r - n.movementX}px`);
  }, o = () => {
    document.removeEventListener("pointermove", s), document.removeEventListener("pointerup", o), e.removeEventListener("pointerleave", o);
  };
  document.addEventListener("pointermove", s), document.addEventListener("pointerup", o), e.addEventListener("pointerleave", o);
}
export {
  L as default
};
