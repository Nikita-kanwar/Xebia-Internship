import { useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import FilterBar from "./Components/FilterBar";
import { Container, Typography } from "@mui/material";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Add Task Function
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };
// Delete Task Function
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
// Toggle
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
// Filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Simple Task Manager
      </Typography>
      <TaskForm onAdd={addTask} />
      <FilterBar current={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </Container>
  );
}

export default App;
