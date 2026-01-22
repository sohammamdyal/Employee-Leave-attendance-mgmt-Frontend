import axios from "axios";
import { useEffect, useState } from "react";
import "./../../styles/AdminDashboard.css";

export default function AdminDashboardHome() {
   const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
  const [data, setData] = useState(null);

  const loadDashboard = async () => {
    const res = await axios.get(`${API_URL}/api/admin/dashboard`);
    setData(res.data.data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const updateLeaveStatus = async (id, status) => {
    await axios.put(`${API_URL}/api/admin/leave/${id}`, { status });
    loadDashboard();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
<h2>Welcome, Admin01</h2>
    
      <div className="summary">
        <div className="card">Employees <span>{data.totalEmployees}</span></div>
        <div className="card green">Present Today <span>{data.present}</span></div>
        <div className="card red">Absent Today <span>{data.absent}</span></div>
        <div className="card yellow">Pending Leaves <span>{data.pendingLeaves}</span></div>
      </div>

      <h3>Leave Requests</h3>
      <table>
        <thead style={{ "background": "#030303" }}>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.leaves.map(l => (
            <tr key={l._id}>
              <td>{l.employee.fullName}</td>
              <td>{l.leaveType}</td>
              <td>{l.startDate.slice(0,10)} → {l.endDate.slice(0,10)}</td>
              <td>{l.status}</td>
              <td>
                {l.status === "Pending" && (
                  <>
                    <button onClick={() => updateLeaveStatus(l._id, "Approved")} className="approve">
                      Approve
                    </button>
                    <button onClick={() => updateLeaveStatus(l._id, "Rejected")} className="reject">
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* ATTENDANCE */}
      <h3>Today Attendance</h3>
      <table>
        <thead  style={{ "background": "#030303" }}>
          <tr>
            <th>Employee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.attendance.map(a => (
            <tr key={a._id}>
              <td>{a.employee.fullName}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
