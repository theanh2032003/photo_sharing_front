import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const navigate = useNavigate();

  const {
    login_name,
    password,
    first_name,
    last_name,
    location,
    description,
    occupation,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      const { token } = res.data;
      localStorage.setItem("token", token);
      console.log("User registered", res.data);
      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register_container">
      <h1>Đăng Kí</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="login_name"
          value={login_name}
          onChange={onChange}
          placeholder="Login Name"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={onChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={onChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={onChange}
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="occupation"
          value={occupation}
          onChange={onChange}
          placeholder="Occupation"
          required
        />
        <button type="submit">Register</button>
        <p onClick={() => navigate("/login")} className="navigate_login">
          Đăng nhập
        </p>
      </form>
    </div>
  );
};

export default Register;
