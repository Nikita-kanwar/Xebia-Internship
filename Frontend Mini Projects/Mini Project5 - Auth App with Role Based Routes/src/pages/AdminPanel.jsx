import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  return <h2>Welcome Admin {user?.email}</h2>;
}
