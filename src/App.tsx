import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ColorPalette from "./helpers/ColorPalette";
import Profile from "./components/pages/Profile";
import Works from "./components/pages/Works";
import RequireAuth from "./helpers/RequireAuth";

import "./reset.css";
import "./App.scss";
import Quotes from "./components/pages/Quotes";
import AddQuote from "./components/pages/AddQuote";
import EditQuote from "./components/pages/EditQuote";

function App() {
  return (
    <>
      <Routes>
        <Route path="/palette" element={<ColorPalette />} />
        <Route path="/connection" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route
          path="/profile"
          element={
            <RequireAuth authLevel="user">
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/works"
          element={
            <RequireAuth authLevel="user">
              <Works />
            </RequireAuth>
          }
        />
        <Route
          path="/quotes"
          element={
            <RequireAuth authLevel="user">
              <Quotes />
            </RequireAuth>
          }
        />
        <Route
          path="/add-quote"
          element={
            <RequireAuth authLevel="user">
              <AddQuote />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-quote/:id"
          element={
            <RequireAuth authLevel="user">
              <EditQuote />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth authLevel="any">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
