import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";

const EmpServiceRecord = () => {
  const { id } = useParams(); // employee_id
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const response = await axios.get(`${API_URL}/service_records/${id}`);
        const result = response.data ||
          [];

        setRecords(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("❌ Failed to fetch service records:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [id, API_URL]);

  if (loading) return <div className="p-6">Loading service records...</div>;

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={() => navigate(`/employees/${id}`)}>
        ← Back to Profile
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Service Records</CardTitle>
        </CardHeader>

        <CardContent>
          {records.length === 0 ? (
            <p className="text-gray-500">No service records found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date From</TableHead>
                  <TableHead>Date To</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Cause</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {records.map((r, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{r.date_from}</TableCell>
                    <TableCell>{r.date_to}</TableCell>
                    <TableCell>{r.salary}</TableCell>
                    <TableCell>{r.branch || "—"}</TableCell>
                    <TableCell>{r.cause || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpServiceRecord;
