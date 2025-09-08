import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import UserCard from './Components/UserCard';
import UserModal from './Components/UserModel';

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?page=${page}&results=6`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data.results)) {
          setUsers((prev) => [...prev, ...data.results]);
        } else {
          console.error('API response malformed:', data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error.message);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>User Directory</Typography>
      <Grid container spacing={2}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <UserCard user={user} onClick={() => handleOpen(user)} />
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" onClick={handleLoadMore} sx={{ mt: 4 }}>
        Load More
      </Button>

      {selectedUser && (
        <UserModal open={open} onClose={handleClose} user={selectedUser} />
      )}
    </Container>
  );
};

export default App;
