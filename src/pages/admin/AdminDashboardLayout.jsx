import React from "react";
  
import AdminDashboard from "./AdminDashboard";
import "./../../styles/AdDashboardLayout.css"
const AdminDashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <AdminSideBar />
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardLayout;