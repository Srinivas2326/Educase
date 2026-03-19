import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import BASE_URL from "../utils/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid =
    /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Token stored:", data.token);

      window.location.href = "/profile";

    } catch (err) {
      console.error(err);
      setError("Server is slow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>
          Signin to your <br />
          PopX account
        </h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <small style={{ color: "red" }}>{error}</small>

          {loading && (
            <p style={{ fontSize: "12px", color: "#555" }}>
              Connecting to server...
            </p>
          )}

          <button
            type="submit"
            className={`btn primary ${isFormValid ? "active" : ""}`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}