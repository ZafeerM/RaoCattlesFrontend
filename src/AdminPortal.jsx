import { useState, useRef, useEffect } from "react";
import { T, API_BASE } from "./constants";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminPortal({ token, onLogout }) {
  const t = T.dark;

  // ── Create form state ──
  const [form, setForm] = useState({
    name: "", breed: "", description: "", age: "", weight: "", color: "", teeth: "", price: "",
  });
  const [images, setImages] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileRefs = [useRef(null), useRef(null), useRef(null)];

  // ── Products list state ──
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      // silent
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImage = (index, file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setMessage({ text: `Image ${index + 1}: only JPG, PNG, WEBP allowed`, type: "error" });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setMessage({ text: `Image ${index + 1} exceeds 15MB limit`, type: "error" });
      return;
    }
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPreviews = [...previews];
      newPreviews[index] = e.target.result;
      setPreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages[index] = null;
    newPreviews[index] = null;
    setImages(newImages);
    setPreviews(newPreviews);
    if (fileRefs[index].current) fileRefs[index].current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!images[0] || !images[1] || !images[2]) {
      setMessage({ text: "All 3 images are required", type: "error" });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("Name", form.name);
      formData.append("Breed", form.breed);
      formData.append("Description", form.description);
      formData.append("Age", parseInt(form.age, 10));
      formData.append("Weight", parseFloat(form.weight));
      formData.append("Color", form.color);
      formData.append("Teeth", parseInt(form.teeth, 10));
      formData.append("Price", parseFloat(form.price));
      formData.append("Image1", images[0]);
      formData.append("Image2", images[1]);
      formData.append("Image3", images[2]);

      const res = await fetch(`${API_BASE}/api/admin/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to add product");
      }

      setMessage({ text: "Product added successfully!", type: "success" });
      setForm({ name: "", breed: "", description: "", age: "", weight: "", color: "", teeth: "", price: "" });
      setImages([null, null, null]);
      setPreviews([null, null, null]);
      fileRefs.forEach((ref) => { if (ref.current) ref.current.value = ""; });
      fetchProducts();
    } catch (err) {
      setMessage({ text: err.message || "Failed to add product", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete");
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    background: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: "4px",
    color: t.text,
    fontFamily: "'Montserrat',sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontFamily: "'Montserrat',sans-serif",
    fontWeight: 600,
    fontSize: "11px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: t.goldB,
    marginBottom: "6px",
    display: "block",
  };

  const fields = [
    { key: "name", label: "Name", type: "text", placeholder: "e.g. Sultan" },
    { key: "breed", label: "Breed", type: "text", placeholder: "e.g. Sahiwal" },
    { key: "age", label: "Age (integer)", type: "number", placeholder: "e.g. 4", step: "1" },
    { key: "weight", label: "Weight (decimal)", type: "number", placeholder: "e.g. 650", step: "any" },
    { key: "color", label: "Color", type: "text", placeholder: "e.g. Deep Reddish Brown" },
    { key: "teeth", label: "Teeth (integer)", type: "number", placeholder: "e.g. 8", step: "1" },
    { key: "price", label: "Price (PKR)", type: "number", placeholder: "e.g. 450000", step: "any" },
  ];

  return (
    <div style={{
      background: t.bg,
      minHeight: "100vh",
      fontFamily: "'Montserrat',sans-serif",
      color: t.text,
    }}>
      {/* Header */}
      <div style={{
        background: t.bgCard,
        borderBottom: `1px solid ${t.border}`,
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h1 style={{
          fontFamily: "'Cinzel',serif",
          fontWeight: 900,
          fontSize: "20px",
          margin: 0,
          color: t.text,
        }}>
          RAO Cattle Farm — Admin
        </h1>
        <button
          onClick={onLogout}
          style={{
            background: "transparent",
            border: `1px solid ${t.border}`,
            color: t.textM,
            padding: "8px 20px",
            borderRadius: "4px",
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>

        {/* ─── CREATE FORM ─── */}
        <h2 style={{
          fontFamily: "'Cinzel',serif",
          fontWeight: 700,
          fontSize: "22px",
          marginBottom: "32px",
          color: t.text,
        }}>
          Add New Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {fields.map((f) => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  step={f.step}
                  style={inputStyle}
                  required
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
              required
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ ...labelStyle, marginBottom: "12px" }}>Images — all 3 required (jpg/png/webp, max 15MB each)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  border: `1px dashed ${t.border}`, borderRadius: "6px", padding: "12px",
                  textAlign: "center", background: t.inputBg, position: "relative",
                  minHeight: "140px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  {previews[i] ? (
                    <>
                      <img src={previews[i]} alt={`Preview ${i + 1}`}
                        style={{ width: "100%", maxHeight: "100px", objectFit: "cover", borderRadius: "4px", marginBottom: "8px" }} />
                      <button type="button" onClick={() => removeImage(i)}
                        style={{
                          background: "#FF4444", border: "none", color: "#FFF", fontSize: "11px",
                          padding: "4px 12px", borderRadius: "3px", cursor: "pointer",
                          fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
                        }}>Remove</button>
                    </>
                  ) : (
                    <>
                      <div style={{ color: t.textM, fontSize: "12px", marginBottom: "8px" }}>Image {i + 1}</div>
                      <button type="button" onClick={() => fileRefs[i].current?.click()}
                        style={{
                          background: "transparent", border: `1px solid ${t.border}`, color: t.goldB,
                          padding: "6px 16px", borderRadius: "3px", fontSize: "11px",
                          fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer",
                          letterSpacing: "0.08em",
                        }}>Choose</button>
                    </>
                  )}
                  <input ref={fileRefs[i]} type="file" accept=".jpg,.jpeg,.png,.webp"
                    style={{ display: "none" }} onChange={(e) => handleImage(i, e.target.files[0])} />
                </div>
              ))}
            </div>
          </div>

          {message.text && (
            <div style={{
              padding: "12px 16px", borderRadius: "4px", marginBottom: "20px", fontSize: "13px", fontWeight: 600,
              background: message.type === "success" ? "rgba(0,200,100,0.12)" : "rgba(255,68,68,0.12)",
              color: message.type === "success" ? "#00C864" : "#FF4444",
              border: `1px solid ${message.type === "success" ? "rgba(0,200,100,0.3)" : "rgba(255,68,68,0.3)"}`,
            }}>{message.text}</div>
          )}

          <button type="submit" disabled={submitting} style={{
            width: "100%", padding: "14px", background: t.gGrad, border: "none", borderRadius: "4px",
            color: "#080808", fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "13px",
            letterSpacing: "0.2em", textTransform: "uppercase",
            cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1,
            transition: "all 0.3s ease",
          }}>{submitting ? "Submitting..." : "Add Product"}</button>
        </form>

        {/* ─── PRODUCTS LIST ─── */}
        <div style={{ marginTop: "64px", borderTop: `1px solid ${t.border}`, paddingTop: "40px" }}>
          <h2 style={{
            fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: "22px",
            marginBottom: "24px", color: t.text,
          }}>
            Existing Products
          </h2>

          {loadingProducts ? (
            <div style={{ color: t.textM, fontSize: "14px" }}>Loading products...</div>
          ) : products.length === 0 ? (
            <div style={{ color: t.textM, fontSize: "14px" }}>No products found.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {products.map((p) => (
                <div key={p.id} style={{
                  background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px",
                  padding: "16px 20px", display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: "16px",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: "16px", color: t.goldB }}>
                        {p.name}
                      </span>
                      <span style={{ fontSize: "12px", color: t.textM, letterSpacing: "0.1em" }}>
                        {p.breed}
                      </span>
                      {p.sold && (
                        <span style={{
                          fontSize: "9px", fontWeight: 800, letterSpacing: "0.15em", padding: "2px 8px",
                          borderRadius: "2px", background: "rgba(255,68,68,0.2)", color: "#FF4444",
                        }}>SOLD</span>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: t.textM, display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <span>Age: {p.age}</span>
                      <span>Weight: {p.weight}</span>
                      <span>Teeth: {p.teeth}</span>
                      <span>PKR {Number(p.price).toLocaleString()}</span>
                    </div>
                  </div>

                  {deleteId === p.id ? (
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <button onClick={() => handleDelete(p.id)} disabled={deleting}
                        style={{
                          background: "#FF4444", border: "none", color: "#FFF", padding: "8px 16px",
                          borderRadius: "4px", fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                          fontSize: "11px", letterSpacing: "0.1em", cursor: deleting ? "not-allowed" : "pointer",
                          opacity: deleting ? 0.7 : 1,
                        }}>{deleting ? "..." : "Confirm"}</button>
                      <button onClick={() => setDeleteId(null)} disabled={deleting}
                        style={{
                          background: "transparent", border: `1px solid ${t.border}`, color: t.textM,
                          padding: "8px 16px", borderRadius: "4px", fontFamily: "'Montserrat',sans-serif",
                          fontWeight: 600, fontSize: "11px", cursor: "pointer",
                        }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteId(p.id)}
                      style={{
                        background: "transparent", border: `1px solid rgba(255,68,68,0.3)`,
                        color: "#FF4444", padding: "8px 16px", borderRadius: "4px",
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "11px",
                        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                        transition: "all 0.3s ease", flexShrink: 0,
                      }}>Delete</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:600px){
          form > div:first-child { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}
