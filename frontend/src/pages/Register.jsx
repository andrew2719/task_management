import { useState } from "react";
import { SERVER_URL, EMAIL_REGEX, PASSWORD_REGEX } from "../Config";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ListTodo } from "lucide-react";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }
    
    if (!EMAIL_REGEX.test(formData.email)) {
      alert("Invalid Email Address");
      return;
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      alert(
        "Password must contain at least 8 characters, 1 number, 1 uppercase and 1 lowercase"
      );
      return;
    }
    const response = await fetch(`${SERVER_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="logo-container">
      </div>
      <div>
        <p>Welcome !</p>
        <p>Register to get started</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter your Name"
            name="name"
            onChange={handleChange}
            className="name"
          />
        </div>
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
            placeholder="Enter the password"
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
          <div></div>
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="signup-prompt">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
