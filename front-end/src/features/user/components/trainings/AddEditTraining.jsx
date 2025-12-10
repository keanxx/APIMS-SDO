import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';

export function AddEditTraining({ 
  isOpen, 
  onClose, 
  editingTraining, 
  onSuccess 
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    hours: "",
    from_date: "",
    to_date: "",
    participant_type: "",
    sponsor: "",
    level: "",
    file: null,
  });

  // Load data when editing
  useEffect(() => {
    if (editingTraining && isOpen) {
      setFormData({
        title: editingTraining.title || "",
        hours: editingTraining.hours?.toString() || "",
        from_date: editingTraining.from_date || "",
        to_date: editingTraining.to_date || "",
        participant_type: editingTraining.participant_type || "",
        sponsor: editingTraining.sponsor || "",
        level: editingTraining.level || "",
        file: null,
      });
    } else if (!isOpen) {
      setFormData({
        title: "",
        hours: "",
        from_date: "",
        to_date: "",
        participant_type: "",
        sponsor: "",
        level: "",
        file: null,
      });
    }
  }, [editingTraining, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('hours', parseInt(formData.hours));
      formDataToSend.append('from_date', formData.from_date);
      formDataToSend.append('to_date', formData.to_date);
      formDataToSend.append('participant_type', formData.participant_type);
      formDataToSend.append('sponsor', formData.sponsor);
      formDataToSend.append('level', formData.level);
      formDataToSend.append('employee_id', user.employee_id);
      
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      if (editingTraining) {
        await axiosInstance.put(
          `/trainings/${editingTraining.id}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axiosInstance.post(
          '/trainings/upload_and_create', 
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save training:', error);
      alert('Failed to save training record');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingTraining ? "Edit Training" : "Add Training"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Training Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Records Management"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
                required
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from_date">From Date</Label>
              <Input
                id="from_date"
                type="date"
                value={formData.from_date}
                onChange={(e) =>
                  setFormData({ ...formData, from_date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to_date">To Date</Label>
              <Input
                id="to_date"
                type="date"
                value={formData.to_date}
                onChange={(e) =>
                  setFormData({ ...formData, to_date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participant_type">Participant Type</Label>
              <Input
                id="participant_type"
                value={formData.participant_type}
                onChange={(e) =>
                  setFormData({ ...formData, participant_type: e.target.value })
                }
                placeholder="e.g., Speaker, Attendee"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sponsor">Sponsor/Conducted By</Label>
              <Input
                id="sponsor"
                value={formData.sponsor}
                onChange={(e) =>
                  setFormData({ ...formData, sponsor: e.target.value })
                }
                placeholder="e.g., DepEd ROIII"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                placeholder="e.g., Regional, National"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Certificate/Attachment</Label>
              {editingTraining?.certificate_path && !formData.file && (
                <div className="text-sm text-gray-600 mb-2 p-2 bg-gray-50 rounded">
                  Current file: {editingTraining.certificate_path.split('/').pop()}
                  {editingTraining.signed_url && (
                    <a 
                      href={editingTraining.signed_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  )}
                </div>
              )}
              <Input
                id="file"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <p className="text-xs text-gray-500">
                {editingTraining 
                  ? "Upload a new file to replace the existing one (optional)"
                  : "Accepted formats: PDF, JPG, PNG"}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button 
              type="submit"
              className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90"
            >
              {editingTraining ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
