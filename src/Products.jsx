import { useState } from "react";
import { CATTLE, TAG_C } from "./constants";
import { useVisible, GoldTx, SecLabel, SecTitle, BullBg } from "./helpers";

function CattleCard({ c, t, vis, delay, hov, onHov, onLeave, idx, onIdx }) {
  const tc = TAG_C[c.tag];
  return (
    <div onMouseEnter={onHov} onMouseLeave={onLeave} style={{
      background:t.bgCard, border:`1px solid ${hov?t.borderHv:t.border}`, borderRadius:"10px",
      overflow:"hidden", cursor:"default",
      transform: vis?(hov?"translateY(-10px) scale(1.018)":"translateY(0) scale(1)"):"translateY(50px)",
      opacity: vis?1:0, transition:`all 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      boxShadow: hov?`0 24px 64px rgba(0,0,0,0.55),${t.sGold}`:t.shadow, position:"relative" }}>

      {c.tag && <div style={{ position:"absolute", top:"14px", right:"14px", zIndex:3,
        background:tc.bg, color:tc.tx, fontFamily:"'Montserrat',sans-serif", fontWeight:800,
        fontSize:"9px", letterSpacing:"0.2em", padding:"4px 12px", borderRadius:"2px",
        boxShadow:"0 2px 10px rgba(0,0,0,0.35)" }}>{c.tag}</div>}

      {/* Carousel */}
      <div style={{ position:"relative", height:"224px", overflow:"hidden", background:"#080808" }}>
        <div style={{ display:"flex", height:"100%", transform:`translateX(-${idx*100}%)`, transition:"transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
          {c.images.map((src,i) => (
            <div key={i} style={{ minWidth:"100%", height:"100%", position:"relative", overflow:"hidden" }}>
              <img src={src} alt={`${c.name} ${i+1}`} loading="lazy"
                style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s ease", transform:hov?"scale(1.06)":"scale(1)" }}
                onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
              <div style={{ display:"none", position:"absolute", inset:0, alignItems:"center", justifyContent:"center",
                fontSize:"80px", background:`radial-gradient(ellipse,${t.gold}18,transparent)` }}>🐂</div>
            </div>
          ))}
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"64px",
          background:`linear-gradient(to top,${t.bgCard},transparent)`, zIndex:1 }} />
        {c.images.length>1 && (
          <div style={{ position:"absolute", bottom:"12px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"6px", zIndex:2 }}>
            {c.images.map((_,i) => (
              <button key={i} onClick={()=>onIdx(i)} aria-label={`Photo ${i+1}`}
                style={{ width:i===idx?"22px":"6px", height:"6px", borderRadius:"3px",
                  background:i===idx?t.goldB:`${t.gold}50`, border:"none", cursor:"pointer", padding:0,
                  transition:"all 0.3s ease", boxShadow:i===idx?`0 0 7px ${t.goldB}`:"none" }} />
            ))}
          </div>
        )}
        {c.images.length>1 && <>
          <button onClick={()=>onIdx(Math.max(0,idx-1))}
            style={{ position:"absolute", left:"10px", top:"50%", transform:"translateY(-50%)", zIndex:2,
              background:"rgba(0,0,0,0.55)", border:`1px solid ${t.gold}50`, color:t.goldB,
              cursor:"pointer", width:"30px", height:"30px", borderRadius:"50%", fontSize:"15px",
              opacity:idx>0?1:0.2 }}>‹</button>
          <button onClick={()=>onIdx(Math.min(c.images.length-1,idx+1))}
            style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", zIndex:2,
              background:"rgba(0,0,0,0.55)", border:`1px solid ${t.gold}50`, color:t.goldB,
              cursor:"pointer", width:"30px", height:"30px", borderRadius:"50%", fontSize:"15px",
              opacity:idx<c.images.length-1?1:0.2 }}>›</button>
        </>}
      </div>

      <div style={{ padding:"22px 24px 24px" }}>
        {/* NAME PLATE — vibrant gold, fully visible in both modes */}
        <div style={{ background:t.nameBg, padding:"10px 18px", marginBottom:"16px", borderRadius:"3px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          boxShadow:`0 3px 18px rgba(212,175,55,0.55),0 0 32px rgba(212,175,55,0.18)`,
          position:"relative", overflow:"hidden" }}>
          <span style={{ position:"absolute", top:0, left:"-100%", width:"60%", height:"100%",
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)",
            animation:hov?"shimPlate 0.9s ease forwards":"none" }} />
          <span style={{ fontFamily:"'Cinzel',serif", fontWeight:800, fontSize:"18px",
            color:t.nameTx, letterSpacing:"0.08em", zIndex:1 }}>{c.name}</span>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"10px",
            color:t.nameTx, opacity:0.7, letterSpacing:"0.15em", zIndex:1 }}>{c.breed}</span>
        </div>

        <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"13px",
          color:t.textM, lineHeight:1.75, marginBottom:"18px" }}>{c.desc}</p>

        <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"20px" }}>
          <tbody>
            {[["Age",c.age],["Weight",c.weight],["Color",c.color],["Teeth",c.teeth]].map(([k,v]) => (
              <tr key={k} style={{ borderBottom:`1px solid ${t.border}` }}>
                <td style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"10px", letterSpacing:"0.12em", color:t.textM, padding:"8px 0", textTransform:"uppercase" }}>{k}</td>
                <td style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"12px", color:t.text, padding:"8px 0", textAlign:"right" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"9px", letterSpacing:"0.25em", color:t.textM, marginBottom:"3px" }}>ASKING PRICE</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontWeight:800, fontSize:"clamp(14px,2vw,18px)",
              color:t.goldB }}>{c.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products({ t }) {
  const [ref, vis] = useVisible();
  const [hovId, setHovId] = useState(null);
  const [imgs, setImgs] = useState({});
  const gI = (id) => imgs[id]||0;
  const sI = (id,i) => setImgs(p=>({...p,[id]:i}));

  return (
    <section id="products" ref={ref} style={{ padding:"120px 5%", background:t.bg, position:"relative", overflow:"hidden" }}>
      {/* Gold grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(rgba(212,175,55,0.038) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.038) 1px,transparent 1px)`,
        backgroundSize:"88px 88px" }} />
      <BullBg opacity={0.025} size={640} style={{ left:"50%", top:"8%", transform:"translateX(-50%)" }} />

      <div style={{ maxWidth:"1380px", margin:"0 auto", position:"relative" }}>
        <SecLabel t={t} vis={vis}>Premium Livestock</SecLabel>
        <SecTitle t={t} vis={vis}>Our <GoldTx>Cattle</GoldTx></SecTitle>

        <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))", gap:"32px", marginTop:"60px" }}>
          {CATTLE.map((c,i) => (
            <CattleCard key={c.id} c={c} t={t} vis={vis} delay={i*0.08}
              hov={hovId===c.id} onHov={()=>setHovId(c.id)} onLeave={()=>setHovId(null)}
              idx={gI(c.id)} onIdx={(x)=>sI(c.id,x)} />
          ))}
        </div>
      </div>
    </section>
  );
}
