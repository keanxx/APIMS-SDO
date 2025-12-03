import { useEffect, useState } from "react";
import axios from "axios";
import LeaveTable from "../../components/leave-credits/LeaveTable";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = import.meta.env.VITE_API_URL;

export default function LeaveCredits() {
  const { employee_id } = useParams();

  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false); 
  const [form, setForm] = useState({ points: "", types: "", status: "" });


    const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState({ points: "", types: "", status: "" });
  const [selectedLeave, setSelectedLeave] = useState(null);


  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/leave_points/${employee_id}`);
      setLeaveData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [employee_id]);


const handleCreate = async () => {
  try {
await axios.post(`${API_URL}/leave_points/add/${employee_id}`, form);
    setForm({
      points: "",
      types: "",
      status: "",
    });
    setOpenCreate(false);
    fetchData();
  } catch (error) {
    console.error("Create error:", error);
  }
};


const openEditDialog = (item) => {
  setSelectedLeave(item);
  setEditForm({
    employee_id: item.employee_id, // auto-fill employee_id
    points: item.points,
    types: item.types,
    status: item.status,
  });
  setOpenEdit(true);
};


const handleEdit = async () => {
  if (!selectedLeave) return;
  try {
    await axios.put(`${API_URL}/leave_points/update/${selectedLeave.id}`, {
      employee_id: selectedLeave.employee_id, 
      points: editForm.points,
      types: editForm.types,
      status: editForm.status,
    });

    setEditForm({ points: "", types: "", status: "" });
    setSelectedLeave(null);
    setOpenEdit(false);
    fetchData();
  } catch (error) {
    console.error("Edit error:", error);
  }
};

const handleDelete = async (leaveId) => {
  if (!confirm("Are you sure you want to delete this leave?")) return;

  try {
    await axios.delete(`${API_URL}/leave_points/delete/${leaveId}`);
    fetchData(); // refresh table after deletion
  } catch (error) {
    console.error("Delete error:", error);
  }
};
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Leave Credits</h1>

        {/* --- Create New Leave Dialog --- */}
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>Create New Leave</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Leave</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              


              <div>
                <Label>Points</Label>
                <Input
                  type="number"
                  value={form.points}
                  onChange={(e) => setForm({ ...form, points: e.target.value })}
                />
              </div>

              <div>
                <Label>Type</Label>
                <Input
                  value={form.types}
                  onChange={(e) => setForm({ ...form, types: e.target.value })}
                />
              </div>

              <div>
                <Label>Status</Label>
                <Input
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                />
              </div>

              <Button onClick={handleCreate}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- Leave Table --- */}
      <LeaveTable data={leaveData} loading={loading} onEditClick={openEditDialog} onDeleteClick={handleDelete} />

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div>
              <Label>Employee ID</Label>
              <Input
                value={editForm.employee_id}
                onChange={(e) =>
                  setEditForm({ ...editForm, employee_id: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Points</Label>
              <Input
                value={editForm.points}
                onChange={(e) =>
                  setEditForm({ ...editForm, points: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Type</Label>
              <Input
                value={editForm.types}
                onChange={(e) =>
                  setEditForm({ ...editForm, types: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <Input
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
              />
            </div>
            <Button onClick={handleEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
