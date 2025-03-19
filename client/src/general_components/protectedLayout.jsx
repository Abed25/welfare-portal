import React from "react";
import SubHeader from "./SubHeader";
import SubFooter from "./SubFooter";

import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <SubHeader />
      <div className="protected-content">
        <Outlet />
      </div>
      <SubFooter />
    </div>
  );
};

export default ProtectedLayout;
