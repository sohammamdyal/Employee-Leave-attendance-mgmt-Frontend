import { useState } from "react";
import { registerUser, loginUser } from "./../services/authService";

export default function AuthPage() {
  const [adminSignup, setAdminSignup] = useState(false);
  const [empSignup, setEmpSignup] = useState(false);

  const [admin, setAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleAdmin = async () => {
    if (adminSignup) {
      await registerUser({ ...admin, role: "admin" });
      alert("Admin Registered");
      setAdminSignup(false);
    } else {
      const res = await loginUser(admin);
      window.location.href="/dashboard";
      localStorage.setItem("token", res.data.token);
      alert("Admin Logged In");
    }
  };

  const handleEmployee = async () => {
    if (empSignup) {
      await registerUser({ ...employee, role: "employee" });
      alert("Employee Registered");
      setEmpSignup(false);
    } else {
      const res = await loginUser(employee);
      window.location.href="/profile";
      localStorage.setItem("token", res.data.token);
      alert("Employee Logged In");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] bg-white rounded-lg shadow-lg grid grid-cols-2">

        {/* ADMIN SECTION */}
        <div className="p-8 border-r">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Admin {adminSignup ? "Signup" : "Login"}
          </h2>

          {adminSignup && (
            <input
              className="input"
              placeholder="Full Name"
              onChange={(e) =>
                setAdmin({ ...admin, fullName: e.target.value })
              }
            />
          )}

          <input
            className="input"
            placeholder="Email"
            onChange={(e) =>
              setAdmin({ ...admin, email: e.target.value })
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setAdmin({ ...admin, password: e.target.value })
            }
          />

          <button className="btn" onClick={handleAdmin}>
            {adminSignup ? "Signup" : "Login"}
          </button>

          <p
            className="switch"
            onClick={() => setAdminSignup(!adminSignup)}
          >
            {adminSignup ? "Already have account?" : "Create new admin"}
          </p>
        </div>

        {/* EMPLOYEE SECTION */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Employee {empSignup ? "Signup" : "Login"}
          </h2>

          {empSignup && (
            <input
              className="input"
              placeholder="Full Name"
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  fullName: e.target.value,
                })
              }
            />
          )}

          <input
            className="input"
            placeholder="Email"
            onChange={(e) =>
              setEmployee({
                ...employee,
                email: e.target.value,
              })
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setEmployee({
                ...employee,
                password: e.target.value,
              })
            }
          />

          <button className="btn" onClick={handleEmployee}>
            {empSignup ? "Signup" : "Login"}
          </button>

          <p
            className="switch"
            onClick={() => setEmpSignup(!empSignup)}
          >
            {empSignup ? "Already have account?" : "Create new employee"}
          </p>
        </div>
      </div>
    </div>
  );
}
