import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import DashboardHome from "./DashboardHome";
import "./../../styles/EmpDashboard.css";
import ApplyLeave from "./AppyLeave";
import MarkAttendance from "./MarkAttendance";

export default function EmpDashboard() {
  const [activePage, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
        case "applyleave":
            return <ApplyLeave />;
        case "markattendance":
            return <MarkAttendance />;
      default:
        return <h2>Welcome!</h2>;
    }
  };

  return (
    <div className="emp-dashboard-layout">
      <Sidebar setActive={setActive} />
      <div className="emp-dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}
