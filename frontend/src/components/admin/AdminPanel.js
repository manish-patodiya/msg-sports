import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./includes/Sidebar";
import Header from "./includes/Header";
import Profile from "./Profile";
import ManagePassword from "./ManagePassword";
import Captains from "./Captains";
import Players from "./Players";
import Events from "./Events";
import Games from "./Games";
import SiteSettings from "./SiteSettings";
import { checkAuth } from "../../common/common";
import Houses from "./Houses";
import Fixtures from "./site_settings/Fixtures";


const AdminPanel = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkAuth("admin")) {
            navigate("/admin");
        }
    })

    return (
        <div className="relative bg-gray-200 min-h-screen">
            <Sidebar />
            <div className="ms-[16rem] relative">
                <Header />
                <div className="p-6">
                    <div></div>
                    <div className="bg-white p-4 rounded-md min-h-screen overflow-hidden">
                        <Routes>
                            <Route path="dashboard" element={<Dashboard />}></Route>
                            <Route path="captains" element={<Captains />}></Route>
                            <Route path='players' element={<Players />}></Route>
                            <Route path="profile" element={<Profile />}></Route>
                            <Route path='manage-password' element={<ManagePassword />}></Route>
                            <Route path='events' element={<Events />}></Route>
                            <Route path='games' element={<Games />}></Route>
                            <Route path='houses' element={<Houses />}></Route>
                            <Route path="site-settings" element={<SiteSettings />}></Route>
                            <Route path="fixtures" element={<Fixtures />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
