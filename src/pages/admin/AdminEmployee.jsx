import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminEmployees() {
  const API_URL ="https://employee-leave-attendance-mgmt-backend-7.onrender.com"
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin/employees`)
      .then((res) => setEmployees(res.data.employees))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h3>Employees</h3>
      <table>
        <thead  style={{ "background": "#030303" }}>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
