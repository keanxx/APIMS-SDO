import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";

const RetirementTable = () => {
  const [retirementData, setRetirementData] = useState([]);
  const [totalRetirements, setTotalRetirements] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRetirements = async () => {
      try {
        const res = await axios.get(`${API_URL}/retirement/`);
        setRetirementData(res.data.data);
        setTotalRetirements(res.data.age_60_plus_count);
      } catch (error) {
        console.error("Error fetching retirement data:", error);
      }
    };

    fetchRetirements();
  }, [API_URL]);

  return (
    <Card>
      <CardTitle className="px-5 font-light">
        Available Retirement ({totalRetirements})
      </CardTitle>
      <CardContent className="h-[55vh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Employer ID</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Birth Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {retirementData.length > 0 ? (
              retirementData.map((employee) => (
                <TableRow key={employee.employee_id}>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarFallback>
                          {employee.f_name[0]}
                          {employee.l_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{`${employee.f_name} ${employee.m_name}. ${employee.l_name}`}</p>
                        <p className="text-xs text-gray-500">
                          {employee.email_address}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.employer_id}</TableCell>
                  <TableCell>{employee.full_age}</TableCell>
                  <TableCell>{employee.birth_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No retirement records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RetirementTable;
