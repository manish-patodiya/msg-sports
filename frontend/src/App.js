import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontend from "./components/Frontend";
import "./App.css";
import Admin from "./components/Admin";
import Captain from "./components/Captains";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontend />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/captain/*" element={<Captain />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
