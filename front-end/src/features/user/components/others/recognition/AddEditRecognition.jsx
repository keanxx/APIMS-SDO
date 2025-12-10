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

export function AddEditRecognition({
  isOpen,
  onClose,
  editingRecognition,
  onSuccess,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ 
    award: '', 
    award_body: '', 
    date_awarded: '',
    award_level: ''
  });

  useEffect(() => {
    if (editingRecognition && isOpen) {
      setFormData({
        award: editingRecognition.award || '',
        award_body: editingRecognition.award_body || '',
        date_awarded: editingRecognition.date_awarded || '',
        award_level: editingRecognition.award_level || '',
      });
    } else if (!isOpen) {
      setFormData({ 
        award: '', 
        award_body: '', 
        date_awarded: '',
        award_level: ''
      });
    }
  }, [editingRecognition, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        award: formData.award,
        award_body: formData.award_body,
        date_awarded: formData.date_awarded,
        award_level: formData.award_level,
        employee_id: user.employee_id,
      };

      if (editingRecognition?.id) {
        await axiosInstance.put(
          `/recognition/${editingRecognition.id}`,
          payload
        );
      } else {
        await axiosInstance.post('/recognition/', payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save recognition:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to save recognition');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingRecognition
              ? 'Edit Recognition/Award'
              : 'Add Recognition/Award'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="award">Award Name</Label>
              <Input
                id="award"
                value={formData.award}
                onChange={(e) =>
                  setFormData({ ...formData, award: e.target.value })
                }
                placeholder="e.g., Best Employee Award"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="award_body">Awarding Body</Label>
              <Input
                id="award_body"
                value={formData.award_body}
                onChange={(e) =>
                  setFormData({ ...formData, award_body: e.target.value })
                }
                placeholder="e.g., DepEd ROIII"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_awarded">Date Awarded</Label>
              <Input
                id="date_awarded"
                type="date"
                value={formData.date_awarded}
                onChange={(e) =>
                  setFormData({ ...formData, date_awarded: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="award_level">Award Level</Label>
              <Input
                id="award_level"
                value={formData.award_level}
                onChange={(e) =>
                  setFormData({ ...formData, award_level: e.target.value })
                }
                placeholder="e.g., Regional, National, International"
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
              {editingRecognition ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
