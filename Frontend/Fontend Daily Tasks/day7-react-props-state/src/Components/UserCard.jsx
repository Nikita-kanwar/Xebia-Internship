import React from 'react'

const UserCard = (props) => {
  return (
    <div className='User-card'>
      
      <div className="card">Name : {props.name}</div>
      <div className="card">E-mail :{props.email}</div>
      <div className="card">Role :{props.role}</div>
    </div>
  )
}

export default UserCard
