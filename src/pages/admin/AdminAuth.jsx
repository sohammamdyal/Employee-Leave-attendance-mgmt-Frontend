import { useState } from "react";
import { loginAdmin, registerAdmin } from "../../services/adminAuthService";
import "./../../styles/AdminAuth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function AdminAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "admin",
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
        await registerAdmin(formData);
        alert("Admin registered successfully");
        setIsSignup(false);
      } else {
        const res = await loginAdmin({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.token);
        sessionStorage.setItem("adminData", JSON.stringify(res.admin));
        alert("Admin logged in");
       
        navigate("/addmindashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>Admin {isSignup ? "Sign up" : "Sign in"}</h2>

      
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
              placeholder="Admin Name"
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
            placeholder="admin@email.com"
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
  <div className="role-badge">Admin</div>
</div>

        <button type="submit">
          {isSignup ? "Create account" : "Sign in"}
        </button>

        <p className="switch" onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Sign in"
            : "New admin? Create an account"}
        </p>

        <p className="user-link">
  Are you an user?{" "}
  <Link to="/">Login here</Link>
</p>
      </form>
    </div>
  );
}
