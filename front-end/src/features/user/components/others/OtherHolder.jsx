import React from "react";
import { MembershipSection } from "./membership/MembershipSection";
import { ScholarshipSection } from "./shcolarship/ScholarshipSection";
import { PublicationSection } from "./publication/PublicationSection";

const OtherHolder = () => {
  return (
    <div>
      <PublicationSection />
      <MembershipSection />
      <ScholarshipSection />
    </div>
  );
};

export default OtherHolder;
