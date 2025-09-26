import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";

export default function Signup() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <Layout>
      <PageWrapper>
        <div className="flex justify-center items-center px-4 min-h-screen">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Sign Up</h2>
            {error && <p className="text-purple-800 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105">
                Sign Up
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
}
