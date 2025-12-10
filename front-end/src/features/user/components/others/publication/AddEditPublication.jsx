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

export function AddEditPublication({
  isOpen,
  onClose,
  editingPublication,
  onSuccess,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
  });

  useEffect(() => {
    if (editingPublication && isOpen) {
      setFormData({
        title: editingPublication.title || '',
        date: editingPublication.date || '',
      });
    } else if (!isOpen) {
      setFormData({
        title: '',
        date: '',
      });
    }
  }, [editingPublication, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        date: formData.date,
        employee_id: user.employee_id,
      };

      if (editingPublication?.id) {
        await axiosInstance.put(
          `/publication/update/${editingPublication.id}`,
          payload
        );
      } else {
        await axiosInstance.post('/publication/add', payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save publication:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to save publication');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {editingPublication ? 'Edit Publication' : 'Add Publication'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Publication Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Research on Modern Teaching Methods"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Publication Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
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
              {editingPublication ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
