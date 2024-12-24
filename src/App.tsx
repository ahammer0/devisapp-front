import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ColorPalette from "./helpers/ColorPalette";
import Profile from "./components/pages/Profile";
import Works from "./components/pages/Works";
import "./reset.css";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/palette" element={<ColorPalette />} />
        <Route path="/connection" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/works" element={<Works/>}/>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
