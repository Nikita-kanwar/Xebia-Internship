import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/tasks", { params: { page: 1, limit: 1000 } });
      const tasks = res.data.tasks || [];
      const total = tasks.length;
      const todo = tasks.filter((t) => t.status === "todo").length;
      const inProgress = tasks.filter((t) => t.status === "in-progress").length;
      const done = tasks.filter((t) => t.status === "done").length;
      setStats({ total, todo, inProgress, done });
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const Landing = (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="max-w-4xl mx-auto text-center py-16">
        <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          Organize. Track. Achieve with TaskMaster.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="text-lg text-gray-600 mb-8">
          A clean, fast, and collaborative task manager tailored to help you get things done.
        </motion.p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:scale-105 transition">
            Get Started
          </Link>
          <Link to="/login" className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );

  const UserDashboard = (
    <div className="px-4">
      <div className="max-w-4xl mx-auto py-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.name || "User"} 👋</h2>
              <p className="text-sm text-gray-500">Here's a quick summary of your tasks.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate("/dashboard/tasks/new")} className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:scale-105 transition">
                New Task
              </button>
              <button onClick={() => navigate("/dashboard")} className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg">
                View Tasks
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl shadow flex flex-col items-start">
            <p className="text-sm text-gray-500">Total</p>
            <h3 className="text-2xl font-bold">{stats.total}</h3>
          </div>
          <div className="p-4 bg-white rounded-xl shadow flex flex-col items-start">
            <p className="text-sm text-gray-500">To Do</p>
            <h3 className="text-2xl font-bold">{stats.todo}</h3>
          </div>
          <div className="p-4 bg-white rounded-xl shadow flex flex-col items-start">
            <p className="text-sm text-gray-500">In Progress</p>
            <h3 className="text-2xl font-bold">{stats.inProgress}</h3>
          </div>
          <div className="p-4 bg-white rounded-xl shadow flex flex-col items-start">
            <p className="text-sm text-gray-500">Done</p>
            <h3 className="text-2xl font-bold">{stats.done}</h3>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <Layout>
      <PageWrapper>{isAuthenticated ? UserDashboard : Landing}</PageWrapper>
    </Layout>
  );
}
