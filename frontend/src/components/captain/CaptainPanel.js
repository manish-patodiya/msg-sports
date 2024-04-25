import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Players from "./Players";

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
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainPanel;
