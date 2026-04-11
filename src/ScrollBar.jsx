import { useState, useEffect } from "react";

export default function ScrollBar({ t }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const tot=document.body.scrollHeight-window.innerHeight; setPct(tot>0?(window.scrollY/tot)*100:0); };
    window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn);
  },[]);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"3px", zIndex:2000 }}>
      <div style={{ height:"100%", width:`${pct}%`, background:t.gShine, backgroundSize:"300% 100%",
        animation:"goldFlow 2s linear infinite", transition:"width 0.15s ease",
        boxShadow:`0 0 12px ${t.goldB}` }} />
    </div>
  );
}
