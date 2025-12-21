import { Routes, Route } from "react-router-dom";
import Auth from "./page/auth/auth";
import Dashboard from "./page/dashboard/dashboard";
import Navbar from "./components/Navbar";
import UserProfile from "./page/profile/UserProfile";
export default function App() {
  return (
    <div className="font-sans">
      <Navbar/>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Auth />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </div>
  )
};
