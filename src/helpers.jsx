import { useState, useEffect, useRef } from "react";
import { LOGO_BULL } from "./constants";

// ─── Utilities ──────────────────────────────────────────────────────────────
export function formatPricePKR(price) {
  const n = Number(price);
  if (isNaN(n)) return `PKR ${price}`;
  if (n >= 10_000_000) {
    const val = +(n / 10_000_000).toFixed(2);
    return `PKR ${val} Crore`;
  }
  if (n >= 100_000) {
    const val = +(n / 100_000).toFixed(2);
    return `PKR ${val} Lakh`;
  }
  return `PKR ${n.toLocaleString()}`;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function useVisible(opts = {}) {
  const { threshold = 0.01, rootMargin = "0px 0px 18% 0px" } = opts;
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, { threshold, rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, vis];
}

// ─── Reusable UI Components ──────────────────────────────────────────────────
export function GoldTx({ children }) {
  return <span style={{ background:"linear-gradient(135deg,#6B4B08 0%,#B8860B 24%,#F2C94C 48%,#FFE169 62%,#F2C94C 76%,#B8860B 90%,#6B4B08 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"drop-shadow(0 2px 4px rgba(107,75,8,0.18))" }}>{children}</span>;
}

export function GoldBtn({ t, children, onClick, fullWidth, large }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? t.gGradH : t.gGrad, border:"none", cursor:"pointer",
        fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize: large?"13px":"12px",
        letterSpacing:"0.2em", textTransform:"uppercase", color:"#080808",
        padding: large?"16px 44px":"13px 32px", borderRadius:"3px",
        width: fullWidth?"100%":"auto", transition:"all 0.3s ease",
        boxShadow: h ? t.sGoldS : "none", transform: h?"translateY(-3px)":"translateY(0)",
        position:"relative", overflow:"hidden" }}>
      {children}
      <span style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%",
        background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.3) 50%,transparent 100%)",
        animation: h?"shimBtn 0.6s ease forwards":"none" }} />
    </button>
  );
}

export function OutBtn({ t, children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h?`${t.goldB}18`:"transparent", border:`1.5px solid ${h?t.goldB:t.border}`,
        cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:700,
        fontSize:"12px", letterSpacing:"0.22em", textTransform:"uppercase",
        color: h?t.goldB:t.text, padding:"15px 36px", borderRadius:"3px",
        transition:"all 0.3s ease", transform: h?"translateY(-3px)":"translateY(0)" }}>{children}</button>
  );
}

export function SecLabel({ t, vis, children }) {
  return <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"11px", letterSpacing:"0.44em", textTransform:"uppercase", color:t.goldB, marginBottom:"14px", textAlign:"center", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease", textShadow:`0 0 18px ${t.goldB}55` }}>── {children} ──</div>;
}

export function SecTitle({ t, vis, children }) {
  return <h2 style={{ fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"clamp(28px,5vw,56px)", color:t.text, textAlign:"center", margin:0, letterSpacing:"0.05em", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>{children}</h2>;
}

export function BullBg({ opacity=0.04, size=400, style={} }) {
  return (
    <div style={{ position:"absolute", pointerEvents:"none", userSelect:"none", ...style }}>
      <img src={LOGO_BULL} alt="" width={size}
        style={{ filter:"sepia(1) saturate(3) hue-rotate(10deg) brightness(0.7)", opacity }} />
    </div>
  );
}
