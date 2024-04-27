import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontend from "./components/Frontend";
import "./App.css";
import Admin from "./components/Admin";
import Captain from "./components/Captains";
import Player from "./components/Player";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontend />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
          <Route path="/captain/*" element={<Captain />}></Route>
          <Route path="/player/*" element={<Player />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
