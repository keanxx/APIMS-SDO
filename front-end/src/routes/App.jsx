import { Routes, Route, Navigate } from "react-router-dom";
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
import UserDashboard from "@/features/user/pages/UserDashboard";
import AppointmentDetails from "@/features/appointment/pages/AppointmentDetails";
import Contract from "@/features/employees/pages/service-record/Contract";
import EmpServiceRecord from "@/features/employees/pages/service-record/EmpServiceRecord";
import Contracts from "@/features/appointment/pages/Contracts";
import Appointments from "@/features/appointment/pages/Appoinments";
import LeaveCredits from "@/features/employees/pages/leave-credits/LeaveCredits";
import MainLayout from "@/features/user/components/MainLayout";
import Eligibility from "@/features/user/pages/Eligibility";
import Leave from "@/features/user/pages/AppointmentContract.jsx";
import Profile from "@/features/user/pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import AppointmentContract from "@/features/user/pages/AppointmentContract.jsx";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Admin/HR Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["admin", "hr"]} />}>
          <Route element={<SidebarLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees">
              <Route index element={<Employees />} />
              <Route path=":employee_id" element={<EmployeeOverview />} />
              <Route path=":employee_id/edit" element={<EmployeeEdit />} />
              <Route path=":employee_id/contract" element={<Contract />} />
              <Route
                path=":employee_id/empservice_record"
                element={<EmpServiceRecord />}
              />
              <Route
                path=":employee_id/leave-credits"
                element={<LeaveCredits />}
              />
            </Route>

            <Route path="position-management">
              <Route index element={<PositionManagement />} />
              <Route path="position" element={<Position />} />
              <Route path="items" element={<Items />} />
              <Route path="salary" element={<Salary />} />
            </Route>
            <Route path="retirement" element={<Retirements />} />
            <Route path="school-calendar" element={<SchoolCalendar />} />
            <Route path="appointment-details">
              <Route index element={<AppointmentDetails />} />
              <Route path="appointment" element={<Appointments />} />
              <Route path="contract" element={<Contracts />} />
            </Route>
          </Route>
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route
              path="/user/appointment-contract"
              element={<AppointmentContract />}
            />
            <Route path="/user/eligibility" element={<Eligibility />} />
            <Route path="/user/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
