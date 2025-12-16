import React from "react";
import { MembershipSection } from "./membership/MembershipSection";
import { ScholarshipSection } from "./shcolarship/ScholarshipSection";
import InvolvementScreen from "../involvement/InvolvementScreen";

const OtherHolder = () => {
  return (
    <div className="space-y-3">
      
      <InvolvementScreen />
      <MembershipSection />
      <ScholarshipSection />
    </div>
  );
};

export default OtherHolder;
