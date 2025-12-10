import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';

export function AddEditMembership({ isOpen, onClose, editingMembership, onSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ 
    membership: '', 
    skills: '' // ✅ Changed from 'Skills' to 'skills' (lowercase)
  });

  useEffect(() => {
    if (editingMembership && isOpen) {
      setFormData({ 
        membership: editingMembership.membership || '', 
        skills: editingMembership.skills || '' // ✅ Changed to lowercase
      });
    } else if (!isOpen) {
      setFormData({ membership: '', skills: '' }); // ✅ Changed to lowercase
    }
  }, [editingMembership, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        membership: formData.membership,
        skills: formData.skills,
        employee_id: user.employee_id,
      };

      if (editingMembership) {
        // Update existing membership
        await axiosInstance.put(`/skills-membership/${editingMembership.id}`, payload);
      } else {
        // Add new membership
        await axiosInstance.post('/skills-membership/', payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save membership:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to save membership');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {editingMembership ? 'Edit Membership' : 'Add Membership'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="membership">Membership in Organization</Label>
              <Textarea
                id="membership"
                value={formData.membership}
                onChange={(e) => setFormData({ ...formData, membership: e.target.value })} // ✅ Use spread to keep skills
                placeholder="e.g., Philippine Association of Government Employees - Member since 2019"
                required
                rows={3}
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
              {editingMembership ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
