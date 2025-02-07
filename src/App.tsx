import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ColorPalette from "./helpers/ColorPalette";
import Profile from "./components/pages/Profile";
import Works from "./components/pages/Works";
import Quotes from "./components/pages/Quotes";
import AddQuote from "./components/pages/AddQuote";
import EditQuote from "./components/pages/EditQuote";
import AdminLogin from "./components/pages/AdminLogin";
import ChangePlan from "./components/pages/ChangePlan";
import AdminDashboard from "./components/pages/AdminDashboard";
import Tickets from "./components/pages/Tickets";
import RequireAuth from "./helpers/RequireAuth";

import "./reset.css";
import "./App.scss";
import TicketDetails from "./components/pages/TicketDetails";

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
          path="/change-plan"
          element={
            <RequireAuth authLevel="user">
              <ChangePlan />
            </RequireAuth>
          }
        />
        <Route
          path="/tickets"
          element={
            <RequireAuth authLevel="user">
              <Tickets />
            </RequireAuth>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <RequireAuth authLevel="user">
              <TicketDetails />
            </RequireAuth>
          }
        />
        <Route path="/admin">
          <Route
            index
            element={
              <RequireAuth authLevel="any">
                <AdminLogin />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth authLevel="admin">
                <AdminDashboard />
              </RequireAuth>
            }
          />
        </Route>
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
