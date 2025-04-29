import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Simulate() {
  const [pointDS, setPointsDS] = useState({ points: 0, streak: 0 });
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;
    const minutes = 0.5;

    if (lastCheckIn) {
      const diff = Date.now() - lastCheckIn.getTime();
      if (diff < minutes * 60 * 1000) {
        setCanCheckIn(false);
        const remainingTime = minutes * 60 * 1000 - diff;

        timer = setTimeout(() => {
          setCanCheckIn(true);
          setMessage("");
        }, remainingTime);

        const minutesLeft = Math.ceil(remainingTime / 60000);
        setMessage(`Please wait ${minutesLeft} more minute(s)`);
      } else {
        setCanCheckIn(true);
        setMessage("");
      }
    }

    return () => clearTimeout(timer);
  }, [lastCheckIn]);

  const handleCheckIn = () => {
    if (!canCheckIn) {
      toast.success("You already checked in");
      return;
    }

    const now = new Date();
    setLastCheckIn(now);
    setCanCheckIn(false);
    setPointsDS((prev) => ({
      streak: prev.streak + 1,
      points: prev.points + 10,
    }));
    setMessage("Check-in successful! Come back in 10 minutes.");
    toast.success("New streak added");
  };

  const buttonStyle = {
    padding: "0",
    fontSize: "18px",
    height: "100px",
    width: "100px",
    borderRadius: "50px",
    border: "none",
    cursor: canCheckIn ? "pointer" : "not-allowed",
    backgroundColor: canCheckIn ? "#ADD8E6" : "#d6ecf7", // lighter when disabled
    color: "#004080",
    transition: "all 0.3s ease",
    boxShadow: canCheckIn ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    gap: "1rem",
  };
  const paragraphStyle = {
    position: "absolute",
    top: "160px",
    color: "blue",
    fontWeight: "800px",
    fontSize: "20px",
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleCheckIn}
        disabled={!canCheckIn}
      >
        {canCheckIn ? "Check in" : "Checked"}
      </button>
      <p style={{ right: "120px", ...paragraphStyle }}>
        Streak: <strong>{pointDS.streak}</strong>
      </p>
      <p style={{ right: "10px", ...paragraphStyle }}>
        Points: <strong>{pointDS.points}</strong>
      </p>
      <p style={{ color: "blue" }}>{message}</p>
    </div>
  );
}
