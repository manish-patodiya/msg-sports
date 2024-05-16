import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./includes/Header";
import Dashboard from "./Dashboard";
import Sidebar from "./includes/Sidebar";
import PlayerNominations from "./PlayerNominations";
import Team from "./Team";
import Profile from "./Profile";
import ManagePassword from "./ManagePassword";
import { checkAuth } from "../../common/common";

const CaptainPanel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkAuth("captain")) {
      navigate("/captain");
    }
  });

  return (
    <div className="relative bg-gray-200 min-h-screen">
      <Sidebar />
      <div className="ms-[16rem] relative">
        <Header />
        <div className="p-6">
          <div></div>
          <div className="bg-white p-4 rounded-md overflow-hidden">
            <Routes>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="player-nominations" element={<PlayerNominations />}></Route>
              <Route path="team" element={<Team />}></Route>
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
