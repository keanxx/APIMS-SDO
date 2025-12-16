import React, { useState } from "react";
import ScreenNav from "../components/profile/ScreenNav";
import { TrainingScreen } from "../components/others/trainings/TrainingScreen";
import { EducationScreen } from "../components/education/EducationScreen";
import { SkillScreen } from "../components/skills/SkillScreen";
import OtherHolder from "../components/others/OtherHolder";
import { ServiceRecordsScreen } from "../components/service_records/ServiceRecordsScreen";
import FamilyScreen from "../components/family/FamilyScreen";
import { ResearchScreen } from "../components/research/ResearchScreen";
import { PublicationSection } from "../components/others/publication/PublicationSection";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const [currentScreen, setCurrentScreen] = useState("family");

  return (
    <div>
      {/* Navigation */}
      <ScreenNav
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />

      {/* Content */}
      <div className="p-6">
        {currentScreen === "family" && (
          <div>
            <FamilyScreen />
          </div>
        )}

        {currentScreen === "trainings" && (
          <div>
            <TrainingScreen />
          </div>
        )}
        {currentScreen === "service-records" && (
          <div>
            <ServiceRecordsScreen />
          </div>
        )}

        {currentScreen === "educational-background" && (
          <div>
            <EducationScreen />
          </div>
        )}

        {currentScreen === "skills-recognitions" && (
          <div>
            <SkillScreen />
          </div>
        )}

        {currentScreen === "research-publication" && (
          <div>
            <ResearchScreen />
            <PublicationSection />
          </div>
        )}
        {currentScreen === "other-information" && (
          <div>
            <OtherHolder />
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Skeleton Component for Profile Sections
export const ProfileSectionSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Table Skeleton for data tables
export const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="p-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="grid grid-cols-4 gap-4 items-center">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2 justify-end">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Compact Card Skeleton
export const CompactCardSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-3 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
