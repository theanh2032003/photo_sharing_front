import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './UserDetail.css'
const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info-container">
      <h2>User Info</h2>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Location: {user.location}</p>
      <p>Description: {user.description}</p>
      <p>Occupation: {user.occupation}</p>
      {/* Add more user info fields as needed */}
    </div>
  );
};

export default UserDetail;
