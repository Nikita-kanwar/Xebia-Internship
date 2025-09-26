import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";

export default function TaskList() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [search, status, priority, page]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { search, status, priority, page, limit: 5 },
      });
      setTasks(res.data.tasks || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const isOwner = (task) => {
    return user?.id === task.user || user?.id === task.user?._id;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Tasks</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input type="text" placeholder="🔎 Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 border rounded-lg w-full sm:w-1/3" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <motion.div key={task._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
            <Link to={`/dashboard/tasks/${task._id}`}>
              <h3 className="font-bold text-lg text-purple-600 flex items-center gap-2">
                {task.title}
                {task.attachments?.length > 0 && <span title="Has attachments">📎</span>}
              </h3>
              <p className="text-sm text-gray-600">{task.description || "No description"}</p>
            </Link>

            <div className="flex justify-between items-center mt-3 text-sm">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-purple-200 text-gray-800 rounded-lg">{task.priority}</span>
                <span className="px-2 py-1 bg-green-200 text-gray-800 rounded-lg">{task.status}</span>
              </div>

              {(isOwner(task) || user?.role === "admin") && (
                <div className="flex gap-3">
                  <Link to={`/dashboard/tasks/${task._id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(task._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border rounded disabled:opacity-50">
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
