import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <Card
          key={task.id}
          sx={{ backgroundColor: task.completed ? "#e0ffe0" : "#fff" }}
        >
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Chip
              label={task.completed ? "Completed" : "Incomplete"}
              color={task.completed ? "success" : "warning"}
              sx={{ mt: 1 }}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onToggle(task.id)}
              >
                Mark as {task.completed ? "Incomplete" : "Done"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default TaskList;
