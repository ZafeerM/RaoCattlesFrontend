import { useState } from "react";
import { T, API_BASE } from "./constants";

export default function AdminLogin({ onLogin }) {
  const t = T.dark;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Login failed");
      }
      const data = await res.json();
      if (data.token) {
        sessionStorage.setItem("adminToken", data.token);
        onLogin(data.token);
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
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
    fontSize: "12px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: t.goldB,
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div style={{
      background: t.bg,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Montserrat',sans-serif",
    }}>
      <div style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: "8px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: t.shadow,
      }}>
        <h1 style={{
          fontFamily: "'Cinzel',serif",
          fontWeight: 900,
          fontSize: "24px",
          textAlign: "center",
          color: t.text,
          marginBottom: "8px",
        }}>
          Admin Panel
        </h1>
        <div style={{
          textAlign: "center",
          marginBottom: "32px",
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: t.textM,
        }}>
          RAO Cattle Farm
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={inputStyle}
              required
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={inputStyle}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={{
              color: "#FF4444",
              fontSize: "13px",
              marginBottom: "16px",
              textAlign: "center",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: t.gGrad,
              border: "none",
              borderRadius: "4px",
              color: "#080808",
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
