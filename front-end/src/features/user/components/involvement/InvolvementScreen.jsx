// InvolvementScreen.jsx
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Users } from "lucide-react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { AddEditInvolvement } from "./AddEditInvolvement";
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

export default function InvolvementScreen() {
  const { user } = useAuth();
  const [involvements, setInvolvements] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingInvolvement, setEditingInvolvement] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvolvements = async () => {
      try {
        const response = await axiosInstance.get(
          `/involvement/${user.employee_id}`
        );

        setInvolvements(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch involvements:", error);
        setLoading(false);
      }
    };

    if (user?.employee_id) {
      fetchInvolvements();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingInvolvement(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (involvement) => {
    setEditingInvolvement(involvement);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSuccess = async () => {
    // Re-fetch involvement data after add/update
    try {
      const response = await axiosInstance.get(
        `/involvement/${user.employee_id}`
      );
      setInvolvements(response.data);
    } catch (error) {
      console.error("Failed to refresh involvements:", error);
    }
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/involvement/${deleteId}`);
        setInvolvements(involvements.filter((inv) => inv.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error("Failed to delete involvement:", error);
        alert("Failed to delete involvement record");
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
    <div className="">
      <div className="mb-3 px-2 flex justify-between  items-center">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#1A3A1A]" />
          <h2 className="text-gray-900">Involvement</h2>
        </div>
        <button
          variant="ghost"
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add 
        </button>
      </div>

      <div className="space-y-4">
        {involvements.map((involvement) => (
          <div
            key={involvement.id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900">{involvement.name_org}</h3>
                <span className="text-xs px-2 py-0.5 bg-[#1A3A1A]/10 text-[#1A3A1A] rounded">
                  {involvement.position}
                </span>
              </div>
              <p className="text-gray-700">{involvement.address_org}</p>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 font-medium">Period:</span>
                <span className="text-gray-900">
                  {involvement.date_from} – {involvement.date_to}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 font-medium">Hours:</span>
                <span className="text-gray-900">{involvement.hours_no} hours</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEdit(involvement)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(involvement.id)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors ml-3"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddEditInvolvement
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingInvolvement={editingInvolvement}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Involvement Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this involvement record? This
              action cannot be undone.
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
