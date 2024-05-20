import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./UserPhoto.css";

const UserPhoto = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/photos`
        );
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching user photos:", error);
      }
    };

    fetchUserPhotos();
  }, [userId]);

  return (
    <div className="user-photos-container ">
      <h2>User Photos</h2>

      {photos.map((photo) => (
        <div className="photo" key={photo._id}>
          <img src={photo.file_name} />
          <Link to={`/photos/${photo._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default UserPhoto;
