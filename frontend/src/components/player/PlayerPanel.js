import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./includes/Header";
import Dashboard from "./Dashboard";
import Sidebar from "./includes/Sidebar";
import Profile from "./Profile";
import ManagePassword from "./ManagePassword";
import Nominations from "./Nominations";
import TeamMembers from "./TeamMembers";
import { checkAuth } from "../../common/common";

import Requests from "./Requests";

const PlayerPanel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkAuth("player")) {
      navigate("/player")
    }
  })

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
              <Route path="nominations" element={<Nominations />}></Route>
              <Route path="team" element={<TeamMembers />}></Route>
              <Route path="requests" element={<Requests />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="manage-password" element={<ManagePassword />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPanel
