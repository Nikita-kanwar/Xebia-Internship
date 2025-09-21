import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await API.post('/auth/signup', { ...form, role: 'user' });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.message || (error.response?.data?.errors?.[0]?.msg) || 'Signup failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Create account</h2>

        {err && <div className="text-sm text-red-600">{err}</div>}

        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange}
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />

        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />

        <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange}
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />

        <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60">
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <a className="text-indigo-600 hover:underline" href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
