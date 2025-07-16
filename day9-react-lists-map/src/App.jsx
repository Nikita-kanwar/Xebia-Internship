import React from "react";
import UserList from "./Components/UserList";

const users = [
  { id: 1, 
    name: "Nikita", 
    role: "Frontend Intern" },
  { id: 2, 
    name: "Rohan", 
    role: "Full Stack Intern" },
  { id: 3, 
    name: "Siddhi", 
    role: "UI Designer" },
];

const App = () => {
  return (
    <div className="app">
      <h1>User List</h1>
      <UserList users={users} />
    </div>
  );
};

export default App;
