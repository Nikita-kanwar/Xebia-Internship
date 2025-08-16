import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return <h2>Profile: {user?.email} | Role: {user?.role}</h2>;
}
