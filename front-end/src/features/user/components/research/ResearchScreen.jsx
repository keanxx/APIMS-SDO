// ResearchScreen.jsx
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, BookOpen, BookOpenText, CalendarClock } from "lucide-react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { AddEditResearch } from "./AddEditResearch";
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

export function ResearchScreen() {
  const { user } = useAuth();
  const [research, setResearch] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingResearch, setEditingResearch] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/research-innovation/${user.employee_id}`
      );

      console.log("Research Response:", response.data);

      setResearch(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch research:", error);
      setResearch([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchResearch();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingResearch(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item) => {
    setEditingResearch(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSuccess = async () => {
    // Re-fetch research data after add/update
    await fetchResearch();
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/research-innovation/${deleteId}`);
        setResearch(research.filter((item) => item.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error("Failed to delete research:", error);
        alert("Failed to delete research record");
      }
    }
  };

  if (loading) {
    return (
      <div className="pb-8">
        <div className="py-5 px-2 border-b border-gray-200">
          <h2>Research & Publications</h2>
        </div>
        <div className="px-2 py-4">
          <p className="text-gray-600">Loading research records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="py-4 px-2 flex justify-between mb-2 items-center">
      <div className="flex items-center gap-2">
        <BookOpenText className="h-5 w-5 text-[#1A3A1A]" />
        <h2 className="text-gray-900">Research Innovation</h2>
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
        {research.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No research records found.
          </div>
        ) : (
          research.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <div className="mb-3">
               
                  <h3 className="text-gray-900 font-medium">{item.title}</h3>
                <p className="text-gray-700 text-sm py-1">
                  {item.abstract_summary}
                </p>

                <div  className="text-sm text-gray-600 flex items-center gap-1">
                  <CalendarClock  className="w-3.5 h-3.5" />
                  
                  <span className="text-xs py-0.5 text-[#1A3A1A]">
                    Duration: {item.date_from} – {item.date_to}
                  </span>
                </div>
              </div>

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
            </div>
          ))
        )}
      </div>

      <AddEditResearch
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingResearch={editingResearch}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Research Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this research record? This
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
