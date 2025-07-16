
import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {
      users.map((user) => (
        <UserCard key={user.id} name={`Name : ${user.name}`} role={`Role : ${user.role} `}/>
      ))}
    </div>
  );
};

export default UserList;
