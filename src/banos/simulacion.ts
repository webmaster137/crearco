/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Simulación de filas en dos baños (vista cenital).
 * Portada del prototipo original: la lógica es la misma, solo cambian colores y tipografías.
 * Cada "paso" del scrollytelling activa una configuración distinta (STEPS).
 */
const W = 360;
const H = 600;
const TIME = 44; // 1 s real = 44 s simulados

const COL: Record<string, string> = {
  h: "#12596a", // baño A (hombres)
  m: "#b85a16", // baño B (mujeres)
  tinta: "#10272d",
  piso: "#ffffff",
  papel: "#eef2ee",
  gris: "#50666c",
};
const SERV: Record<string, [number, number]> = { h: [1.5, 2.5], m: [2.5, 4.3] }; // ≈90 s y ≈140 s

const STEPS: Record<number, any> = {
  1: { lam: 0.5, wall: 0.5, h: { c: 2, u: 3 }, m: { c: 5 }, times: false },
  2: { lam: 1.8, wall: 0.5, h: { c: 2, u: 3 }, m: { c: 5 }, times: false },
  3: { lam: 1.8, wall: 0.5, h: { c: 2, u: 3 }, m: { c: 5 }, times: true },
  4: { lam: 1.8, wall: 0.3, h: { c: 1, u: 4 }, m: { c: 8 }, times: true },
};

const X0 = 20, X1 = 340, TOP = 64, BOT = 246, QY = 262, QS = 14, QMAX = 20;

