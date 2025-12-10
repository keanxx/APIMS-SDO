import React from 'react'
import { SkillSection } from './skills/SkillSection'
import { MembershipSection } from './membership/MembershipSection'
import { RecognitionSection } from './recognition/RecognitionSection'
import { ScholarshipSection } from './shcolarship/ScholarshipSection'
import { PublicationSection } from './publication/PublicationSection'

const OtherHolder = () => {
  return (
    <div>

        <SkillSection/>
        <RecognitionSection/>
        <PublicationSection/>
        <MembershipSection/>
        <ScholarshipSection/>
    </div>
  )
}

export default OtherHolder