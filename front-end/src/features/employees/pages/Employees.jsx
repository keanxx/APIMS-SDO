import React, { useEffect, useState } from 'react'
import SearchFilter from '../components/SearchFilter'
import EmployeeTable from '../components/EmployeeTable'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AddEmployee from '../components/AddEmployee'
import axios from 'axios'

const Employees = () => {
   const [searchValue, setSearchValue] = useState('');
  const [department, setDepartment] = useState('');
  const [district, setDistrict] = useState('');
  const [position, setPosition] = useState('');
  const [allEmployees, setAllEmployees] = useState([]);

   const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fetch all employees for filtering
        const response = await axios.get(`${API_URL}/employee/employees-with-workstation?page=1&limit=1000`);
        setAllEmployees(response.data.data || []);
      } catch (error) {
        console.error("❌ Fetch failed:", error);
      }
    };

    fetchEmployees();
  }, [API_URL]);

  return (
    <div className="space-y-4 bg-[#F7F9F7] px-5 py-2">
      <div>
        <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">
          Employee Management
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Manage and Review Employee
        </p>
      </div>

      <div>
        <SearchFilter
        onSearchChange={setSearchValue}
        onDepartmentChange={setDepartment}
        onDistrictChange={setDistrict}
        onPositionChange={setPosition}
        searchValue={searchValue}
        department={department}
        district={district}
        position={position}
        employees={allEmployees} />
      </div>
      <div>
        <div className="flex justify-end mb-4 overflow-auto">
          <Dialog>
  <DialogTrigger asChild>
    <Button>Add Employee</Button>
  </DialogTrigger>
  <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
    <AddEmployee />
  </DialogContent>
</Dialog>

        </div>
        <div>
        <EmployeeTable
        searchValue={searchValue}
        department={department}
        district={district}
        position={position}
        allEmployees={allEmployees} />
      </div>
      </div>
      
    </div>
  )
}

export default Employees
