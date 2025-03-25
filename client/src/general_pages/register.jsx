import { useState } from "react";
import { auth, db } from "../../firebase"; // Import Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role, // Store the selected role
      });

      toast.success(`User registered successfully as ${role}!`);
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      toast.warn(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className="login">
      <h2>Sign Up</h2>
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
        style={{ marginTop: "10px" }}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ marginTop: "10px" }}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginTop: "10px", width: "100%" }}
      >
        <option value="student">Student</option>
        <option value="counsellor">Counsellor</option>
      </select>
      <button onClick={handleSignUp} style={{ width: "90%" }}>
        Sign Up
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignUp;
