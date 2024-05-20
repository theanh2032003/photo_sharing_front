import React, { useState } from "react";
import Register from "./components/Register/Register";
import Login from "./components/login/Login";
import ListUser from "./components/ListUser";
import UserDetail from "./components/UserDetail";
import UserPhoto from "./components/UserPhoto";
import PhotoDetail from "./components/PhotoDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import PhotoUpload from "./components/PhotoUpload";
import { AppContext } from "./AppContex";
import NavBar from "./components/NavBar/NavBar";
const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <AppContext.Provider value={{ authToken, setAuthToken, selectedUser, setSelectedUser }}>
      
        <div>
          <Routes>
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ProtectedRoutes />} />
          </Routes>
        </div>
     
    </AppContext.Provider>
  );
};

const ProtectedRoutes = () => {
  const { authToken } = React.useContext(AppContext);

  return authToken ? (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListUser />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/users/:userId/photos" element={<UserPhoto />} />
        <Route path="/photos/:photoId" element={<PhotoDetail />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
