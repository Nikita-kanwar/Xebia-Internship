import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Email and password are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // reqres.in REGISTER endpoint (fake API)
      // Works with: email = "eve.holt@reqres.in", password = "pistol"
      await axios.post("https://reqres.in/api/register", {
        email: form.email,
        password: form.password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      // Common case: reqres returns 400 for emails it doesn't know
      alert(
        "Registration failed on reqres.in (test API). Try:\nemail: eve.holt@reqres.in\npassword: pistol"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={onChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={onChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p style={{ textAlign: "center", marginTop: 10 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
