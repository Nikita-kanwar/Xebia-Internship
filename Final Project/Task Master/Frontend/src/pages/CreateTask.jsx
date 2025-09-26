import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import FileUpload from "../components/FileUpload";
import { AuthContext } from "../context/authContext";

export default function CreateTask() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    deadline: "",
    assignedUser: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user?.role === "admin") {
          const res = await api.get("/users");
          setUsers(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          if (key === "assignedUser") formData.append("user", form[key]);
          else formData.append(key, form[key]);
        }
      });
      attachments.forEach((file) => formData.append("attachments", file));

      await api.post("/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Task creation error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to create task");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">Create New Task</h2>
      {error && <p className="text-purple-800 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
        <div className="flex gap-4">
          <select name="priority" value={form.priority} onChange={handleChange} className="px-4 py-2 border rounded-lg flex-1">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="px-4 py-2 border rounded-lg flex-1">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />

        {user?.role === "admin" && (
          <select name="assignedUser" value={form.assignedUser} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full">
            <option value="">-- Assign to user --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        )}

        <FileUpload onFilesChange={setAttachments} />

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105">
          Create Task
        </button>
      </form>
    </div>
  );
}
