import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeTable = () => {
  const navigate = useNavigate();
  const tabledata = [
    {
      id:1,
      name: 'Choco Martin',
      email: 'chocomartin@deped.edu.ph',
      position: 'Administrative Aide III',
      school: 'SDS',
      district: 'District 1'
    },
    {
      id:2,
      name: 'Suppa Nikka',
      email: 'suppanikka@deped.edu.ph',
      position: 'Teacher I',
      school: 'SDS',
      district: 'District 1'
    },
    {
      id:3,
      name: 'Kiko Pangalinan',
      email: 'kikopangalinan@deped.edu.ph',
      position: 'Principal II',
      school: 'SDS',
      district: 'District 1'
    },
    {
      id:4,
      name: 'Leni Robredo',
      email: 'lenirobredo@deped.edu.ph',
      position: 'Superintendent',
      school: 'SDS',
      district: 'District 1'
    },
    {
      id:5,
      name: 'Bong Go',
      email: 'bonggo@deped.edu.ph',
      position: 'Clerk',
      school: 'SDS',
      district: 'District 1'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const currentData = tabledata.slice(startIndex, endIndex)
const totalPages = Math.ceil(tabledata.length / itemsPerPage)


  return (
    <Card>
      <CardTitle className="px-5 font-light">Employees ({tabledata.length})</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="hidden sm:block">School/Office</TableHead>
              <TableHead className="hidden sm:block">District</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((employee, index) => (
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
                <TableCell className="hidden sm:block">{employee.school}</TableCell>
                <TableCell className="hidden sm:block">{employee.district}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => navigate(`/employees/${employee.id}`)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
  <PaginationContent>
   
    <PaginationItem>
      <PaginationPrevious
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>

    {/* Page numbers */}
    {Array.from({ length: totalPages }, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          isActive={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}

    {/* Next button */}
    <PaginationItem>
      <PaginationNext
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>

      </CardContent>
    </Card>
  )
}

export default EmployeeTable
