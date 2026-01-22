import { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/AdminAttendance.css";
export default function AdminAttendance() {

    const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");

  // Load employees
  useEffect(() => {
    axios.get(`${API_URL}/api/admin/employees`)
      .then(res => setEmployees(res.data.employees));
  }, []);

  // Load attendance
  const loadAttendance = () => {
    axios.get(`${API_URL}/api/admin/attendance`, {
      params: {
        employeeId,
        date,
      },
    }).then(res => setAttendance(res.data.attendance));
  };

  useEffect(loadAttendance, []);

  return (
    <div>
      <h2>Attendance Records</h2>

      {/* FILTERS */}
      <div className="filter-bar">
  <select
    className="filter-select"
    value={employeeId}
    onChange={e => setEmployeeId(e.target.value)}
  >
    <option value="">All Employees</option>
    {employees.map(emp => (
      <option key={emp._id} value={emp._id}>
        {emp.fullName}
      </option>
    ))}
  </select>

  <input
    className="filter-date"
    type="date"
    value={date}
    onChange={e => setDate(e.target.value)}
  />

  <button className="filter-btn" onClick={loadAttendance}>
    Filter
  </button>
</div>


      {/* TABLE */}
      <table border="1" cellPadding="8" width="100%">
        <thead  style={{ "background": "#030303" }}>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(a => (
            <tr key={a._id}>
              <td>{a.employee.fullName}</td>
              <td>{a.employee.email}</td>
              <td>{a.date.slice(0, 10)}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
