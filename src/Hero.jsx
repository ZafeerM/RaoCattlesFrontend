import { useState, useEffect } from "react";
import { LOGO_FULL } from "./constants";
import { GoldBtn, OutBtn } from "./helpers";

export default function Hero({ t, theme }) {
  const [loaded, setLoaded] = useState(false);
  const [mp, setMp] = useState({ x:50, y:50 });
  useEffect(() => {
    let frame = null;
    const revealId = window.requestAnimationFrame(() => setLoaded(true));
    const fn = (e) => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        setMp({ x:(e.clientX/window.innerWidth)*100, y:(e.clientY/window.innerHeight)*100 });
        frame = null;
      });
    };
    window.addEventListener("mousemove", fn);
    return () => {
      window.cancelAnimationFrame(revealId);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("mousemove", fn);
    };
  }, []);

  return (
    <section id="home" style={{ minHeight:"100vh", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
      {/* VIDEO BACKGROUND */}
      <video autoPlay muted loop playsInline preload="metadata" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}>
        <source src="/homepage_video/homepage_video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom,rgba(0,0,0,0.74) 0%,rgba(0,0,0,0.52) 50%,rgba(0,0,0,0.82) 100%)" }} />

      {/* Mouse glow */}
      <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        background:`radial-gradient(ellipse at ${mp.x}% ${mp.y}%,rgba(212,175,55,0.12) 0%,transparent 55%)`,
        transition:"background 0.35s ease" }} />

      {/* Decorative horizontal gold lines */}
      {[18,50,82].map((p,i) => (
        <div key={i} style={{ position:"absolute", left:0, right:0, top:`${p}%`, height:"1px",
          background:"linear-gradient(to right,transparent,rgba(212,175,55,0.18),transparent)", zIndex:2 }} />
      ))}

      <div style={{ position:"relative", zIndex:3, textAlign:"center", padding:"100px 5% 80px", maxWidth:"960px", margin:"0 auto" }}>
        {/* Est. 2010 — above logo */}
        <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:600, fontSize:"clamp(10px,1.4vw,13px)",
          letterSpacing:"0.46em", color:"rgba(255,215,0,0.88)", textTransform:"uppercase", marginBottom:"32px",
          opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(20px)",
          transition:"all 1s ease 0.5s", textShadow:"0 0 20px rgba(255,215,0,0.5)" }}>
          ── Est. 2010 · Karachi, Pakistan ──
        </div>

        {/* LOGO — centrepiece of hero */}
        <div style={{
          opacity: loaded?1:0,
          transform: loaded?"scale(1) translateY(0)":"scale(0.82) translateY(30px)",
          transition:"all 1.3s cubic-bezier(0.16,1,0.3,1) 0.9s",
          marginBottom:"32px",
          filter:"drop-shadow(0 0 48px rgba(212,175,55,0.65)) drop-shadow(0 0 100px rgba(212,175,55,0.22))",
        }}>
          <img src={LOGO_FULL} alt="RAO Cattle Farm"
            fetchPriority="high"
            style={{ maxWidth:"min(540px,82vw)", width:"100%", height:"auto", margin:"0 auto", display:"block" }}
            onError={e => e.target.style.display="none"} />
        </div>

        <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
          fontSize:"clamp(15px,2vw,20px)", color:"rgba(245,242,236,0.88)",
          maxWidth:"540px", margin:"0 auto 48px", lineHeight:1.85,
          opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(20px)",
          transition:"all 1s ease 1.1s" }}>
          Breeding excellence across generations. Premium livestock for discerning buyers across Pakistan.
        </p>

        <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap",
          opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(20px)",
          transition:"all 1s ease 1.3s" }}>
          <GoldBtn t={t} large onClick={() => document.getElementById("products")?.scrollIntoView({ behavior:"smooth" })}>View Our Cattle</GoldBtn>
          <OutBtn t={t} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
            <span style={{ color: theme==="light"?t.gold:t.goldB, textShadow: theme==="light"?"0 1px 4px #C8960C55":"0 2px 12px #000, 0 0 8px #FFD70099", fontWeight: 800 }}>Contact Us</span>
          </OutBtn>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}
        aria-label="Scroll to About section"
        style={{
          position:"absolute",
          left:"50%",
          bottom:"28px",
          transform:"translateX(-50%)",
          zIndex:3,
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          gap:"4px",
          background:"none",
          border:"none",
          cursor:"pointer",
          padding:0,
          opacity: loaded?0.72:0,
          transition:"opacity 1s ease 1.6s"
        }}>
        <div style={{ color:"#FFD700", fontSize:"22px", textShadow:"0 0 14px #FFD700", animation:"heroScroll 2.2s ease infinite" }}>↓</div>
        <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:"rgba(255,215,0,0.65)" }}>SCROLL</div>
      </button>
    </section>
  );
}
