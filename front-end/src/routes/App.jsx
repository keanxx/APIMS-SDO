import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../features/auth/pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import SidebarLayout from "../components/SidebarLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Employees from "../features/employees/pages/Employees";
import Benefits from "../features/benefits/pages/Benefits";
import Position from "../features/position/pages/Position";
import Retirements from "../features/retirement/pages/Retirements";
import SchoolCalendar from "../features/school_calendar/pages/SchoolCalendar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
       <Route element={<SidebarLayout />}>
         <Route path="dashboard" element={<Dashboard />} />
         <Route path="employees" element={<Employees />} />
         <Route path="benefits" element={<Benefits />} />
         <Route path="position" element={<Position />} />
         <Route path="retirement" element={<Retirements />} />
         <Route path="school-calendar" element={<SchoolCalendar />} />
        </Route>
      </Route>
    </Routes>
  );
}
