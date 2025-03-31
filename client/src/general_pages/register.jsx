import { useState } from "react";
import { auth, db } from "../../firebase"; // Import Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
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

      // Create user object
      const userData = {
        uid: user.uid,
        firstname,
        lastname,
        username,
        email,
        role,
      };

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), userData);

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
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        style={{ marginTop: "10px" }}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        style={{ marginTop: "10px" }}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginTop: "10px" }}
        required
      />
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
    </div>
  );
};

export default SignUp;
