import { LOGO_BULL } from "./constants";
import { useVisible, GoldTx, SecLabel, SecTitle, BullBg } from "./helpers";

export default function About({ t }) {
  const [ref, vis] = useVisible();
  return (
    <section id="about" ref={ref} style={{ padding:"clamp(80px,9vw,96px) 5%", background:t.bgAlt, position:"relative", overflow:"hidden" }}>
      {/* Faint pattern background */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 64px,rgba(212,175,55,0.055) 64px,rgba(212,175,55,0.055) 65px)` }} />
      <BullBg opacity={0.04} size={460} style={{ right:"-60px", top:"50%", transform:"translateY(-50%)" }} />
      <BullBg opacity={0.025} size={260} style={{ left:"-70px", bottom:"40px", transform:"scaleX(-1)" }} />

      <div style={{ maxWidth:"1200px", margin:"0 auto", position:"relative" }}>
        <SecLabel t={t} vis={vis}>Our Story</SecLabel>
        <SecTitle t={t} vis={vis}>About <GoldTx>RAO Cattle Farm</GoldTx></SecTitle>

        <div className="agrid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center", marginTop:"52px" }}>
          <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-60px)", transition:"all 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s", position:"relative" }}>
            <div style={{ background:t.surface, border:`2px solid ${t.goldB}`, borderRadius:"6px", padding:"48px",
              textAlign:"center", boxShadow:`6px 6px 0 ${t.gold}40,${t.sGold}`, position:"relative", overflow:"hidden" }}>
              <img src={LOGO_BULL} alt="RAO Bull"
                style={{ width:"100%", maxWidth:"280px", filter:`drop-shadow(0 0 18px rgba(255,215,0,0.55))` }}
                onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
              <div style={{ display:"none", fontSize:"100px" }}>🐂</div>
              <div style={{ position:"absolute", bottom:"14px", left:"50%", transform:"translateX(-50%)",
                fontFamily:"'Cinzel',serif", fontSize:"10px", letterSpacing:"0.35em", color:t.goldB,
                whiteSpace:"nowrap", textShadow:`0 0 10px ${t.goldB}80` }}>RAO CATTLE FARM</div>
            </div>
            {[["top","left"],["bottom","right"]].map(([v,h],i) => (
              <div key={i} style={{ position:"absolute", [v]:"-9px", [h]:"-9px", width:"28px", height:"28px",
                borderTop: i===0?`3px solid ${t.goldB}`:undefined, borderLeft: i===0?`3px solid ${t.goldB}`:undefined,
                borderBottom: i===1?`3px solid ${t.goldB}`:undefined, borderRight: i===1?`3px solid ${t.goldB}`:undefined }} />
            ))}
          </div>

          <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(60px)", transition:"all 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,1.8vw,18px)", color:t.text, lineHeight:1.9, marginBottom:"24px" }}>
              For over a decade, <span style={{ color:t.goldB, fontWeight:700, textShadow:`0 0 12px ${t.goldB}44` }}>RAO Cattle Farm</span> has been the trusted name in premium livestock across Punjab. Founded on heritage, health, and honesty — we raise every animal with care.
            </p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,1.8vw,17px)", color:t.textM, lineHeight:1.9, marginBottom:"44px" }}>
              From the golden fields of Karachi to farms across Pakistan, our Sahiwal, Cholistani, and Crossbred cattle represent the pinnacle of Pakistani livestock — naturally reared, ethically farmed.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"18px" }}>
              {[["5000+","Cattle Raised"],["16","Years Exp."],["10000+","Happy Clients"]].map(([num,lab]) => (
                <div key={lab} style={{ textAlign:"center", padding:"20px 8px", border:`1px solid ${t.border}`, borderRadius:"4px", background:t.bgCard, boxShadow:`inset 0 0 20px ${t.gold}08` }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"clamp(20px,3vw,30px)",
                    background:t.nameBg, color:t.nameTx, padding:"6px 0", borderRadius:"3px",
                    boxShadow:"0 1px 8px rgba(212,175,55,0.18)", letterSpacing:"0.04em" }}>{num}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"10px", letterSpacing:"0.18em", color:t.textM, marginTop:"4px" }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
