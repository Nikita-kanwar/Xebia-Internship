import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className='loading'>Loading users...</p>;

  return (
    <div  >
      <h2>All Users</h2>

      <div className='User-Card'>
      {users.map(user => (
        <div key={user.id} className='Card' >
          <h3>{user.id}</h3>
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
        </div>
      ))}
      </div>
    
    </div>
  );
}

export default UserList;
