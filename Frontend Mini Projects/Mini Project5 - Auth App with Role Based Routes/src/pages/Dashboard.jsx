import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome {user.role === "admin" ? "Admin" : "User"}: {user.username}</p>
    </div>
  );
};

export default Dashboard;
