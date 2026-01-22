import React, { useEffect, useState } from "react";
import "./../../styles/ApplyLeave.css";
import axios from "axios";

export default function ApplyLeave() {
  const storedUser = sessionStorage.getItem("userData");
  const user = storedUser ? JSON.parse(storedUser) : null;

   const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
  const [showForm, setShowForm] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [editId, setEditId] = useState(null);
  
  const [form, setForm] = useState({
    employeeId:user._id,
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
    totalDays: 0,
  });

  // Auto calculate total days
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e - s) / (1000 * 60 * 60 * 24) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    updatedForm.totalDays = calculateDays(
      name === "startDate" ? value : form.startDate,
      name === "endDate" ? value : form.endDate
    );

    setForm(updatedForm);
  };

  const fetchLeaves = async () => {
    const res = await axios.get(
      `${API_URL}/api/leave/employee/${user._id}`
    );
    setLeaves(res.data.leaves);
  };
  
  useEffect(() => {
    fetchLeaves();
  }, []);


  

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (editId) {
      // UPDATE
      await axios.put(
        `${API_URL}/api/leave/update/${editId}`,
        form
      );
      alert("Leave Updated");
    } else {
      // CREATE
      await axios.post(`${API_URL}/api/leave/apply`, {
        employeeId: user._id,
        ...form,
      });
      alert("Leave Applied");
    }
  
    setShowForm(false);
    setEditId(null);
    fetchLeaves();
  
    setForm({
      leaveType: "Casual",
      startDate: "",
      endDate: "",
      reason: "",
      totalDays: 0,
    });
  };
  

  const handleEdit = (leave) => {
    setShowForm(true);
    setEditId(leave._id);
  
    setForm({
      leaveType: leave.leaveType,
      startDate: leave.startDate.slice(0, 10),
      endDate: leave.endDate.slice(0, 10),
      reason: leave.reason || "",
      totalDays: leave.totalDays,
    });
  };
  
  const deleteLeave = async (id) => {
    if (!window.confirm("Are you sure?")) return;
  
    await axios.delete(`${API_URL}/api/leave/delete/${id}`);
    fetchLeaves();
  };
  

  return (
    <>
    <div className="leave-container">
      <h2>Leave Management</h2>

      <button className="apply-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Apply for Leave"}
      </button>

      {showForm && (
        <form className="leave-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Leave Type</label>
            <select name="leaveType" value={form.leaveType} onChange={handleChange}>
              <option value="Casual">Casual</option>
              <option value="Sick">Sick</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Total Days</label>
            <input type="number" value={form.totalDays} readOnly />
          </div>

          <div className="form-group">
            <label>Reason (Optional)</label>
            <textarea
              name="reason"
              value={form.reason}
              placeholder="Enter reason"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
          {editId ? "Update Leave" : "Submit Leave"}
          </button>
        </form>
      )}

<table className="leave-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Start</th>
      <th>End</th>
      <th>Days</th>
      <th>Status</th>
      <th>Reason</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {leaves.map((leave) => (
      <tr key={leave._id}>
        <td>{leave.leaveType}</td>
        <td>{leave.startDate.slice(0,10)}</td>
        <td>{leave.endDate.slice(0,10)}</td>
        <td>{leave.totalDays}</td>
        <td>{leave.status}</td>
        <td>{leave.reason || "-"}</td>
        <td>
          <button onClick={() => handleEdit(leave)}>Edit</button>
          <button onClick={() => deleteLeave(leave._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>

   


    </>
  );
}
