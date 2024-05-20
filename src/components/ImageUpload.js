import React, { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("user_id", localStorage.getItem("userID"));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo uploaded:", res.data);
      setFile(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        onChange={onFileChange}
        required
        ref={inputRef}
        style={{ display: "none" }} // Hide the file input
      />
      <button type="button" onClick={handleClick}>
        Select File
      </button>
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default ImageUpload;
