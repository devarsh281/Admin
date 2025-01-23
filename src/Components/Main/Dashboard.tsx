// import React from "react";
import { Side } from "./Side";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="overflow-x-hidden">
      <Side />

      <div className="pt-16 sm:ml-64 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
//  
