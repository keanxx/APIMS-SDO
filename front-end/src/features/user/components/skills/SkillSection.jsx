import React, { useState, useEffect } from "react";
import { Sparkles, Edit2, Trash2 } from "lucide-react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddEditSkill } from "./AddEditSkill";
import { Card } from "@/components/ui/card";

export function SkillSection() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchSkills = async () => {
    try {
      const response = await axiosInstance.get(
        `/skills-membership/employee/${user.employee_id}/skills`
      );

      console.log("Skills Response:", response.data);

      setSkills(
        Array.isArray(response.data.skills) ? response.data.skills : []
      );
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setSkills([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchSkills();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingSkill(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/skills-membership/${deleteId}`);
        setSkills(skills.filter((s) => s.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error("Failed to delete skill:", error);
        alert("Failed to delete skill");
      }
    }
  };

  const handleSuccess = () => {
    fetchSkills();
  };

  if (loading) {
    return <div className="text-gray-600">Loading skills...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#1A3A1A]" />
          <h2 className="text-gray-900">Special Talents / Skills</h2>
        </div>
        <button
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No skills added yet. Click "Add" to create one.
          </div>
        ) : (
          skills.map((item) => (
            <Card className={"px-4"} key={item.id}>
              <p className="text-gray-900 mb-3">{item.skill}</p>
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      <AddEditSkill
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingSkill={editingSkill}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this skill? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
