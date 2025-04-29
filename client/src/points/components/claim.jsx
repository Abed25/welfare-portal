import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const api = import.meta.env.VITE_API_BASE_URL;

const ClaimForm = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState("");

  const fetchClaims = async () => {
    const res = await axios.get(`${api}/points/my-claims/${user.studentId}`);
    setClaims(res.data);
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/points/claim`, {
        student_id: user.studentId,
        description,
        points_requested: parseInt(points),
      });
      setMessage("Claim submitted!");
      setDescription("");
      setPoints("");
      fetchClaims();
    } catch (err) {
      setMessage("Error submitting claim.");
    }
  };

  return (
    <div className="claim-container">
      <h2>Claim Welfare Points</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Points"
          required
        />
        <button type="submit">Submit Claim</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Claim History</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Points</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td>{claim.description}</td>
              <td>{claim.points_requested}</td>
              <td>{claim.status}</td>
              <td>{new Date(claim.submitted_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimForm;
