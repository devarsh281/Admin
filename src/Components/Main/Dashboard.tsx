import React from "react";
import { Side } from "./Side";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <Side />

      <div className="ml-64 w-full p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
