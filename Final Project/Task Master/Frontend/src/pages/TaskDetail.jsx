import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function TaskDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.post(`/tasks/${id}/comments`, { text: newComment });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
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

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : !task ? (
        <p className="text-center text-gray-500">Task not found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          {/* Task Info */}
          <h2 className="text-2xl font-bold text-blue-600 mb-2">{task.title}</h2>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg">
              Priority: {task.priority}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg">
              Status: {task.status}
            </span>
            {task.deadline && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Comments */}
          <h3 className="text-xl font-semibold mb-4">💬 Comments</h3>
          <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Post
            </button>
          </form>

          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
              comments.map((c) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800">{c.text}</p>
                    <p className="text-xs text-gray-500">
                      by {c.user?.name || "Unknown"} •{" "}
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {(user?.role === "admin" || user?.id === c.user?._id) && (
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
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
