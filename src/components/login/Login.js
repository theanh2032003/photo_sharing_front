import React, { useState } from "react";
import style from "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
  });

  const { login_name, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log(res.data)
      const { token } = res.data;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userId);

      setAuthToken(token);
      console.log("User logged in", res.data);
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login_container">
      <h1>Đăng nhập</h1>
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
        <button type="submit">Login</button>
        <p onClick={() => navigate("/register")} className="navigate_login">
          Đăng kí
        </p>
      </form>
    </div>
  );
};

export default Login;
