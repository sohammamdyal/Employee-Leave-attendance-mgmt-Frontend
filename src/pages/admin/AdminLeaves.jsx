import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"

  const loadLeaves = async () => {
    const token = localStorage.getItem("token");
  
    const res = await axios.get(
      `${API_URL}/api/admin/leaves`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    setLeaves(res.data.leaves);
  };
  

useEffect(() => {
    loadLeaves();
}, []);

  const updateStatus = (id, status) => {
    axios.put(`${API_URL}/api/admin/leave/${id}`, { status })
      .then(loadLeaves);
  };

  return (
    <>
      <h3>Leave Requests</h3>
      <table>
        <thead  style={{ "background": "#030303" }}>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l._id}>
              <td>{l.employee.fullName}</td>
              <td>{l.leaveType}</td>
              <td>{l.startDate.slice(0,10)} → {l.endDate.slice(0,10)}</td>
              <td>{l.status}</td>
              <td>
                <button onClick={() => updateStatus(l._id, "Approved")}>Approve</button>
                <button onClick={() => updateStatus(l._id, "Rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
