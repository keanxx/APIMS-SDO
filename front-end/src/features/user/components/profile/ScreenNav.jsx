import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * @typedef {Object} ScreenNavProps
 * @property {string} currentScreen
 * @property {(screen: string) => void} onScreenChange
 */

/**
 * @param {ScreenNavProps} props
 */
export function ScreenNav({ currentScreen, onScreenChange }) {
  const screens = [
    { id: "family", name: "Family Background" },
    { id: "trainings", name: "Training & Seminars" },
    { id: "service-records", name: "Service Record" },
    { id: "educational-background", name: "Education" },
    { id: "skills-recognitions", name: "Skills & Awards" },
    { id: "research-publication", name: "Research & Publication" },
    { id: "other-information", name: "Other Information" },
  ];

  const currentScreenName =
    screens.find((s) => s.id === currentScreen)?.name || "Select Screen";

  return (
    <div className="bg-[#1A3A1A] px-4 py-4">
      <label htmlFor="screen-select" className="sr-only">
        Select Screen
      </label>
      <div className="relative">
        <select
          id="screen-select"
          value={currentScreen}
          onChange={(e) => onScreenChange(e.target.value)}
          className="w-full bg-white/10 text-white px-4 py-3 pr-10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          {screens.map((screen) => (
            <option key={screen.id} value={screen.id} className="text-gray-900">
              {screen.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
      </div>
    </div>
  );
}
export default ScreenNav;
