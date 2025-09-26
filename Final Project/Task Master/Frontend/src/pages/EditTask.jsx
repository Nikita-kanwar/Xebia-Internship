import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/authContext";
import FileUpload from "../components/FileUpload";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchTask();
    if (user?.role === "admin") fetchUsers();
  }, [id, user]);

  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      const { title, description, priority, status, deadline, user: taskUser } = res.data;
      setForm({
        title,
        description,
        priority,
        status,
        deadline: deadline ? deadline.split("T")[0] : "",
        assignedUser: taskUser?._id || taskUser || "",
      });
    } catch (err) {
      setError("Failed to load task");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (attachments && attachments.length > 0) {
        const formData = new FormData();
        Object.keys(form).forEach((k) => {
          if (k === "assignedUser" && form[k]) formData.append("user", form[k]);
          else if (form[k]) formData.append(k, form[k]);
        });
        attachments.forEach((file) => formData.append("attachments", file));
        await api.put(`/tasks/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        const payload = {
          title: form.title,
          description: form.description,
          priority: form.priority,
          status: form.status,
          deadline: form.deadline || null,
        };
        if (user?.role === "admin" && form.assignedUser) payload.user = form.assignedUser;
        await api.put(`/tasks/${id}`, payload);
      }

      navigate(`/dashboard/tasks/${id}`);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update task");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">Edit Task</h2>
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
          Update Task
        </button>
      </form>
    </div>
  );
}
