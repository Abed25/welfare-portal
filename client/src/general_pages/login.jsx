import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "../general_styles/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, role } = useAuth(); // Get role from AuthProvider
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;

      // Fetch role directly after login
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role : null;

      toast.success("Login successful!");

      // Navigate based on role
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "counsellor") {
        navigate("/counsellor-dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warn("Please enter your email first.");
      return;
    }
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to send reset email. Check your email.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Forgot password?{" "}
        <Link onClick={handleForgotPassword}>Reset password</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
