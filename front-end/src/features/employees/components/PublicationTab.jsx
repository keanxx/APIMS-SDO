import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PublicationTab = ({ employeeId }) => {
  const [publicationData, setPublicationData] = useState([]);
  const [editForm, setEditForm] = useState({ title: '', date: '' });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchPublicationData = async () => {
    try {
      const response = await axios.get(`${API_URL}/publication/all`);
      setPublicationData(response.data || []);
    } catch (error) {
      console.error('Error fetching publication data:', error);
    }
  };

  useEffect(() => {
    fetchPublicationData();
  }, [employeeId]);

  // Open dialog for add
  const handleAdd = () => {
    setSelectedRecord(null);
    setEditForm({
      title: '',
      date: '',
    });
    setOpenDialog(true);
  };

  // Open dialog for edit
  const handleEdit = (item) => {
    setSelectedRecord(item);
    setEditForm({
      title: item.title || '',
      date: item.date || '',
    });
    setOpenDialog(true);
  };

  // Save (add or edit)
  const handleSave = async () => {
    try {
      const payload = {
        title: editForm.title,
        date: editForm.date,
        employee_id: employeeId,
      };

      if (selectedRecord) {
        // Edit
        await axios.put(`${API_URL}/publication/update/${selectedRecord.id}`, payload);
      } else {
        // Add
        await axios.post(`${API_URL}/publication/add`, payload);
      }

      // Refresh data & reset form
      fetchPublicationData();
      setEditForm({
        title: '',
        date: '',
      });
      setSelectedRecord(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving publication data:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

const handleDelete = async (employeeId) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;
  
    try {
      await axios.delete(`${API_URL}/publication/delete/${employeeId}`);
      fetchPublicationData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between border-b pb-1">
        <h2 className="text-lg font-semibold text-[#1A3A1A]">Publication Information</h2>
        <Button className="btn btn-primary" onClick={handleAdd}>
          Add Publication
        </Button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
        {publicationData.length > 0 ? (
          publicationData.map((item) => (
            <Card className="mt-2" key={item.id}>
              <CardContent>
                <div>
                  <Label>Title</Label>
                  <p>{item.title}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p>{item.date}</p>
                </div>
                <Button className="btn btn-secondary mt-2" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button className="btn btn-secondary mt-2" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No publication data available.</div>
        )}
      </div>

      {/* DIALOG FORM */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRecord ? 'Edit Publication' : 'Add Publication'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={editForm.title} onChange={(e) => handleChange('title', e.target.value)} />
            </div>

            <div>
              <Label>Date</Label>
              <Input type="date" value={editForm.date} onChange={(e) => handleChange('date', e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublicationTab;