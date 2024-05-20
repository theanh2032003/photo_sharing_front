import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setPhotos([res.data, ...photos]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/photos');
      setPhotos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {photos.map(photo => (
          <img key={photo._id} src={`http://localhost:5000/${photo.path}`} alt={photo.filename} />
        ))}
      </div>
    </div>
  );
}

export default PhotoUpload
