import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';

export function AddEditScholarship({
  isOpen,
  onClose,
  editingScholarship,
  onSuccess,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    sponsor: '',
    date_from: '',
    date_to: '',
  });

  useEffect(() => {
    if (editingScholarship && isOpen) {
      setFormData({
        title: editingScholarship.title || '',
        sponsor: editingScholarship.sponsor || '',
        date_from: editingScholarship.date_from || '',
        date_to: editingScholarship.date_to || '',
      });
    } else if (!isOpen) {
      setFormData({
        title: '',
        sponsor: '',
        date_from: '',
        date_to: '',
      });
    }
  }, [editingScholarship, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        sponsor: formData.sponsor,
        date_from: formData.date_from,
        date_to: formData.date_to,
        employee_id: user.employee_id,
      };

      if (editingScholarship?.id) {
        await axiosInstance.put(
          `/schoolarship/${editingScholarship.id}`,
          payload
        );
      } else {
        await axiosInstance.post('/schoolarship/', payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save scholarship:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to save scholarship');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingScholarship ? 'Edit Scholarship' : 'Add Scholarship'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Scholarship Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., CHED Scholarship Program"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sponsor">Sponsor/Grantor</Label>
              <Input
                id="sponsor"
                value={formData.sponsor}
                onChange={(e) =>
                  setFormData({ ...formData, sponsor: e.target.value })
                }
                placeholder="e.g., Commission on Higher Education"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_from">From Date</Label>
              <Input
                id="date_from"
                type="date"
                value={formData.date_from}
                onChange={(e) =>
                  setFormData({ ...formData, date_from: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_to">To Date</Label>
              <Input
                id="date_to"
                type="date"
                value={formData.date_to}
                onChange={(e) =>
                  setFormData({ ...formData, date_to: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90"
            >
              {editingScholarship ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
