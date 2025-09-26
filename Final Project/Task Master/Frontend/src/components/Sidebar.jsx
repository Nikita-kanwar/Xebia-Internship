import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "📋 Task List" },
    { path: "/dashboard/tasks/new", label: "➕ Create Task" },
    { path: "/dashboard/users", label: "Users - Only Admin View" },
  ];

  return (
    <div className="flex">
      <button
        onClick={() => setOpen(true)}
        className="p-2 m-2 bg-purple-600 text-white rounded-md md:hidden"
      >
        ☰
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="w-60 bg-white shadow-lg h-screen fixed top-0 left-0 z-50 flex flex-col"
            >
              <div className="p-4 font-bold text-purple-600 text-xl border-b flex justify-between items-center">
                Menu
                <button
                  onClick={() => setOpen(false)}
                  className="md:hidden text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)} 
                    className={`block px-3 py-2 rounded-lg ${
                      location.pathname === link.path
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex w-60 bg-white shadow-lg h-screen sticky top-0 flex-col">
        <div className="p-4 font-bold text-purple-600 text-xl border-b">
          Menu
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-lg ${
                location.pathname === link.path
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-50 text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
