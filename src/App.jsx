import { useState } from "react";
import { T } from "./constants";
import ScrollBar from "./ScrollBar";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const t = T[theme];
  const toggle = () => setTheme(th => th==="dark"?"light":"dark");

  return (
    <div style={{ background:t.bg, color:t.text, minHeight:"100vh", transition:"background 0.4s ease,color 0.4s ease" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${t.bg};}
        ::-webkit-scrollbar-thumb{background:${t.gGrad};border-radius:3px;}
        @keyframes heroScroll{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
        @keyframes shimBtn{from{background-position:200% 0}to{background-position:-200% 0}}
        @keyframes shimPlate{from{left:-100%}to{left:200%}}
        @keyframes goldFlow{0%{background-position:0% 50%}100%{background-position:300% 50%}}
        input,textarea{caret-color:${t.goldB};}
        input::placeholder,textarea::placeholder{color:${t.textD};}
        @media(max-width:900px){
          .dnav{display:none !important;}
          .mbtn{display:flex !important;}
          .agrid{grid-template-columns:1fr !important;gap:40px !important;}
          .cgrid{grid-template-columns:1fr !important;gap:48px !important;}
          .fgrid{grid-template-columns:1fr 1fr !important;}
          .pgrid{grid-template-columns:1fr !important;}
        }
        @media(max-width:500px){.fgrid{grid-template-columns:1fr !important;}}
      `}</style>

      <ScrollBar t={t} />
      <Navbar theme={theme} t={t} toggleTheme={toggle} />
      <Hero t={t} theme={theme} />
      <About t={t} />
      <Products t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
