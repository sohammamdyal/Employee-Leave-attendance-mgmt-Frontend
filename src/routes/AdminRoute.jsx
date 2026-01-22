import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const admin = JSON.parse(sessionStorage.getItem("adminData"));

  return admin?.role === "admin"
    ? children
    : <Navigate to="/adminauth" />;
}
