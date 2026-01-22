import React, { useState } from "react";

import "./../../styles/AdDashboard.css";

import Dashboard from "./Dashboard";
import AdminSideBar from "./AdminSideBar"
import AdminEmployees from "./AdminEmployee";
import AdminLeaves from "./AdminLeaves";
import AdminAttendance from "./AdminAttendance";

export default function EmpDashboard() {
  const [activePage, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
        case "viewemployee":
            return <AdminEmployees />;
        case "adminleave":
          return <AdminLeaves />;
        case "adminattendance":
          return <AdminAttendance />;
        
      default:
        return <h2>Welcome!</h2>;
    }
  };

  return (
    <div className="emp-dashboard-layout">
      <AdminSideBar setActive={setActive} />
      <div className="emp-dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}
