import { LOGO_FULL } from "./constants";
import { BullBg } from "./helpers";

export default function Footer({ t }) {
  return (
    <footer style={{ background:t.bg, borderTop:`1px solid ${t.border}`, padding:"52px 5% 32px", position:"relative", overflow:"hidden" }}>
      <BullBg opacity={0.038} size={220} style={{ right:"5%", bottom:"20px" }} />
      <div style={{ maxWidth:"1200px", margin:"0 auto", position:"relative" }}>
        <div className="fgrid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"40px", marginBottom:"40px" }}>
          <div>
            <div style={{ marginBottom:"20px" }}>
              <img src={LOGO_FULL} alt="RAO Cattle Farm"
                style={{ height:"56px", width:"auto", filter:"drop-shadow(0 0 8px rgba(212,175,55,0.4))" }}
                onError={e=>e.target.style.display="none"} />
            </div>
            <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"14px", color:t.textM, lineHeight:1.85 }}>
              Raising excellence, one generation at a time. Trusted by families across Pakistan since 2010.
            </p>
          </div>

          {[
            { title:"Quick Links",    links:["Home","About Us","Our Services","Products","Contact"] },
            { title:"Business Hours", links:["Mon–Fri: 9am–7pm","Saturday: 9am–5pm","Sunday: Closed"] },
            { title:"Our Office",     links:["Manga Mandi Road","Lahore, Punjab","+92 300 000 0000","info@raocattlefarm.pk"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"11px",
                letterSpacing:"0.28em", color:t.goldB, textTransform:"uppercase", marginBottom:"20px" }}>{col.title}</h4>
              {col.links.map(l => (
                <div key={l} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"13px", color:t.textM, marginBottom:"10px" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:"28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px", marginBottom:"18px" }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"12px", color:t.textM }}>© 2025 RAO Cattle Farm. All rights reserved.</div>
            <div style={{ display:"flex", gap:"20px" }}>
              {["Privacy Policy","Terms & Conditions","Support"].map(l => (
                <span key={l} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"12px", color:t.textM, cursor:"pointer" }}>{l}</span>
              ))}
            </div>
          </div>
          {/* ── Made with ❤️ by Zafeer ── */}
          <div style={{ textAlign:"center", paddingTop:"6px" }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"13px",
              color:t.textM, letterSpacing:"0.04em" }}>
              Made with ❤️ by Zafeer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
