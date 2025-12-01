import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

const EligibilityTab = ({ employeeId }) => {
  const [eligibilityData, setEligibilityData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    career_service: "",
    rating: "",
    date_exam: "",
    place_exam: "",
    license_no: "",
    date_valid: "",
  });
  const [selectedRecord, setSelectedRecord] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch eligibility data
  const fetchEligibilityData = async () => {
    try {
      const response = await axios.get(`${API_URL}/elegibility/${employeeId}`);
      setEligibilityData(response.data || []);
    } catch (error) {
      console.error("Error fetching eligibility data:", error);
    }
  };

  useEffect(() => {
    fetchEligibilityData();
  }, [employeeId]);

  // Open dialog for add
  const handleAdd = () => {
    setSelectedRecord(null);
    setEditForm({
      career_service: "",
      rating: "",
      date_exam: "",
      place_exam: "",
      license_no: "",
      date_valid: "",
    });
    setOpenDialog(true);
  };

  // Open dialog for edit
  const handleEdit = (item) => {
    setSelectedRecord(item);
    setEditForm({
      career_service: item.career_service || "",
      rating: item.rating || "",
      date_exam: item.date_exam || "",
      place_exam: item.place_exam || "",
      license_no: item.license_no || "",
      date_valid: item.date_valid || "",
    });
    setOpenDialog(true);
  };

  // Save (add or edit)
  const handleSave = async () => {
    try {
      const payload = {
        career_service: editForm.career_service,
        rating: editForm.rating,
        date_exam: editForm.date_exam,
        place_exam: editForm.place_exam,
        license_no: editForm.license_no,
        date_valid: editForm.date_valid,
        employee_id: employeeId,
      };

      if (selectedRecord) {
        // Edit
        await axios.put(`${API_URL}/elegibility/update/${selectedRecord.id}`, payload);
      } else {
        // Add
        await axios.post(`${API_URL}/elegibility/add`, payload);
      }

      // Refresh data & reset form
      fetchEligibilityData();
      setEditForm({
        career_service: "",
        rating: "",
        date_exam: "",
        place_exam: "",
        license_no: "",
        date_valid: "",
      });
      setSelectedRecord(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving eligibility data:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (employeeId) => {
    if (!confirm("Are you sure you want to delete this leave?")) return;
  
    try {
      await axios.delete(`${API_URL}/elegibility/delete/${employeeId}`);
      fetchEligibilityData(); // refresh table after deletion
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between border-b pb-1">
        <h2 className="text-lg font-semibold text-[#1A3A1A]">Eligibility Information</h2>
        <Button variant="outline" size="sm" onClick={handleAdd}>Add Eligibility</Button>
      </div>

      {/* CONTENT CARD */}
      {eligibilityData.length > 0 ? (
        eligibilityData.map((item) => (
          <Card key={item.id} className="w-full mb-3">
            <CardContent className="space-y-3 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-medium text-gray-600">Career Service</p>
                <p className="text-sm">{item.career_service}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-sm">{item.rating}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-medium text-gray-600">Date of Exam</p>
                <p className="text-sm">{item.date_exam}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-medium text-gray-600">Place of Exam</p>
                <p className="text-sm">{item.place_exam}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-medium text-gray-600">License No.</p>
                <p className="text-sm">{item.license_no}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-medium text-gray-600">Validity Date</p>
                <p className="text-sm">{item.date_valid}</p>
              </div>

              {/* Edit button */}
              <div className="mt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">No eligibility records yet.</p>
      )}

      {/* DIALOG FORM */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRecord ? "Edit Eligibility" : "Add Eligibility"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Career Service</Label>
              <Input value={editForm.career_service} onChange={(e) => handleChange("career_service", e.target.value)} />
            </div>

            <div>
              <Label>Rating</Label>
              <Input type="number" value={editForm.rating} onChange={(e) => handleChange("rating", e.target.value)} />
            </div>

            <div>
              <Label>Date of Exam</Label>
              <Input type="date" value={editForm.date_exam} onChange={(e) => handleChange("date_exam", e.target.value)} />
            </div>

            <div>
              <Label>Place of Exam</Label>
              <Input value={editForm.place_exam} onChange={(e) => handleChange("place_exam", e.target.value)} />
            </div>

            <div>
              <Label>License No.</Label>
              <Input value={editForm.license_no} onChange={(e) => handleChange("license_no", e.target.value)} />
            </div>

            <div>
              <Label>Validity Date</Label>
              <Input type="date" value={editForm.date_valid} onChange={(e) => handleChange("date_valid", e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EligibilityTab;
