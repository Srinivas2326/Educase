import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import BASE_URL from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let temp = {};

    if (!form.name) temp.name = "Full name is required";
    if (!/^\d{10}$/.test(form.phone))
      temp.phone = "Valid phone number required";
    if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Valid email required";
    if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";
    if (!form.company) temp.company = "Company name is required";
    if (!form.agency) temp.agency = "Please select an option";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const isFormValid =
    form.name &&
    /^\d{10}$/.test(form.phone) &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.password.length >= 6 &&
    form.company &&
    form.agency;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Prevent multiple submits
    if (loading) return;

    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      // ⏱ Handle Render cold start
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Account created successfully!");
      navigate("/login");

    } catch (error) {
      if (error.name === "AbortError") {
        setServerError("Server is waking up, please try again");
      } else {
        setServerError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>
          Create your <br />
          PopX account
        </h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <small>{errors.name}</small>

          <input
            placeholder="Phone number *"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
          <small>{errors.phone}</small>

          <input
            placeholder="Email address *"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <small>{errors.email}</small>

          <input
            type="password"
            placeholder="Password *"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <small>{errors.password}</small>

          <input
            placeholder="Company name *"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />
          <small>{errors.company}</small>

          <p className="agency-title">Are you an Agency?*</p>

          <div className="agency-options">
            <label>
              <input
                type="radio"
                name="agency"
                value="Yes"
                checked={form.agency === "Yes"}
                onChange={(e) =>
                  setForm({ ...form, agency: e.target.value })
                }
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="agency"
                value="No"
                checked={form.agency === "No"}
                onChange={(e) =>
                  setForm({ ...form, agency: e.target.value })
                }
              />
              No
            </label>
          </div>

          <small>{errors.agency}</small>
          <small className="server-error">{serverError}</small>

          <button
            type="submit"
            className={`signup-btn ${isFormValid ? "active" : ""}`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
