import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./player/Login";
import NewUserLogin from "./player/NewUserLogin";
import PlayerPanel from "./player/PlayerPanel";

const Player = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="new-login" element={<NewUserLogin />}></Route>
        <Route path="/*" element={<PlayerPanel />}></Route>
      </Route>
    </Routes>
  );
};

export default Player;
