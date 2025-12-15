import React, { useState } from "react";
import ScreenNav from "../components/profile/ScreenNav";
import { TrainingScreen } from "../components/trainings/TrainingScreen";
import { EducationScreen } from "../components/education/EducationScreen";
import { SkillScreen } from "../components/skills/SkillScreen";
import OtherHolder from "../components/others/OtherHolder";
import { ServiceRecordsScreen } from "../components/service_records/ServiceRecordsScreen";
import FamilyScreen from "../components/family/FamilyScreen";

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
        {currentScreen === "work-experience" && (
          <div>Work Experience Content</div>
        )}
        {currentScreen === "voluntary-work" && (
          <div>Voluntary Work Content</div>
        )}
        {currentScreen === "skills-recognitions" && (
          <div>
            <SkillScreen />
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
