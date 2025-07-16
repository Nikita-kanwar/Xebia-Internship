import React from "react";

const UserCard = ({ name, role }) => {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
};

export default UserCard;
