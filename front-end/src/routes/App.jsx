import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../features/auth/pages/Login";
import SidebarLayout from "../components/SidebarLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Employees from "../features/employees/pages/Employees";
import Retirements from "../features/retirement/pages/Retirements";
import SchoolCalendar from "../features/school_calendar/pages/SchoolCalendar";
import EmployeeOverview from "@/features/employees/pages/EmployeeOverview";
import EmployeeEdit from "@/features/employees/pages/EmployeeEdit";
import PositionManagement from "../features/position/pages/PositionManagement";
import Position from "@/features/position/pages/Position";
import Items from "@/features/position/pages/Items";
import Salary from "@/features/position/pages/Salary";
import ServiceRecord from "@/features/service_record/pages/ServiceRecord";
import UserDashboard from "@/features/user/pages/UserDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
     <>
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      <Route element={<SidebarLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees">
          <Route index element={<Employees />} />
          <Route path=":id" element={<EmployeeOverview />} /> 
          <Route path=":id/edit" element={<EmployeeEdit />} /> 
        </Route>
        <Route path="service-record" element={<ServiceRecord />} />
        <Route path="position-management">
          <Route index element={<PositionManagement />} />
          <Route path="position" element={<Position />} />
          <Route path="items" element={<Items />} />
          <Route path="salary" element={<Salary />} />
        </Route>
        <Route path="retirement" element={<Retirements />} />
        <Route path="school-calendar" element={<SchoolCalendar />} />
      </Route>
      
      <Route path="user" element={<UserDashboard />} />
    </Routes>
   
    </>
  );
}