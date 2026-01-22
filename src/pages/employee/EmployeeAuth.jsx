import { useState } from "react";
import { registerUser, loginUser } from "../../services/authService";
import "./../../styles/EmpAuth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function EmployeeAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "employee",
   
  });
const navigate = useNavigate();  

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("role", "employee");
        if (image) formData.append("image", image);
        await registerUser(formData);
        alert("Employee registered successfully");
        setIsSignup(false);
      } else {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.token);
        sessionStorage.setItem("userData", JSON.stringify(res.user));
        alert("Employee logged in");
       
        navigate("/empdashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submitHandler}>
        <h2 className="auth-title">
          Employee {isSignup ? "Sign Up" : "Sign In"}
        </h2>

        {/* IMAGE UPLOAD (Signup only) */}
        {isSignup && (
          <div className="form-group image-upload">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={imageHandler} />
            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>
        )}

        {isSignup && (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@email.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>

       <div className="form-group">
  <label>Role</label>
  <div className="role-badge">Employee</div>
</div>


        <button className="auth-btn" type="submit">
          {isSignup ? "Create Account" : "Sign In"}
        </button>

        <p
          className="switch-text"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "New employee? Create an account"}
        </p>

        <p className="admin-link">
  Are you an admin?{" "}
  <Link to="/admin">Login here</Link>
</p>
      </form>
    </div>
  );
}
