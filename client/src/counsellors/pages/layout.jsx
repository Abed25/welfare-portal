import React from "react";
import Student from "./student/student";
import Counsellor from "./counsellor/counsellor";
import { useAuth } from "../../context/AuthProvider";

export default function Counselling_Layout() {
  const { role } = useAuth();
  return (
    <div>
      {role === "student" ? (
        <Student />
      ) : role === "counsellor" ? (
        <Counsellor />
      ) : (
        <p>Should be counselling module</p>
      )}
    </div>
  );
}
