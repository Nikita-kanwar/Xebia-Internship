import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/profile');
        setUser(res.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);

        // If API returned 401 (unauthorized), logout
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          // Generic error
          setErr('Failed to fetch profile. Please try again later.');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  if (err) return <div className="p-8 text-red-600">{err}</div>;
  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-indigo-600">Welcome, {user.name}</h1>
        <p className="mt-2 text-sm text-gray-600">Email: {user.email}</p>
        <p className="mt-1 text-sm text-gray-600">Role: {user.role}</p>

        <div className="mt-6">
          <h2 className="text-lg font-medium">Quick actions</h2>
          <div className="mt-3 space-x-2">
            <a href="/tasks/create" className="px-3 py-2 bg-indigo-600 text-white rounded">Create Task</a>
            {user.role === 'admin' && (
              <a href="/admin" className="px-3 py-2 bg-gray-700 text-white rounded">Admin Dashboard</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
