import React from "react";
import Sidebar from "./../../components/SideBar";  
import Dashboard from "./../employee/EmpDashboard";
import "./../../styles/DashboardLayout.css"
const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default DashboardLayout;