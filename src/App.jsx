import { Routes, Route } from "react-router-dom";
import Auth from "./page/auth/Auth";
import Dashboard from "./page/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import UserProfile from "./page/profile/UserProfile";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/UserProfile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}