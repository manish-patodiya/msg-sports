import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontend from "./components/Frontend";
import Login from "./components/admin/Login";
import NewUserLogin from "./components/admin/NewUserLogin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontend />}></Route>
        <Route path="/admin">
          <Route path='' element={<Login />}></Route>
          <Route path='new-login' element={<NewUserLogin />}></Route>
          <Route path='dashboard' element={<Login />} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
