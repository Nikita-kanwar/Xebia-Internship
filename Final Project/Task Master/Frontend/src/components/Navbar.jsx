import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-indigo-600">TaskMaster</div>

        <div className="space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/signup" className="text-sm text-gray-700 hover:text-indigo-600">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm text-gray-700 hover:text-indigo-600">Dashboard</Link>
              <button onClick={handleLogout} className="ml-2 text-sm text-red-600 hover:underline">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
