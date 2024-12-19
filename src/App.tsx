import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import ColorPalette from "./helpers/ColorPalette";
import "./reset.css";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/palette" element={<ColorPalette />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
