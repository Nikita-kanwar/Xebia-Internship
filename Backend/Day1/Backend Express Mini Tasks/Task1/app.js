const express = require('express');
const app = express();

app.use(express.json()); 

let users = [
  { id: 1, name: 'Nikita' },
  { id: 2, name: 'Aman' }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
