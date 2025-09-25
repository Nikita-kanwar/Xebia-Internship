import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    deadline: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      const { title, description, priority, status, deadline } = res.data;
      setForm({
        title,
        description,
        priority,
        status,
        deadline: deadline ? deadline.split("T")[0] : "",
      });
    } catch (err) {
      setError("Failed to load task");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, form);
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
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-4">
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg flex-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg flex-1"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg w-full"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
