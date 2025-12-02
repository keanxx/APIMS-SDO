import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TrainingsTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [trainings, setTrainings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    from_date: "",
    to_date: "",
    hours: "",
    sponsor: "",
    participant_type: "",
    level: "",
    certificate: null,
  });

  // Fetch all training records for this employee
  const fetchTrainings = async () => {
    try {
      const res = await axios.get(`${API_URL}/trainings/${employeeId}`);
      setTrainings(res.data.data || []);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  useEffect(() => {
    if (employeeId) fetchTrainings();
  }, [employeeId]);

  // Handle changes for text/date inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, certificate: e.target.files[0] }));
  };

  // Open Add Dialog
  const openAddDialog = () => {
    setFormData({
      title: "",
      from_date: "",
      to_date: "",
      hours: "",
      sponsor: "",
      participant_type: "",
      level: "",
      certificate: null,
    });
    setIsEditing(false);
    setEditingId(null);
    setOpenDialog(true);
  };

  // Open Edit Dialog
  const openEditDialog = (rec) => {
    setFormData({
      title: rec.title,
      from_date: rec.from_date,
      to_date: rec.to_date,
      hours: rec.hours,
      sponsor: rec.sponsor,
      participant_type: rec.participant_type,
      level: rec.level,
      certificate: null,
    });
    setIsEditing(true);
    setEditingId(rec.id);
    setOpenDialog(true);
  };

  // Add / Edit Submit
  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("from_date", formData.from_date);
      payload.append("to_date", formData.to_date);
      payload.append("hours", formData.hours);
      payload.append("sponsor", formData.sponsor);
      payload.append("participant_type", formData.participant_type);
      payload.append("level", formData.level);
      payload.append("employee_id", employeeId);

      if (formData.certificate) {
        payload.append("certificate", formData.certificate);
      }

      if (isEditing && editingId) {
        await axios.put(`${API_URL}/trainings/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/trainings`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchTrainings();
      setOpenDialog(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving training:", error);
    }
  };

  // Delete training
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this training?")) return;

    try {
      await axios.delete(`${API_URL}/trainings/${id}`);
      fetchTrainings();
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Trainings</h2>
        <Button onClick={openAddDialog}>Add Training</Button>
      </div>

      {/* TRAININGS LIST */}
      {trainings.length > 0 ? (
        trainings.map((rec) => (
          <Card key={rec.id} className="shadow-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{rec.title}</CardTitle>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(rec)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(rec.id)}>
                  Delete
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <Label>Date:</Label>
                <p>
                  {rec.from_date} → {rec.to_date}
                </p>
              </div>

              <div>
                <Label>Hours:</Label>
                <p>{rec.hours}</p>
              </div>

              <div>
                <Label>Sponsor:</Label>
                <p>{rec.sponsor}</p>
              </div>

              <div>
                <Label>Level:</Label>
                <p>{rec.level}</p>
              </div>

              <div>
                <Label>Participant Type:</Label>
                <p>{rec.participant_type}</p>
              </div>

              {rec.signed_url && (
                <div>
                  <Label>Certificate:</Label>
                  <a
                    href={rec.signed_url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View Certificate
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No training records found.</p>
      )}

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Training" : "Add Training"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} />
            </div>

            <div>
              <Label>From Date</Label>
              <Input type="date" name="from_date" value={formData.from_date} onChange={handleInputChange} />
            </div>

            <div>
              <Label>To Date</Label>
              <Input type="date" name="to_date" value={formData.to_date} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Hours</Label>
              <Input name="hours" type="number" value={formData.hours} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Sponsor</Label>
              <Input name="sponsor" value={formData.sponsor} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Participant Type</Label>
              <Input name="participant_type" value={formData.participant_type} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Level</Label>
              <Input name="level" value={formData.level} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Certificate File (optional)</Label>
              <Input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isEditing ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingsTab;
