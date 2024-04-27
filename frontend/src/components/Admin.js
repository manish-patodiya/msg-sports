import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./admin/Login";
import AdminPanel from "./admin/AdminPanel";
const Admin = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/*" element={<AdminPanel />}></Route>
      </Route>
    </Routes>
  );
};

export default Admin;
