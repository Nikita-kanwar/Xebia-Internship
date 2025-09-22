import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "📋 Task List" },
    { path: "/dashboard/tasks/new", label: "➕ Create Task" },
  ];

  return (
    <div className="flex">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="w-60 bg-white shadow-lg h-screen sticky top-0 hidden md:flex flex-col"
          >
            <div className="p-4 font-bold text-blue-600 text-xl border-b">Menu</div>
            <nav className="flex-1 p-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-lg ${
                    location.pathname === link.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {open ? "✖" : "☰"}
      </button>
    </div>
  );
}
