import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const EmployeeTable = () => {
  const tabledata = [
    {
      name: 'Choco Martin',
      email: 'chocomartin@deped.edu.ph',
      position: 'Administrative Aide III',
      school: 'SDS',
      district: 'District 1'
    },
    {
      name: 'Suppa Nikka',
      email: 'suppanikka@deped.edu.ph',
      position: 'Teacher I',
      school: 'SDS',
      district: 'District 1'
    },
    {
      name: 'Kiko Pangalinan',
      email: 'kikopangalinan@deped.edu.ph',
      position: 'Principal II',
      school: 'SDS',
      district: 'District 1'
    },
    {
      name: 'Leni Robredo',
      email: 'lenirobredo@deped.edu.ph',
      position: 'Superintendent',
      school: 'SDS',
      district: 'District 1'
    },
    {
      name: 'Bong Go',
      email: 'bonggo@deped.edu.ph',
      position: 'Clerk',
      school: 'SDS',
      district: 'District 1'
    }
  ]

  return (
    <Card>
      <CardTitle className="px-5 font-light">Employees ({tabledata.length})</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>School/Office</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabledata.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarFallback>
                        {employee.name
                          .split(' ')
                          .map(word => word[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{employee.name}</p>
                      <p className="text-muted-foreground text-xs md:text-sm truncate">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.school}</TableCell>
                <TableCell>{employee.district}</TableCell>
                <TableCell>
                  <Button size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default EmployeeTable
