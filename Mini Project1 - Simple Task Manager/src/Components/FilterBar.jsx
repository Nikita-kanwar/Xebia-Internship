import { Stack, Button } from "@mui/material";

function FilterBar({ current, setFilter }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <Button
        variant={current === "all" ? "contained" : "outlined"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={current === "completed" ? "contained" : "outlined"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
      <Button
        variant={current === "incomplete" ? "contained" : "outlined"}
        onClick={() => setFilter("incomplete")}
      >
        Incomplete
      </Button>
    </Stack>
  );
}

export default FilterBar;
