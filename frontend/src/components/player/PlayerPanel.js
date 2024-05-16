import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./includes/Header";
import Dashboard from "./Dashboard";
import Sidebar from "./includes/Sidebar";
import Profile from "./Profile";
import ManagePassword from "./ManagePassword";
import Nominations from "./Nominations";
import TeamMembers from "./TeamMembers";
import { checkAuth, getLoginInfo } from "../../common/common";

const PlayerPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [render, setRender] = useState(true);
  const updateComponent = () => setRender(!render);
  useEffect(() => {
    if (!checkAuth("player")) {
      navigate("/player")
    }

    if (location.pathname != "/player/profile" && !getLoginInfo("player", "is_completed")) {
      navigate("profile")
    }
  })

  return (
    <div className="relative bg-gray-200 min-h-screen">
      <Sidebar />
      <div className="ms-[16rem] relative">
        <Header />
        <div className="p-6">
          <div className={`bg-rose-800 text-white p-2 ${getLoginInfo("player", "is_completed") && "hidden"}`}>{!getLoginInfo("player", "is_completed") && "You have to complete your profile before accessing anything else."}</div>
          <div className="bg-white p-4 rounded-md overflow-hidden">
            <Routes>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="nominations" element={<Nominations />}></Route>
              <Route path="team" element={<TeamMembers />}></Route>
              <Route path="profile" element={<Profile updateComponent={updateComponent} />}></Route>
              <Route path="manage-password" element={<ManagePassword />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPanel
