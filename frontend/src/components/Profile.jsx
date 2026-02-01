import "../styles/profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

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
            <h4>{user?.name || "john"}</h4>
            <p>{user?.email || "john@gmail.com"}</p>
          </div>
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
