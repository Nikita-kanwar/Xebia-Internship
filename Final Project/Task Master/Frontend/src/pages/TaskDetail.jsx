import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";

export default function TaskDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
    fetchComments();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error("Failed to fetch task", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/tasks/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleAddOrUpdateComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      if (editingComment) {
        await api.put(`/tasks/${id}/comments/${editingComment}`, { text: newComment });
        setEditingComment(null);
      } else {
        await api.post(`/tasks/${id}/comments`, { text: newComment });
      }
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to save comment", err);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setNewComment(comment.text);
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/tasks/${id}/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const fileUrl = (filename) => `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/${filename}`;

  const isOwner = (taskObj) => {
    return user?.id === taskObj.user || user?.id === taskObj.user?._id;
  };

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : !task ? (
        <p className="text-center text-gray-500">Task not found.</p>
      ) : (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">{task.title}</h2>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-lg">Priority: {task.priority}</span>
            <span className="px-2 py-1 bg-green-100 text-purple-800 rounded-lg">Status: {task.status}</span>
            {task.deadline && <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg">Deadline: {new Date(task.deadline).toLocaleDateString()}</span>}
          </div>

          {task.attachments?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">📎 Attachments</h3>
              <ul className="space-y-2">
                {task.attachments.map((file, idx) => (
                  <li key={idx}>
                    <a href={fileUrl(file)} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(isOwner(task) || user?.role === "admin") && (
            <div className="flex gap-3 mb-6">
              <button onClick={() => navigate(`/dashboard/tasks/${id}/edit`)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Edit Task
              </button>
              <button onClick={handleDeleteTask} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete Task
              </button>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-4">💬 Comments</h3>
          <form onSubmit={handleAddOrUpdateComment} className="flex gap-2 mb-6">
            <input type="text" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              {editingComment ? "Update" : "Post"}
            </button>
          </form>

          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
              comments.map((c) => (
                <motion.div key={c._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-gray-800">{c.text}</p>
                    <p className="text-xs text-gray-500">
                      by {c.user?.name || "Unknown"} • {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {(user?.role === "admin" || user?.id === c.user?._id) && (
                    <div className="space-x-2">
                      <button onClick={() => handleEditComment(c)} className="text-blue-600 text-sm hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteComment(c._id)} className="text-purple-800 text-sm hover:underline">
                        Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
