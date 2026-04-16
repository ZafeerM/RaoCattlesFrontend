import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { API_BASE, CLOUDINARY_BASE } from "./constants";
import { useVisible, GoldTx, SecLabel, SecTitle, BullBg } from "./helpers";

function buildImgUrl(publicId) {
  if (!publicId) return null;
  return `${CLOUDINARY_BASE}${publicId}`;
}

function mapProduct(p) {
  const images = [p.image1, p.image2, p.image3].map(buildImgUrl).filter(Boolean);
  return {
    id: p.id,
    name: p.name,
    breed: p.breed,
    desc: p.description,
    age: `${p.age} Years`,
    weight: `${p.weight} kg`,
    color: p.color,
    teeth: `${p.teeth}`,
    price: `PKR ${Number(p.price).toLocaleString()}`,
    tag: p.sold ? "SOLD" : null,
    images,
  };
}

const TAG_C = {
  SOLD: { bg: "linear-gradient(135deg,#FF4500,#FF0066)", tx: "#FFF" },
};

const PAGE_SIZE = 6;

function CattleCard({ c, t, vis, delay, hov, onHov, onLeave, idx, onIdx, onOpen }) {
  // Swipe handlers for main carousel
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onIdx(Math.min(c.images.length - 1, idx + 1)),
    onSwipedRight: () => onIdx(Math.max(0, idx - 1)),
    trackMouse: true,
    trackTouch: true,
  });
  const tc = TAG_C[c.tag];
  return (
    <div
      onMouseEnter={onHov}
      onMouseLeave={onLeave}
      style={{
        background: t.bgCard,
        border: `1px solid ${hov ? t.borderHv : t.border}`,
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "default",
        transform: vis ? (hov ? "translateY(-10px) scale(1.018)" : "translateY(0) scale(1)") : "translateY(50px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        boxShadow: hov ? `0 24px 64px rgba(0,0,0,0.55),${t.sGold}` : t.shadow,
        position: "relative",
      }}>
      {c.tag && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 3,
            background: tc.bg,
            color: tc.tx,
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 800,
            fontSize: "9px",
            letterSpacing: "0.2em",
            padding: "4px 12px",
            borderRadius: "2px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}>
          {c.tag}
        </div>
      )}

      {/* Carousel */}
      <button
        type="button"
        onClick={() => onOpen(c, idx)}
        aria-label={`Open ${c.name} gallery preview`}
        style={{
          position: "relative",
          height: "224px",
          overflow: "hidden",
          background: "#080808",
          width: "100%",
          border: "none",
          padding: 0,
          display: "block",
          cursor: "zoom-in",
        }}
        {...swipeHandlers}>
        <div
          style={{
            display: "flex",
            height: "100%",
            transform: `translateX(-${idx * 100}%)`,
            transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}>
          {c.images.map((src, i) => (
            <div key={i} style={{ minWidth: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
              <img
                src={src}
                alt={`${c.name} ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                  transform: hov ? "scale(1.06)" : "scale(1)",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  display: "none",
                  position: "absolute",
                  inset: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "80px",
                  background: `radial-gradient(ellipse,${t.gold}18,transparent)`,
                }}>
                🐂
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "64px",
            background: `linear-gradient(to top,${t.bgCard},transparent)`,
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            zIndex: 3,
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 700,
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#080808",
            background: t.gGrad,
            padding: "5px 12px",
            borderRadius: "999px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.28)",
          }}>
          OPEN
        </div>
        {c.images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "6px",
              zIndex: 2,
            }}>
            {c.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIdx(i);
                }}
                aria-label={`Photo ${i + 1}`}
                style={{
                  width: i === idx ? "22px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === idx ? t.goldB : `${t.gold}50`,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                  boxShadow: i === idx ? `0 0 7px ${t.goldB}` : "none",
                }}
              />
            ))}
          </div>
        )}
        {c.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIdx(Math.max(0, idx - 1));
              }}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                background: "rgba(0,0,0,0.55)",
                border: `1px solid ${t.gold}50`,
                color: t.goldB,
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                fontSize: "15px",
                opacity: idx > 0 ? 1 : 0.2,
              }}>
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIdx(Math.min(c.images.length - 1, idx + 1));
              }}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                background: "rgba(0,0,0,0.55)",
                border: `1px solid ${t.gold}50`,
                color: t.goldB,
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                fontSize: "15px",
                opacity: idx < c.images.length - 1 ? 1 : 0.2,
              }}>
              ›
            </button>
          </>
        )}
      </button>

      <div style={{ padding: "22px 24px 24px" }}>
        {/* NAME PLATE — vibrant gold, fully visible in both modes */}
        <div
          style={{
            background: t.nameBg,
            padding: "10px 18px",
            marginBottom: "16px",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: `0 3px 18px rgba(212,175,55,0.55),0 0 32px rgba(212,175,55,0.18)`,
            position: "relative",
            overflow: "hidden",
          }}>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)",
              animation: hov ? "shimPlate 0.9s ease forwards" : "none",
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontWeight: 800,
              fontSize: "18px",
              color: t.nameTx,
              letterSpacing: "0.08em",
              zIndex: 1,
            }}>
            {c.name}
          </span>
          <span
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 700,
              fontSize: "10px",
              color: t.nameTx,
              opacity: 0.7,
              letterSpacing: "0.15em",
              zIndex: 1,
            }}>
            {c.breed}
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontStyle: "italic",
            fontSize: "13px",
            color: t.textM,
            lineHeight: 1.75,
            marginBottom: "18px",
          }}>
          {c.desc}
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <tbody>
            {[
              ["Age", c.age],
              ["Weight", c.weight],
              ["Color", c.color],
              ["Teeth", c.teeth],
            ].map(([k, v]) => (
              <tr key={k} style={{ borderBottom: `1px solid ${t.border}` }}>
                <td
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: t.textM,
                    padding: "8px 0",
                    textTransform: "uppercase",
                  }}>
                  {k}
                </td>
                <td
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "12px",
                    color: t.text,
                    padding: "8px 0",
                    textAlign: "right",
                  }}>
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "9px",
                letterSpacing: "0.25em",
                color: t.textM,
                marginBottom: "3px",
              }}>
              ASKING PRICE
            </div>
            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontWeight: 800,
                fontSize: "clamp(14px,2vw,18px)",
                color: t.goldB,
              }}>
              {c.price}
            </div>
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
  const [lightbox, setLightbox] = useState(null);
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef(null);
  const gI = (id) => imgs[id] || 0;
  const sI = (id, i) => setImgs((p) => ({ ...p, [id]: i }));
  const openLightbox = (c, index) => setLightbox({ cattle: c, index });
  const closeLightbox = () => setLightbox(null);
  const moveLightbox = (direction) => {
    setLightbox((current) => {
      if (!current) {
        return current;
      }
      const total = current.cattle.images.length;
      return {
        ...current,
        index: (current.index + direction + total) % total,
      };
    });
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setCattle(data.map(mapProduct));
        setVisibleCount(PAGE_SIZE);
      })
      .catch(() => setCattle([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || visibleCount >= cattle.length || !loadMoreRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(current + PAGE_SIZE, cattle.length));
        }
      },
      { rootMargin: "280px 0px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loading, visibleCount, cattle.length]);

  const lightboxSwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (lightbox) moveLightbox(1);
    },
    onSwipedRight: () => {
      if (lightbox) moveLightbox(-1);
    },
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    if (!lightbox) {
      return undefined;
    }
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (e.key === "ArrowRight") {
        moveLightbox(1);
      }
      if (e.key === "ArrowLeft") {
        moveLightbox(-1);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  return (
    <>
      <section
        id="products"
        ref={ref}
        style={{ padding: "clamp(80px,9vw,96px) 5%", background: t.bg, position: "relative", overflow: "hidden" }}>
        {/* Gold grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(rgba(212,175,55,0.038) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.038) 1px,transparent 1px)`,
            backgroundSize: "88px 88px",
          }}
        />
        <BullBg opacity={0.025} size={640} style={{ left: "50%", top: "8%", transform: "translateX(-50%)" }} />

        <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative" }}>
          <SecLabel t={t} vis={vis}>
            Premium Livestock
          </SecLabel>
          <SecTitle t={t} vis={vis}>
            Our <GoldTx>Cattle</GoldTx>
          </SecTitle>

          <div
            className="pgrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))",
              gap: "28px",
              marginTop: "48px",
            }}>
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  color: t.textM,
                  fontSize: "14px",
                  gridColumn: "1/-1",
                  padding: "40px 0",
                }}>
                Loading products...
              </div>
            ) : cattle.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: t.textM,
                  fontSize: "14px",
                  gridColumn: "1/-1",
                  padding: "40px 0",
                }}>
                No products available.
              </div>
            ) : (
              cattle.slice(0, visibleCount).map((c, i) => (
                <CattleCard
                  key={c.id}
                  c={c}
                  t={t}
                  vis={vis}
                  delay={i * 0.08}
                  hov={hovId === c.id}
                  onHov={() => setHovId(c.id)}
                  onLeave={() => setHovId(null)}
                  idx={gI(c.id)}
                  onIdx={(x) => sI(c.id, x)}
                  onOpen={openLightbox}
                />
              ))
            )}
          </div>

          {!loading && cattle.length > 0 && visibleCount < cattle.length && (
            <div
              ref={loadMoreRef}
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                color: t.textM,
                fontSize: "13px",
                letterSpacing: "0.08em",
                marginTop: "20px",
                padding: "10px 0",
              }}>
              Loading more...
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(3,3,3,0.9)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(1080px,100%)",
              maxHeight: "min(88vh,920px)",
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: `0 32px 80px rgba(0,0,0,0.55), ${t.sGold}`,
            }}
            {...lightboxSwipeHandlers}>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close preview"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 3,
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: `1px solid ${t.border}`,
                background: "rgba(0,0,0,0.58)",
                color: t.goldB,
                cursor: "pointer",
                fontSize: "22px",
              }}>
              ×
            </button>

            <div style={{ position: "relative", background: "#050505" }}>
              <img
                src={lightbox.cattle.images[lightbox.index]}
                alt={`${lightbox.cattle.name} preview ${lightbox.index + 1}`}
                style={{ width: "100%", maxHeight: "72vh", objectFit: "contain", display: "block" }}
              />
              {lightbox.cattle.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveLightbox(-1)}
                    aria-label="Previous image"
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      border: `1px solid ${t.border}`,
                      background: "rgba(0,0,0,0.5)",
                      color: t.goldB,
                      cursor: "pointer",
                      fontSize: "24px",
                    }}>
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLightbox(1)}
                    aria-label="Next image"
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      border: `1px solid ${t.border}`,
                      background: "rgba(0,0,0,0.5)",
                      color: t.goldB,
                      cursor: "pointer",
                      fontSize: "24px",
                    }}>
                    ›
                  </button>
                </>
              )}
            </div>

            <div
              style={{
                padding: "20px 22px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontWeight: 800,
                    fontSize: "24px",
                    color: t.goldB,
                    letterSpacing: "0.05em",
                  }}>
                  {lightbox.cattle.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "11px",
                    color: t.textM,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}>
                  {lightbox.cattle.breed} • {lightbox.index + 1} / {lightbox.cattle.images.length}
                </div>
              </div>
              {lightbox.cattle.images.length > 1 && (
                <div style={{ display: "flex", gap: "8px" }}>
                  {lightbox.cattle.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightbox((current) => (current ? { ...current, index: i } : current))}
                      aria-label={`Preview image ${i + 1}`}
                      style={{
                        width: i === lightbox.index ? "28px" : "8px",
                        height: "8px",
                        borderRadius: "999px",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        background: i === lightbox.index ? t.goldB : `${t.gold}55`,
                        boxShadow: i === lightbox.index ? `0 0 12px ${t.goldB}` : "none",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
