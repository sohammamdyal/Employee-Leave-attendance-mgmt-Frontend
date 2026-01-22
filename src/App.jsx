import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminAuth from "./pages/admin/AdminAuth";
import EmployeeAuth from "./pages/employee/EmployeeAuth";
import AdDashboard from "./pages/admin/Dashboard";
import EmpDashboard from "./pages/employee/EmpDashboard";
import ApplyLeave from "./pages/employee/AppyLeave";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminEmployees from "./pages/admin/AdminEmployee";
import AdminLeaves from "./pages/admin/AdminLeaves";
import AdminAttendance from "./pages/admin/AdminAttendance";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<EmployeeAuth />} />
      <Route path="/admin" element={<AdminAuth />} />
        <Route path="/empdashboard" element={<EmpDashboard />} />
        <Route path="/dashboard" element={<Dashboard/> } />
        <Route path="/applyleave" element={<ApplyLeave/>} />
        <Route path="/adminauth" element={<AdminAuth/>} />
        <Route path="/addmindashboard" element={<AdminRoute>
          <AdminDashboard />
          </AdminRoute>} />
        <Route path="/dashboard" element={<AdminRoute>
          <AdDashboard/>
        </AdminRoute>} />
        <Route path="/adminemployee" element={<AdminRoute>
          <AdminEmployees/>
        </AdminRoute> } />
        <Route path="/adminleaves" element={<AdminRoute>
          <AdminLeaves/>
        </AdminRoute> } />
        <Route path="/adminattendance" element={ <AdminRoute>
          <AdminAttendance />
        </AdminRoute> } />

      </Routes>
    </BrowserRouter>
  );
}
