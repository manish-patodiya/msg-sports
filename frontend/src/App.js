import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontend from "./components/Frontend";
import Login from "./components/admin/Login";
import NewUserLogin from "./components/admin/NewUserLogin";
import Dashboard from "./components/admin/Dashboard";
import "./App.css";
import Admin from "./components/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontend />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
