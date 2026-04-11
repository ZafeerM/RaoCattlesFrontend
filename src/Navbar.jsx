import { useState, useEffect } from "react";
import { LOGO_FULL, NAV } from "./constants";

export default function Navbar({ theme, t, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" }); setActive(id); setMob(false); };

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, padding:"0 5%",
      background: scrolled?t.navBg:"transparent", backdropFilter: scrolled?"blur(24px)":"none",
      borderBottom: scrolled?`1px solid ${t.border}`:"none",
      transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
      display:"flex", alignItems:"center", justifyContent:"space-between", height:"76px" }}>

      {/* Logo image */}
      <div onClick={() => go("Home")} style={{ cursor:"pointer", height:"54px", display:"flex", alignItems:"center" }}>
        <img src={LOGO_FULL} alt="RAO Cattle Farm"
          style={{ height:"52px", width:"auto", objectFit:"contain", filter:"drop-shadow(0 0 10px rgba(212,175,55,0.55))" }} />
      </div>

      <div className="dnav" style={{ display:"flex", alignItems:"center", gap:"34px" }}>
        {NAV.map(l => {
          const isLight = theme === "light";
          const navColor = active===l ? t.goldB : (isLight ? t.gold : "#FFD700");
          const navShadow = isLight ? "0 1px 4px #C8960C55" : "0 2px 12px #000, 0 0 8px #FFD70099";
          return (
            <button key={l} onClick={() => go(l)} style={{ background:"none", border:"none", cursor:"pointer",
              fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"13px",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color: navColor,
              borderBottom: active===l?`1.5px solid ${t.goldB}`:"1.5px solid transparent",
              padding:"4px 0", transition:"all 0.3s ease",
              textShadow: navShadow }}
              onMouseEnter={e=>{ if(active!==l) e.currentTarget.style.color=t.goldB; }}
              onMouseLeave={e=>{ if(active!==l) e.currentTarget.style.color=isLight?t.gold:"#FFD700"; }}
            >{l}</button>
          );
        })}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <button onClick={toggleTheme} style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:"20px",
          padding:"6px 14px", cursor:"pointer", color:t.text, fontSize:"12px",
          fontFamily:"'Montserrat',sans-serif", display:"flex", alignItems:"center", gap:"6px", transition:"all 0.3s" }}>
          {theme==="dark"?"☀️":"🌙"} <span style={{ fontSize:"10px", letterSpacing:"0.1em" }}>{theme==="dark"?"LIGHT":"DARK"}</span>
        </button>
        <button className="mbtn" onClick={() => setMob(o=>!o)}
          style={{ background:"none", border:`1px solid ${t.border}`, borderRadius:"8px",
            padding:"8px 10px", cursor:"pointer", color:t.goldB, fontSize:"18px", lineHeight:1, display:"none" }}>
          {mob?"✕":"☰"}
        </button>
      </div>

      {mob && (
        <div style={{ position:"absolute", top:"76px", left:0, right:0, background:t.navBg,
          backdropFilter:"blur(24px)", borderBottom:`1px solid ${t.border}`, padding:"12px 5%",
          display:"flex", flexDirection:"column", gap:"4px" }}>
          {NAV.map(l => (
            <button key={l} onClick={() => go(l)} style={{ background: active===l?`${t.goldB}14`:"none",
              border:"none", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontWeight:700,
              fontSize:"13px", letterSpacing:"0.15em", textTransform:"uppercase",
              color: active===l?t.goldB:t.text, padding:"14px 16px", textAlign:"left", borderRadius:"6px" }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
