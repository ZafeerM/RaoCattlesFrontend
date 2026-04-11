// ─── Logo Image URLs ──────────────────────────────────────────────────────────
export const LOGO_FULL = "/final.png";
export const LOGO_BULL = "/output-onlinepngtools.png";

// ─── GOOGLE MAPS API KEY ──────────────────────────────────────────────────────
export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
export const FARM_LAT  = 31.3804;
export const FARM_LNG  = 74.1883;
export const FARM_QUERY = "RAO+Cattle+Farm+Karachi+Pakistan";

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const T = {
  dark: {
    bg: "#080808", bgAlt: "#0E0E0E", bgCard: "#131313", surface: "#1B1B1B",
    border: "rgba(212,175,55,0.28)", borderHv: "rgba(255,215,0,0.85)",
    text: "#F4F2EC", textM: "#908870", textD: "#3A3A3A",
    gold: "#D4AF37", goldB: "#FFD700", goldL: "#FFE566", goldDk: "#9A7A14",
    gGrad:  "linear-gradient(135deg,#6B4B08 0%,#C09A20 28%,#FFD700 50%,#FFF5A0 62%,#FFD700 75%,#C09A20 87%,#6B4B08 100%)",
    gGradH: "linear-gradient(135deg,#8A6210 0%,#DEB830 28%,#FFF080 50%,#FFD700 75%,#8A6210 100%)",
    gShine: "linear-gradient(90deg,#6B4B08,#C09A20,#FFD700,#FFF5A0,#FFD700,#C09A20,#6B4B08)",
    navBg: "rgba(8,8,8,0.94)", cardBg: "#131313", inputBg: "#1B1B1B",
    shadow: "0 8px 48px rgba(0,0,0,0.75)",
    sGold:  "0 0 40px rgba(212,175,55,0.35),0 0 80px rgba(212,175,55,0.12)",
    sGoldS: "0 0 20px rgba(255,215,0,0.65),0 0 60px rgba(212,175,55,0.3)",
    nameBg: "linear-gradient(135deg,#6B4B08 0%,#C09A20 30%,#FFD700 50%,#C09A20 70%,#6B4B08 100%)",
    nameTx: "#080808",
  },
  light: {
    bg: "#FAF6EE", bgAlt: "#F2EBD9", bgCard: "#FFFFFF", surface: "#F4EFE2",
    border: "rgba(155,118,15,0.32)", borderHv: "rgba(180,138,10,0.9)",
    text: "#18100A", textM: "#5C4718", textD: "#B0A070",
    gold: "#9A7010", goldB: "#C8960C", goldL: "#E8B820", goldDk: "#6A4A08",
    gGrad:  "linear-gradient(135deg,#4E2E04 0%,#8A6010 28%,#C8960C 50%,#E8C030 62%,#C8960C 75%,#8A6010 87%,#4E2E04 100%)",
    gGradH: "linear-gradient(135deg,#6A4A08 0%,#AA8018 28%,#E0B022 50%,#C8960C 75%,#6A4A08 100%)",
    gShine: "linear-gradient(90deg,#4E2E04,#8A6010,#C8960C,#E8D060,#C8960C,#8A6010,#4E2E04)",
    navBg: "rgba(250,246,238,0.94)", cardBg: "#FFFFFF", inputBg: "#F4EFE2",
    shadow: "0 8px 40px rgba(0,0,0,0.10)",
    sGold:  "0 0 40px rgba(155,118,15,0.22)",
    sGoldS: "0 0 20px rgba(180,138,10,0.45),0 0 60px rgba(155,118,15,0.18)",
    nameBg: "linear-gradient(135deg,#4E2E04 0%,#8A6010 30%,#C8960C 50%,#8A6010 70%,#4E2E04 100%)",
    nameTx: "#FAF6EE",
  },
};

// ─── Cattle Data ──────────────────────────────────────────────────────────────
export const CATTLE = [
  { id:1, name:"Sultan",   breed:"Sahiwal",   age:"4 Years", weight:"650 kg", price:"PKR 4,50,000", tag:"FEATURED",
    desc:"Premium Sahiwal bull with exceptional lineage. Superior milk genetics and impressive build — ideal for breeding programs.",
    color:"Deep Reddish Brown", teeth:"Full Permanent",
    images:["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=640&q=80","https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=640&q=80","https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=640&q=80"] },
  { id:2, name:"Rustam",   breed:"Crossbred", age:"5 Years", weight:"720 kg", price:"PKR 5,20,000", tag:"PREMIUM",
    desc:"Heavyweight crossbred with impeccable conformation. Show-quality animal, excellent temperament and robust health.",
    color:"Black & White Patches", teeth:"Full Permanent",
    images:["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=640&q=80","https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=640&q=80"] },
  { id:3, name:"Bahadur",  breed:"Cholistani",age:"3 Years", weight:"580 kg", price:"PKR 3,80,000", tag:"NEW",
    desc:"Pure Cholistani from the heart of Punjab desert. Exceptional heat tolerance — built for the Pakistani climate.",
    color:"Grey with Dark Markings", teeth:"2 Permanent",
    images:["https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=640&q=80","https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=640&q=80"] },
  { id:4, name:"Mughmal",  breed:"Thari",     age:"6 Years", weight:"800 kg", price:"PKR 6,50,000", tag:"RARE",
    desc:"Our prized Thari bull — massive frame, calm demeanor. A once-in-a-generation specimen for Qurbani or elite breeding.",
    color:"Pure White", teeth:"Full Permanent",
    images:["https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=640&q=80","https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=640&q=80"] },
  { id:5, name:"Zulfiqar", breed:"Sahiwal",   age:"4 Years", weight:"630 kg", price:"PKR 4,10,000", tag:null,
    desc:"Strong-boned Sahiwal with deep chest and well-arched ribs. Vaccinated, dewormed, ready for delivery.",
    color:"Reddish Brown", teeth:"Full Permanent",
    images:["https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=640&q=80","https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=640&q=80"] },
  { id:6, name:"Tipu",     breed:"Crossbred", age:"3 Years", weight:"560 kg", price:"PKR 3,50,000", tag:null,
    desc:"Young and energetic crossbred with tremendous potential. Well-fed on natural pasture and premium fodder at RAO Farm.",
    color:"Brown", teeth:"2 Permanent",
    images:["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=640&q=80","https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=640&q=80"] },
  { id:7, name:"Tipu",     breed:"Crossbred", age:"3 Years", weight:"560 kg", price:"PKR 3,50,000", tag:null,
    desc:"Young and energetic crossbred with tremendous potential. Well-fed on natural pasture and premium fodder at RAO Farm.",
    color:"Brown", teeth:"2 Permanent",
    images:["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=640&q=80","https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=640&q=80"] },
];

export const TAG_C = {
  FEATURED: { bg:"linear-gradient(135deg,#FFD700,#FF8C00)", tx:"#080808" },
  PREMIUM:  { bg:"linear-gradient(135deg,#9B30FF,#FF1493)", tx:"#FFF" },
  NEW:      { bg:"linear-gradient(135deg,#00C9A7,#007CF0)", tx:"#FFF" },
  RARE:     { bg:"linear-gradient(135deg,#FF4500,#FF0066)", tx:"#FFF" },
};

export const NAV = ["Home","About","Products","Contact"];
