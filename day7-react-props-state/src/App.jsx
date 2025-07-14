import React from "react";
import "./App.css";
import Counter from "./Components/Counter";
import Toggle from "./Components/Toggle";
import UserCard from "./Components/UserCard";

const App = () => {
  return (
    <div className="main-page">
      <Counter />
      <Toggle />
      <UserCard name="Aman" email="aman@gmail.com" role="Full Stack Intern" />
      <UserCard name="Simran" email="simran@gmail.com" role="Frontend Intern" />
    </div>
  );
};

export default App;
