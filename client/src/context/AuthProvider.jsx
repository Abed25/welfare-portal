import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            setRole(userDoc.exists() ? userDoc.data().role : null);
          } else {
            setRole(null);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => console.error("Auth Persistence Error:", error));
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}>Loading...</div>
      </div>
    );
  }

  const login = async (email, password) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  };

  const logout = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        toast.error("Logout failed. Try again!");
      });
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout, role }}>
        {children}
      </AuthContext.Provider>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export const useAuth = () => useContext(AuthContext);

// Inline styles for the loading screen
const styles = {
  loaderContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 255, 0.274)",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
  },
  loader: {
    padding: "15px 30px",
    background: "white",
    color: "black",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgb(0, 0, 255)",
  },
};
