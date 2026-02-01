import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid =
    /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== email || user.password !== password) {
      setError("Invalid email or password");
    } else {
      setError("");
      navigate("/profile");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Signin to your<br />PopX account</h2>

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
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
