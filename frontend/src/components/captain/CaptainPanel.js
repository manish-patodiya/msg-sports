import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./includes/Header";
import Dashboard from "./Dashboard";
import Sidebar from "./includes/Sidebar";
import Players from "./Players";
import Profile from "./Profile";
import ManagePassword from "./ManagePassword";

const CaptainPanel = () => {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!sessionStorage.getItem("auth")) {
  //       navigate("/admin");
  //     }
  //   });

  return (
    <div className="relative bg-gray-200 min-h-screen">
      <Sidebar />
      <div className="ms-[16rem] relative">
        <Header />
        <div className="p-6">
          <div></div>
          <div className="bg-white p-4 rounded-md">
            <Routes>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="players" element={<Players />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="manage-password" element={<ManagePassword />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainPanel;
