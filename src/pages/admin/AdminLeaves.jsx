import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/leaves");
    setLeaves(res.data.leaves);
     
  };

useEffect(() => {
    loadLeaves();
}, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/admin/leave/${id}`, { status })
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
