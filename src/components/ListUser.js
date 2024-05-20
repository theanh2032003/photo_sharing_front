import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import './ListUser.css'
const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='list_user_container'>
      <h2>User List</h2>
      <ImageUpload/>
      
        {users.map(user => (
          <div className='user' key={user._id}>
            <span>{user.first_name} {user.last_name}</span>
            <Link className="button-link" to={`/users/${user._id}`}>Thông tin</Link>
            <Link className="button-link" to={`/users/${user._id}/photos`}>Ảnh</Link>
          </div>
        ))}
      
    </div>
  );
}

export default ListUser