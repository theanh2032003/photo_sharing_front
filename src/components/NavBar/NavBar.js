import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContex";
import axios from "axios";
import { useParams } from "react-router-dom";
import './NavBar.css'

const NavBar = () => {
  const { user, selectedUser } = useContext(AppContext);
  const location = useLocation();
  const [sysUser, setSysUser] = useState(null);
  const sysUserId = localStorage.getItem("userID");
  const [contextText, setContextText] = useState("");
  // const {userId} = useParams();
  // console.log(userId)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${sysUserId}`
        );
        setSysUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log(location.pathname)
    const fetchContextText = async () => {
      
        // console.log(userId)
        try {
          // const response = await axios.get(
          //   `http://localhost:5000/api/users/${params.split('/')[1]}`
          // );
          // const user = response.data;

          if (
            location.pathname.includes("/users") &&
            !location.pathname.includes("/photos")
          ) {
            let id = location.pathname.split('/')[2];
            console.log(id)
            const response = await axios.get(
              `http://localhost:5000/api/users/${id}`
            );
            const user = response.data;
            setContextText(`Details of ${user.first_name} ${user.last_name}`);
          } else if (
            location.pathname.includes("/users") &&
            location.pathname.includes("/photos")
          ) {
            let id = location.pathname.split('/')[2];
            console.log(id)
            const response = await axios.get(
              `http://localhost:5000/api/users/${id}`
            );
            const user = response.data;
            setContextText(`Photos of ${user.first_name} ${user.last_name}`);
          } else {
            setContextText("");
          }
        } catch (error) {
          console.error("Error fetching user context info:", error);
        }
      
    };

    fetchContextText();
  }, [location.pathname]);
  return (
    <div className="topbar">
      <div className="topbar-left">
        {sysUser && (
          <p>
            {sysUser.first_name} {sysUser.last_name}
          </p>
        )}
      </div>
      <div className="topbar-right">{contextText}</div>
    </div>
  );
};

export default NavBar;
