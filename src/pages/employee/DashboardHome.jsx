import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/DashboardHome.css";

export default function DashboardHome() {
  const user = JSON.parse(sessionStorage.getItem("userData"));
   const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/dashboard/employee/${user._id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.fullName}</h2>

      {/*LEAVE SUMMARY*/}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Leaves</h4>
          <p>{data.totalLeaves}</p>
        </div>

        <div className="card">
          <h4>Used Leaves</h4>
          <p>{data.usedLeaves}</p>
        </div>

        <div className="card">
          <h4>Remaining Leaves</h4>
          <p>{data.remainingLeaves}</p>
        </div>
      </div>

      {/* LEAVE HISTORY*/}
      <h3>Leave History</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Dates</th>
            <th>Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.leaveHistory.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.leaveType}</td>
              <td>
                {leave.startDate.slice(0, 10)} →{" "}
                {leave.endDate.slice(0, 10)}
              </td>
              <td>{leave.totalDays}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  ATTENDANCE */}
      <h3>Attendance Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.attendanceRecords.map((att) => (
            <tr key={att._id}>
              <td>{att.date.slice(0, 10)}</td>
              <td>{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