export function iniciarSimulacion(
  cv: HTMLCanvasElement,
  seccion: HTMLElement,
  pasos: HTMLElement[],
  alVisible?: (visible: boolean) => void,
): () => void {
  const ctx = cv.getContext("2d")!;
  let scale = 1, ox = 0, oy = 0, dpr = 1;
  let cfg = STEPS[1], wall = 0.5, timesA = 0, clock = 14 * 3600 + 50 * 60;
  const rooms: any = { h: { fx: [], q: [], next: 0 }, m: { fx: [], q: [], next: 0 } };
  let people: any[] = [];

  const mk = (t: string) => ({ type: t, occ: null, ret: false, w: 0 });
  function setCfg(room: string, want: any) {
    const R = rooms[room];
    ["c", "u"].forEach((t) => {
      const n = want[t] || 0;
      const act = R.fx.filter((f: any) => f.type === t && !f.ret);
      let d = n - act.length;
      if (d < 0) {
        act.sort((a: any, b: any) => (a.occ ? 1 : 0) - (b.occ ? 1 : 0));
        for (let i = 0; i < -d; i++) act[i].ret = true;
      }
      while (d > 0) {
        const r = R.fx.find((f: any) => f.type === t && f.ret);
        if (r) r.ret = false;
        else {
          const f = mk(t);
          if (t === "c") {
            const i = R.fx.findIndex((x: any) => x.type === "u");
            R.fx.splice(i < 0 ? R.fx.length : i, 0, f);
          } else R.fx.push(f);
        }
        d--;
      }
    });
  }
  function apply(s: number) {
    cfg = STEPS[s];
    setCfg("h", cfg.h);
    setCfg("m", cfg.m);
  }
  apply(1);
  rooms.h.fx.forEach((f: any) => (f.w = 1));
  rooms.m.fx.forEach((f: any) => (f.w = 1));

  const bounds = (room: string) => {
    const xw = X0 + (X1 - X0) * wall;
    return room === "h" ? [X0, xw] : [xw, X1];
  };
  const doorX = (room: string) => {
    const [a, b] = bounds(room);
    return (a + b) / 2;
  };
  function layout(room: string) {
    const [a, b] = bounds(room);
    const R = rooms[room];
    const wts = R.fx.map((f: any) => (f.type === "c" ? 1 : 0.6) * f.w);
    const tot = wts.reduce((s: number, v: number) => s + v, 0) || 1;
    const span = b - a - 14;
    let x = a + 7;
    R.fx.forEach((f: any, i: number) => {
      const fw = (span * wts[i]) / tot;
      f.x = x;
      f.fw = fw;
      x += fw;
    });
  }
  const slot = (room: string, i: number) => ({ x: doorX(room), y: QY + Math.min(i, QMAX - 1) * QS });
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  function spawn(room: string) {
    const dx = doorX(room);
    const p = { room, x: dx + rnd(-40, 40), y: H + 20, st: "q", t: 0, f: null, leg: 0, arr: false, gone: false, ox: 0 } as any;
    rooms[room].q.push(p);
    people.push(p);
  }
  function move(p: any, tx: number, ty: number, dt: number, sp: number) {
    const dx = tx - p.x, dy = ty - p.y, d = Math.hypot(dx, dy);
    if (d < 1) { p.x = tx; p.y = ty; return true; }
    const k = Math.min(1, (sp * dt) / d);
    p.x += dx * k;
    p.y += dy * k;
    return d < 3;
  }

  function update(dt: number) {
    clock += dt * TIME;
    wall += (cfg.wall - wall) * Math.min(1, dt * 2.2);
    timesA += ((cfg.times ? 1 : 0) - timesA) * Math.min(1, dt * 3);
    ["h", "m"].forEach((room) => {
      const R = rooms[room];
      R.next -= dt;
      while (R.next <= 0) {
        spawn(room);
        R.next += -Math.log(1 - Math.random()) / cfg.lam;
      }
      R.fx.forEach((f: any) => {
        const tgt = f.ret && !f.occ ? 0 : 1;
        f.w += (tgt - f.w) * Math.min(1, dt * 3);
      });
      R.fx = R.fx.filter((f: any) => !(f.ret && !f.occ && f.w < 0.02));
      layout(room);
      while (R.q.length) {
        const h = R.q[0], s = slot(room, 0);
        if (Math.hypot(h.x - s.x, h.y - s.y) > 18) break;
        const free = R.fx.filter((f: any) => !f.ret && !f.occ && f.w > 0.6);
        if (!free.length) break;
        const f = free[Math.floor(Math.random() * free.length)];
        f.occ = h; h.f = f; h.st = "in"; h.leg = 0;
        const sv = SERV[room];
        h.t = rnd(sv[0], sv[1]);
        R.q.shift();
      }
    });
    people.forEach((p) => {
      const R = rooms[p.room], dx = doorX(p.room);
      if (p.st === "q") {
        const i = R.q.indexOf(p), s = slot(p.room, i);
        if (move(p, s.x, s.y, dt, p.arr ? 140 : 260)) p.arr = true;
      } else if (p.st === "in") {
        const f = p.f, fx = f.x + f.fw / 2;
        p.t -= dt;
        if (p.leg === 0) { if (move(p, dx, BOT - 14, dt, 190)) p.leg = 1; }
        else if (p.leg === 1) { if (move(p, fx, TOP + (f.type === "c" ? 34 : 30), dt, 190)) { p.leg = 2; p.t = Math.max(p.t, 0.35); } }
        else { p.x = fx; if (p.t <= 0) { f.occ = null; p.f = null; p.st = "out"; p.leg = 0; p.ox = fx; } }
      } else {
        if (p.leg === 0) { if (move(p, dx + 8, BOT - 14, dt, 160)) p.leg = 1; }
        else if (p.leg === 1) { if (move(p, dx + 8, BOT + 8, dt, 160)) p.leg = 2; }
        else { if (move(p, dx + 28, H + 30, dt, 170)) p.gone = true; }
      }
    });
    people = people.filter((p) => !p.gone);
  }

  function rr(x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    (ctx as any).roundRect ? (ctx as any).roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h);
  }
  const FD = '"Bricolage Grotesque Variable", system-ui, sans-serif';
  const FS = '"Outfit Variable", system-ui, sans-serif';

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, ox * dpr, oy * dpr);
    const hh = Math.floor(clock / 3600) % 24, mm = Math.floor(clock / 60) % 60;
    ctx.fillStyle = COL.tinta; ctx.font = `600 15px ${FD}`; ctx.textAlign = "center";
    ctx.fillText("Sábado, " + (((hh - 1) % 12) + 1) + ":" + String(mm).padStart(2, "0") + (hh < 12 ? " a. m." : " p. m."), W / 2, 34);
    ["h", "m"].forEach((room) => { const [a, b] = bounds(room); ctx.fillStyle = COL.piso; ctx.fillRect(a, TOP, b - a, BOT - TOP); });
    ["h", "m"].forEach((room) => {
      rooms[room].fx.forEach((f: any) => {
        const a = Math.max(0, Math.min(1, f.w));
        if (a < 0.05) return;
        ctx.globalAlpha = a;
        const pad = Math.min(3, f.fw * 0.15);
        if (f.type === "c") {
          rr(f.x + pad, TOP + 4, f.fw - pad * 2, 54, 3);
          ctx.fillStyle = f.occ ? COL[room] : COL.papel; ctx.fill();
          ctx.strokeStyle = COL.tinta; ctx.lineWidth = 1.2; ctx.stroke();
          ctx.beginPath(); ctx.moveTo(f.x + pad + 3, TOP + 58); ctx.lineTo(f.x + f.fw - pad - 3, TOP + 58);
          ctx.strokeStyle = f.occ ? COL[room] : "#cdd6d0"; ctx.lineWidth = 2.5; ctx.stroke();
        } else {
          const uw = Math.min(f.fw - 4, 13);
          rr(f.x + (f.fw - uw) / 2, TOP + 4, uw, 17, 6);
          ctx.fillStyle = f.occ ? COL[room] : COL.papel; ctx.fill();
          ctx.strokeStyle = COL.tinta; ctx.lineWidth = 1.2; ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    });
    ctx.strokeStyle = COL.tinta; ctx.lineWidth = 4; ctx.lineCap = "round";
    const xw = X0 + (X1 - X0) * wall;
    ctx.beginPath(); ctx.moveTo(X0, BOT); ctx.lineTo(X0, TOP); ctx.lineTo(X1, TOP); ctx.lineTo(X1, BOT); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xw, TOP); ctx.lineTo(xw, BOT); ctx.stroke();
    ["h", "m"].forEach((room) => {
      const [a, b] = bounds(room), d = doorX(room);
      ctx.beginPath(); ctx.moveTo(a, BOT); ctx.lineTo(d - 15, BOT); ctx.moveTo(d + 15, BOT); ctx.lineTo(b, BOT); ctx.stroke();
    });
    ["h", "m"].forEach((room) => {
      const d = doorX(room), R = rooms[room], n = R.fx.filter((f: any) => !f.ret).length;
      ctx.fillStyle = COL.tinta; ctx.font = `700 15px ${FD}`;
      ctx.fillText(room === "h" ? "Hombres" : "Mujeres", d, TOP + 92);
      ctx.fillStyle = COL.gris; ctx.font = `500 12px ${FS}`;
      ctx.fillText(n + " aparatos", d, TOP + 109);
      if (timesA > 0.02) {
        ctx.globalAlpha = timesA; ctx.fillStyle = COL[room]; ctx.font = `700 13px ${FS}`;
        ctx.fillText(room === "h" ? "≈ 90 s" : "≈ 140 s", d, TOP + 128);
        ctx.font = `500 11px ${FS}`; ctx.fillText("por visita", d, TOP + 142); ctx.globalAlpha = 1;
      }
    });
    people.forEach((p) => {
      if (p.st === "in" && p.leg === 2) return;
      ctx.beginPath(); ctx.arc(p.x, p.y, 5.2, 0, 7); ctx.fillStyle = COL[p.room]; ctx.fill();
      ctx.lineWidth = 1.5; ctx.strokeStyle = COL.papel; ctx.stroke();
    });
    ["h", "m"].forEach((room) => {
      const R = rooms[room], d = doorX(room), n = R.q.filter((p: any) => p.arr).length;
      const act = R.fx.filter((f: any) => !f.ret).length || 1, mean = (SERV[room][0] + SERV[room][1]) / 2;
      const wait = Math.round(((n * mean) / act) * TIME / 60);
      if (n > QMAX) { ctx.fillStyle = COL[room]; ctx.font = `700 12px ${FS}`; ctx.fillText("+" + (n - QMAX + 1), d + 20, QY + (QMAX - 1) * QS + 4); }
      ctx.fillStyle = n > 6 ? COL.m : COL.tinta; ctx.font = `700 14px ${FS}`;
      ctx.fillText(n + " en fila", d, H - 20);
      ctx.fillStyle = COL.gris; ctx.font = `500 12px ${FS}`;
      ctx.fillText(wait > 0 ? "espera ≈ " + wait + " min" : "sin espera", d, H - 4);
    });
  }

  function resize() {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(r.width * dpr);
    cv.height = Math.round(r.height * dpr);
    scale = Math.min(r.width / W, r.height / H);
    ox = (r.width - W * scale) / 2;
    oy = (r.height - H * scale) / 2;
    draw();
  }

  let running = false, last = 0, raf = 0;
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function loop(t: number) {
    if (!running) return;
    const dt = Math.min(0.05, (t - last) / 1000 || 0) * 1.4;
    last = t;
    update(dt);
    draw();
    raf = requestAnimationFrame(loop);
  }

  resize();
  (document as any).fonts?.ready.then(() => draw());
  window.addEventListener("resize", resize);
  for (let i = 0; i < 40; i++) update(0.05);
  draw();

  const obsSeccion = new IntersectionObserver((es) => {
    es.forEach((e) => {
      alVisible?.(e.isIntersecting);
      if (e.isIntersecting && !running && !reducir) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting) running = false;
    });
  });
  obsSeccion.observe(seccion);

  const obsPasos = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        apply(Number((e.target as HTMLElement).dataset.paso));
        if (reducir) { for (let i = 0; i < 200; i++) update(0.05); draw(); }
      }
    }),
    { rootMargin: "-55% 0px -40% 0px" },
  );
  pasos.forEach((p) => obsPasos.observe(p));

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    obsSeccion.disconnect();
    obsPasos.disconnect();
  };
}
