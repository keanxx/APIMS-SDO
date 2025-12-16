import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';
import { Button } from "@/components/ui/button";
import { AddEditEduc } from "./AddEditEduc";
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
import { ProfileSectionSkeleton } from "../../pages/Profile";

export function EducationScreen() {
  const { user } = useAuth(); 
  const [education, setEducation] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axiosInstance.get(
          `/education/all/${user.employee_id}`
        );
        
        setEducation(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch education:', error);
        setLoading(false);
      }
    };

    if (user?.employee_id) {
      fetchEducation();
    }
  }, [user?.employee_id]);

  

  const handleAdd = () => {
    setEditingEducation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (edu) => {
    setEditingEducation(edu);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };
const handleSuccess = async () => {
  // Re-fetch education data after add/update
  try {
    const response = await axiosInstance.get(
      `/education/all/${user.employee_id}`
    );
    setEducation(response.data);
  } catch (error) {
    console.error('Failed to refresh education:', error);
  }
};


  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/education/delete/${deleteId}`);
        setEducation(education.filter((e) => e.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete education:', error);
        alert('Failed to delete education record');
      }
    }
  };

  if (loading) {
    return (
      <div className="pb-8">
        <ProfileSectionSkeleton />
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="py-5 px-2 flex justify-between mb-2 items-center border-b border-gray-200">
        <h2>Education</h2>
        <Button 
          variant="ghost" 
          onClick={handleAdd} 
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900">{edu.level}</h3>
                <span className="text-xs px-2 py-0.5 bg-[#1A3A1A]/10 text-[#1A3A1A] rounded">
                  {edu.graduated_year}
                </span>
              </div>
              <p className="text-gray-700">{edu.school_name}</p>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEdit(edu)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(edu.id)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors ml-3"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddEditEduc
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingEducation={editingEducation}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Education Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this education record? This action
              cannot be undone.
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