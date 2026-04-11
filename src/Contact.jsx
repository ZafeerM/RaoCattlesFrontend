import { useState } from "react";
import { GOOGLE_MAPS_API_KEY, FARM_LAT, FARM_LNG, FARM_QUERY } from "./constants";
import { FB, WA, IG, TT } from "./icons";
import { useVisible, GoldTx, SecLabel, SecTitle, BullBg } from "./helpers";

export default function Contact({ t }) {
  const [ref, vis] = useVisible();
  const [form, setForm] = useState({ name:"", phone:"", msg:"" });
  const [sent, setSent] = useState(false);
  const submit = () => { setSent(true); setTimeout(()=>setSent(false),4000); setForm({name:"",phone:"",msg:""}); };

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${FARM_QUERY}&center=${FARM_LAT},${FARM_LNG}&zoom=15`;

  return (
    <section id="contact" ref={ref} style={{ padding:"120px 5%", background:t.bgAlt, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(-45deg,transparent,transparent 80px,rgba(212,175,55,0.024) 80px,rgba(212,175,55,0.024) 81px)` }} />
      <BullBg opacity={0.035} size={380} style={{ right:0, bottom:0 }} />

      <div style={{ maxWidth:"1200px", margin:"0 auto", position:"relative" }}>
        <SecLabel t={t} vis={vis}>Get In Touch</SecLabel>
        <SecTitle t={t} vis={vis}><GoldTx>Contact</GoldTx> Us</SecTitle>

        <div className="cgrid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", marginTop:"60px", alignItems:"start" }}>

          {/* LEFT col: info + socials */}
          <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-40px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"17px", color:t.textM, lineHeight:1.85, marginBottom:"32px" }}>
              Interested in our cattle? Reach out for pricing, availability, or to schedule a farm visit. We respond within 24 hours.
            </p>

            {[
              { ico:"📞", lab:"Phone / WhatsApp", val:"+92 300 000 0000" },
              { ico:"📧", lab:"Email",             val:"info@raocattlefarm.pk" },
              { ico:"📍", lab:"Location",          val:"Manga Mandi Road, Karachi, Sindh" },
              { ico:"🕐", lab:"Business Hours",    val:"Mon–Sat: 9:00am – 7:00pm" },
            ].map(row => (
              <div key={row.lab} style={{ display:"flex", gap:"14px", alignItems:"flex-start",
                marginBottom:"14px", padding:"14px 16px", border:`1px solid ${t.border}`,
                borderRadius:"6px", background:t.bgCard }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:t.gGrad,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px",
                  flexShrink:0, boxShadow:`0 2px 14px rgba(212,175,55,0.38)` }}>{row.ico}</div>
                <div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"10px",
                    letterSpacing:"0.2em", color:t.goldB, textTransform:"uppercase", marginBottom:"3px" }}>{row.lab}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"14px", color:t.text }}>{row.val}</div>
                </div>
              </div>
            ))}

            {/* Social icons — official brand logos via SVG */}
            <div style={{ marginTop:"26px" }}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"10px", letterSpacing:"0.34em", color:t.textM, marginBottom:"14px" }}>FOLLOW US</div>
              <div style={{ display:"flex", gap:"12px" }}>
                {[
                  { C:FB, href:"https://facebook.com",       label:"Facebook"  },
                  { C:WA, href:"https://wa.me/923000000000", label:"WhatsApp"  },
                  { C:IG, href:"https://instagram.com",      label:"Instagram" },
                  { C:TT, href:"https://tiktok.com",         label:"TikTok"    },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                    style={{ width:"48px", height:"48px", borderRadius:"50%", background:t.bgCard,
                      border:`1.5px solid ${t.border}`, display:"flex", alignItems:"center",
                      justifyContent:"center", textDecoration:"none", transition:"all 0.3s ease",
                      boxShadow:"0 2px 10px rgba(0,0,0,0.18)" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.16) translateY(-3px)"; e.currentTarget.style.borderColor=t.goldB; e.currentTarget.style.boxShadow=t.sGold; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1) translateY(0)"; e.currentTarget.style.borderColor=t.border; e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.18)"; }}>
                    <s.C />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT col: Google Maps */}
          <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(40px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
            <div style={{ border:`2px solid ${t.border}`, borderRadius:"10px", overflow:"hidden",
              boxShadow:t.sGold, position:"sticky", top:"96px" }}>
              {/* Map header bar */}
              <div style={{ background:t.gGrad, padding:"14px 20px", display:"flex", alignItems:"center", gap:"12px" }}>
                <span style={{ fontSize:"18px" }}>📍</span>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:"14px", color:"#080808" }}>RAO Cattle Farm</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"10px", color:"rgba(0,0,0,0.62)", letterSpacing:"0.1em" }}>Manga Mandi Road, Lahore</div>
                </div>
              </div>

              {/* Google Maps iframe — requires API key above */}
              {GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY" ? (
                <iframe title="RAO Cattle Farm" src={mapSrc}
                  width="100%" height="520" style={{ border:"none", display:"block" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                // Placeholder shown until key is added
                <div style={{ height:"520px", background:t.surface, display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:"18px", padding:"32px" }}>
                  <div style={{ fontSize:"56px" }}>🗺️</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"18px", color:t.goldB, textAlign:"center" }}>Live Map Here</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"12px", color:t.textM, textAlign:"center", lineHeight:1.8, maxWidth:"300px" }}>
                    Add your Google Maps API key at the top of <code style={{ color:t.goldB }}>RaoCattleFarm.jsx</code> to enable the interactive map.
                    <br/><br/>
                    <strong style={{ color:t.text }}>Steps:</strong><br/>
                    1. Visit console.cloud.google.com<br/>
                    2. Enable <em>Maps Embed API</em><br/>
                    3. Copy API key → replace <code style={{ color:t.goldB }}>YOUR_GOOGLE_MAPS_API_KEY</code>
                  </div>
                  <a href={`https://maps.google.com/?q=${FARM_LAT},${FARM_LNG}`} target="_blank" rel="noreferrer"
                    style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:"11px",
                      letterSpacing:"0.2em", color:"#080808", background:t.gGrad,
                      padding:"11px 28px", borderRadius:"3px", textDecoration:"none" }}>
                    Open Google Maps →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
