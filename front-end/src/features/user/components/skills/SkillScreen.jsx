import React, { useState } from "react";
import { Award, Edit2, Trash2, X } from "lucide-react";

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

export function SkillScreen() {
  const [skills, setSkills] = useState([
    { id: 1, name: "Leadership" },
    { id: 2, name: "Research" },
    { id: 3, name: "Data Analysis" },
    { id: 4, name: "HTML/CSS" },
    { id: 5, name: "Communication" },
    { id: 6, name: "Microsoft Office" },
    { id: 7, name: "Project Management" },
    { id: 8, name: "Public Speaking" },
  ]);

  const [awards, setAwards] = useState([
    {
      id: 1,
      title: "Employee of the Year",
      date: "2023-12-15",
      issuer: "DepEd Division Office - Tarlac City",
    },
    {
      id: 2,
      title: "Certificate of Recognition",
      date: "2022-11-20",
      issuer: "Regional Office III",
    },
    {
      id: 3,
      title: "Outstanding Performance Award",
      date: "2021-12-10",
      issuer: "DepEd Division Office - Tarlac City",
    },
  ]);

  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isAwardDialogOpen, setIsAwardDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [editingAward, setEditingAward] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [skillName, setSkillName] = useState("");
  const [awardFormData, setAwardFormData] = useState({
    title: "",
    date: "",
    issuer: "",
  });

  // ===== SKILLS =====
  const handleAddSkill = () => {
    setSkillName("");
    setIsSkillDialogOpen(true);
  };

  const handleSubmitSkill = (e) => {
    e.preventDefault();

    const newSkill = {
      id: Math.max(...skills.map((s) => s.id), 0) + 1,
      name: skillName,
    };

    setSkills([...skills, newSkill]);
    setIsSkillDialogOpen(false);
  };

  const handleDeleteSkill = (id) => {
    setDeleteTarget({ type: "skill", id });
    setIsDeleteDialogOpen(true);
  };

  // ===== AWARDS =====
  const handleAddAward = () => {
    setEditingAward(null);
    setAwardFormData({ title: "", date: "", issuer: "" });
    setIsAwardDialogOpen(true);
  };

  const handleEditAward = (award) => {
    setEditingAward(award);
    setAwardFormData({
      title: award.title,
      date: award.date,
      issuer: award.issuer,
    });
    setIsAwardDialogOpen(true);
  };

  const handleDeleteAward = (id) => {
    setDeleteTarget({ type: "award", id });
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitAward = (e) => {
    e.preventDefault();

    if (editingAward) {
      setAwards(
        awards.map((a) =>
          a.id === editingAward.id ? { ...a, ...awardFormData } : a
        )
      );
    } else {
      const newAward = {
        id: Math.max(...awards.map((a) => a.id), 0) + 1,
        ...awardFormData,
      };

      setAwards([...awards, newAward]);
    }

    setIsAwardDialogOpen(false);
  };

  // ===== DELETE CONFIRM =====
  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "skill") {
      setSkills(skills.filter((s) => s.id !== deleteTarget.id));
    } else {
      setAwards(awards.filter((a) => a.id !== deleteTarget.id));
    }

    setIsDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="pb-8">

      <div className="px-4 space-y-6">
        {/* ===== SKILLS ===== */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Skills</h2>
            <Button
              variant="outline"
              className="text-[#1A3A1A]"
              onClick={handleAddSkill}
            >
              + Add Skill
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group relative px-3 py-1.5 bg-[#1A3A1A]/10 text-[#1A3A1A] rounded-lg text-sm flex items-center gap-2"
                >
                  {skill.name}
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3 hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== AWARDS ===== */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Awards</h2>
            <Button
              variant="outline"
              className="text-[#1A3A1A]"
              onClick={handleAddAward}
            >
              + Add Award
            </Button>
          </div>

          <div className="space-y-3">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A3A1A]/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#1A3A1A]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-gray-900">{award.title}</h3>
                    <p className="text-sm text-gray-600">{award.issuer}</p>
                    <p className="text-sm text-gray-500">{award.date}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEditAward(award)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A]"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteAward(award.id)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ADD SKILL ===== */}
      <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
        <DialogContent className="max-w-[340px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitSkill}>
            <div className="space-y-4 py-4">
              <Label>Skill Name</Label>
              <Input
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                required
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSkillDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90">
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ===== ADD / EDIT AWARD ===== */}
      <Dialog open={isAwardDialogOpen} onOpenChange={setIsAwardDialogOpen}>
        <DialogContent className="max-w-[340px] rounded-xl">
          <DialogHeader>
            <DialogTitle>
              {editingAward ? "Edit Award" : "Add Award"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitAward}>
            <div className="space-y-4 py-4">
              <Label>Award Title</Label>
              <Input
                value={awardFormData.title}
                onChange={(e) =>
                  setAwardFormData({
                    ...awardFormData,
                    title: e.target.value,
                  })
                }
                required
              />

              <Label>Date</Label>
              <Input
                type="date"
                value={awardFormData.date}
                onChange={(e) =>
                  setAwardFormData({
                    ...awardFormData,
                    date: e.target.value,
                  })
                }
                required
              />

              <Label>Issued By</Label>
              <Input
                value={awardFormData.issuer}
                onChange={(e) =>
                  setAwardFormData({
                    ...awardFormData,
                    issuer: e.target.value,
                  })
                }
                required
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAwardDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90">
                {editingAward ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ===== DELETE CONFIRM ===== */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteTarget?.type}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteTarget?.type}? This
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
