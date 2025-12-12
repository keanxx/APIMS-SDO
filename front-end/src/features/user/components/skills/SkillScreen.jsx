import React, { useState, useEffect } from "react";
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
import { RecognitionSection } from "../others/recognition/RecognitionSection";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { SkillSection } from "./SkillSection";

export function SkillScreen() {
  return (
    <>
      <div className="pb-8">
        <SkillSection />
      </div>

      <div>
        <RecognitionSection />
      </div>
    </>
  );
}
