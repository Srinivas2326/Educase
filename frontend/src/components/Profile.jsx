import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">Account Settings</h2>

        <div className="profile-header">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="profile-avatar"
          />

          <div className="profile-info">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "auto",
              padding: "6px 12px",
              background: "#6c3df4",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              height: "fit-content"
            }}
          >
            Logout
          </button>
        </div>

        <p className="profile-desc">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
          Erat, Sed Diam
        </p>

        <div className="profile-divider"></div>
        <div className="profile-space"></div>
        <div className="profile-divider"></div>
      </div>
    </div>
  );
}
