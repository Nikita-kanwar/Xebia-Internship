import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
