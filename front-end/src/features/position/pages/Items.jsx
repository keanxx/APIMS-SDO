import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from 'react'

const Items = () => {
  return (
    <div className="space-y-5">
        <div>
        <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">Plantilla/Items</h1>
        <p className="text-xs md:text-sm text-muted-foreground">Manage and Review Items</p>
        </div>
        <div className="flex flex-wrap">
        <Card className="px-5">
            <CardHeader>
                <CardTitle>Items List</CardTitle>
            </CardHeader>
            <CardContent>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Position</TableHead>
      <TableHead>Item / Plantilla</TableHead>
      <TableHead>Availability</TableHead>
      <TableHead>Date Released</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Administrative Aide I</TableCell>
      <TableCell>Item #1001</TableCell>
      <TableCell className="text-green-600 font-semibold">Available</TableCell>
      <TableCell>Oct 20, 202</TableCell>
    </TableRow>
  </TableBody>
</Table>
            </CardContent>  
        </Card>
    </div>

    </div>
    
  )
}

export default Items