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
          <div><ServiceRecordsScreen /></div>
        )}

        {currentScreen === "educational-background" && (
          <div>
            {" "}
            <EducationScreen />{" "}
          </div>
        )}
       
        {currentScreen === "skills-recognitions" && (
          <div>
            <SkillScreen />
          </div>
        )}

        {currentScreen === "research-publication" && (
          <div>
            <ResearchScreen/>
            <PublicationSection/>
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
