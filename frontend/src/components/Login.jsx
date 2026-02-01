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

    // 🔒 Prevent multiple submissions
    if (loading) return;

    setError("");

    if (!isFormValid) return;

    setLoading(true);

    try {
      // ⏱ Handle Render cold start
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // ✅ Store token & user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile");

    } catch (err) {
      if (err.name === "AbortError") {
        setError("Server is waking up, please try again");
      } else {
        setError("Login failed. Please try again.");
      }
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

          <small>{error}</small>

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
