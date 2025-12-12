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

export function AddEditSkill({ isOpen, onClose, editingSkill, onSuccess, existingMembership }) { // ✅ Add existingMembership prop
  const { user } = useAuth();
  const [formData, setFormData] = useState({ 
    skills: '', // ✅ Changed to 'skills' (plural)
    membership: '' // ✅ Add membership field
  });

  useEffect(() => {
    if (editingSkill && isOpen) {
      setFormData({ 
        skills: editingSkill.skill || '', // ✅ Load into 'skills' field
        membership: existingMembership || '' // ✅ Load existing membership
      });
    } else if (!isOpen) {
      setFormData({ skills: '', membership: '' });
    }
  }, [editingSkill, isOpen, existingMembership]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        skills: formData.skills, // ✅ Send 'skills' (plural)
        membership: formData.membership, // ✅ Send membership too
        employee_id: user.employee_id,
      };

      if (editingSkill?.id) { 
        // Update existing skill
        await axiosInstance.put(`/skills-membership/${editingSkill.id}`, payload);
      } else {
        // Create new skill
        await axiosInstance.post('/skills-membership/', payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save skill:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to save skill');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {editingSkill ? 'Edit Special Talent/Skill' : 'Add Special Talent/Skill'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Special Talent/Skill</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })} // ✅ Use spread
                placeholder="e.g., Proficient in Photoshop and Video Editing"
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
              {editingSkill ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
