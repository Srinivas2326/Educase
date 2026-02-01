import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-content">
          <h2>Welcome to PopX</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <button
            className="welcome-btn primary"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>

          <button
            className="welcome-btn secondary"
            onClick={() => navigate("/login")}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}
