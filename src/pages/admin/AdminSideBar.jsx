
import React, { useEffect, useState } from "react";
import "./../../styles/AdSidebar.css"
// import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate, FaBook } from "react-icons/fa";

export default function Sidebar({ setActive }){
  const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
    const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = sessionStorage.getItem("adminData");
  if (storedUser) {
    setUser(JSON.parse(storedUser)); 
  }
}, []);


const icons = {
  dashboard: <MdDashboard className="me-2" />,
  viewemployee: <MdDashboard className="me-2" />,
  adminleave: <MdDashboard className="me-2" />,
  adminattendance: <MdDashboard className="me-2" />,
  
  
};
  return (
    <div
  className="sidebar">
{/* <img src="/LMS.png" alt="Logo" className="logo mb-4" /> */}
{user && (
        <div className="profile-card">
          <img
            src={
              user.image
                ? `${API_URL}${user.image}`
                : "/4.png"
            }
            alt={user.fullName}
            className="profile-img"
          />
          <h5>{user.fullName}</h5>
        </div>
      )}

  <ul className="nav flex-column flex-grow-1 ">
    {["dashboard", "viewemployee", "adminleave", "adminattendance"].map((item, i) => (
      <li
        className="nav-item mb-3"
        key={item}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 + i * 0.2, duration: 0.4 }}
      >
        <button
          onClick={() => setActive(item)}
          className="btn btn-link nav-link"
        >
           {icons[item]}
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      </li>
    ))}
  </ul>

  <div
    className="nav-item"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.5 }}
  >
    <a href="/" className="nav-link text-danger fw-bold">
      Logout
    </a>
  </div>
</div>

  );
};


