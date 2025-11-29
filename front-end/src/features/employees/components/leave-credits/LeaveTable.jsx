import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function LeaveTable({ data, loading, onEditClick, onDeleteClick }) {
  
  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.employee_id}</TableCell>
              <TableCell>{item.points}</TableCell>
              <TableCell>{item.types}</TableCell>
              <TableCell>{item.status}</TableCell>
             <TableCell className="flex gap-2">
        <Button variant="outline" onClick={() => onEditClick(item)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDeleteClick(item.id)}>
          Delete
        </Button>
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
