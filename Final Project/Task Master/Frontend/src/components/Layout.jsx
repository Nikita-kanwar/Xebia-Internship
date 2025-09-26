import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileOpen(false);
  };

  const Avatar = ({ name }) => {
    const initials = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "U";
    return (
      <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
        {initials}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            TaskMaster
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <Link to="/" className="hover:text-purple-600">
                  Home
                </Link>
                <Link to="/login" className="hover:text-purple-600">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-purple-600">
                  Sign Up
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link to="/" className="block py-2">
                  Home
                </Link>
                <Link to="/dashboard" className="hover:text-purple-600">
                  Dashboard
                </Link>

                <div className="relative">
                  <button onClick={() => setProfileOpen((s) => !s)} className="flex items-center gap-2">
                    <Avatar name={user?.name} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg"
                      >
                        <div className="p-2">
                          <p className="text-sm text-gray-500 px-2">Signed in as</p>
                          <p className="text-sm font-semibold px-2 truncate">{user?.email}</p>

                          <div className="border-t my-2" />

                          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-purple-800 hover:bg-gray-100">
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </nav>

          <div className="md:hidden flex items-center gap-3">
            {isAuthenticated && <Avatar name={user?.name} />}
            <button className="text-gray-700" onClick={() => setMenuOpen((s) => !s)}>
              ☰
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden bg-gray-50 border-t px-4 py-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2">
                    Home
                  </Link>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="block py-2">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2">
                    Home
                  </Link>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block py-2">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left py-2 text-purple-800"
                  >
                     Logout
                  </button>
                  
                </>
                
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} TaskMaster Built with ❤️ By Nikita Kanwar
      </footer>
    </div>
  );
}
