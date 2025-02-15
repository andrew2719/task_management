import { useState, useEffect } from "react";
import { SERVER_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ListTodo } from "lucide-react";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (confirm("You are already logged in. Do you want to logout?")) {
        localStorage.removeItem("token");
      } else
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="logo-container">
        {/* <div className="logo">
          <div className="logo-icon">
            <ListTodo color="white" />
          </div>
        </div> */}
        {/* <span style= {{color: "#2563eb"}}>TaskMaster </span> */}
      </div>

      <div>
        <p>Welcome back!</p>
        <p>Login to continue</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="email"
          />
        </div>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            className="password"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-prompt">
        <p>
          Don&apos;t have an account? <a href="/register">SignUp</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
