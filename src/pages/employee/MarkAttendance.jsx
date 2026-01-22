import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/Attendance.css";

export default function MarkAttendance() {
  const user = JSON.parse(sessionStorage.getItem("userData"));
 const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
  const today = new Date().toISOString().slice(0, 10);

  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    const res = await axios.get(
      `${API_URL}/api/attendance/employee/${user._id}`
    );
    setRecords(res.data.records);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance = async () => {
    try {
      await axios.post(`${API_URL}/api/attendance/mark`, {
        employeeId: user._id,
        status,
        date: today,
      });

      alert("Attendance Marked Successfully");
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Management</h2>
      <p>
  Name: <b>{records[0]?.employee.fullName}</b> |
  Role: <b>{records[0]?.employee.role}</b>
</p>


      {/* MARK ATTENDANCE */}
      <div className="attendance-card">
        <h3>Mark Today's Attendance</h3>

        <p>Date: <b>{today}</b></p>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button onClick={markAttendance}>Submit Attendance</button>
      </div>

      {/*HISTORY TABLE*/}
      <h3 className="mt-4">Attendance History</h3>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Date</th>
            <th>Status</th>
          
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="3">No Records Found</td>
            </tr>
          ) : (
            records.map((rec) => (
              <tr key={rec._id}>
                <td>{rec.employee.fullName}</td>
                <td>{rec.employee.role}</td>
                <td>{rec.date.slice(0, 10)}</td>
                <td className={rec.status === "Present" ? "present" : "absent"}>
                  {rec.status}
                </td>
                <td>{rec.createdAt.slice(0, 10)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
