import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import FamilyTab from "../components/FamilyTab"
import EducationTab from "../components/EducationTab"
import PersonalTab from "../components/PersonalTab"
import EligibilityTab from "../components/EligibilityTab"
import PublicationTab from "../components/PublicationTab"
import InvolvementTab from "../components/InvolvementTab"
import TrainingsTab from "../components/TrainingsTab"
import MembershipTab from "../components/MembershipTab"
import ScholarshipTab from "../components/ScholarshipTab"
import RecognitionTab from "../components/RecognitionTab"
import ResearchInnovationTab from "../components/ResearchInnovationTab"
import SkillsTab from "../components/SkillsTab"

const EmployeeEdit = () => {
  const { employee_id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const employeeName = location.state?.employeeName || ""


  return (
    <div className="space-y-4 bg-[#F7F9F7] p-6">
      <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">
        CSC Form 212 - {employeeName}
      </h1>
      <Button variant="outline" onClick={() => navigate(`/employees/${employee_id}`)}>
        ← Back to Overview
      </Button>

      <Card>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="mb-4 flex w-full overflow-x-auto ">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="involvement">Involvement</TabsTrigger>
              <TabsTrigger value="trainings">Trainings</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="publication">Publication</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="scholarship">Scholarship</TabsTrigger>
              <TabsTrigger value="recognition">Recognition</TabsTrigger>
              <TabsTrigger value="research_innovation">Research & Innovation</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
         <TabsContent value="personal">
          <PersonalTab employeeId = {employee_id}/>

        </TabsContent>

         {/* Family Information Tab */}
         <TabsContent value="family">
  <FamilyTab employeeId={employee_id} />
</TabsContent>

         {/* Education Information Tab */}
         <TabsContent value="education">
           <EducationTab employeeId={employee_id} />
         </TabsContent>


        <TabsContent value="eligibility">
            <EligibilityTab employeeId={employee_id} />
          </TabsContent>
    
    <TabsContent value="publication">
            <PublicationTab employeeId={employee_id} />
          </TabsContent>

          <TabsContent value="involvement">
            <InvolvementTab employeeId={employee_id} />
          </TabsContent>

          <TabsContent value="trainings">
            <TrainingsTab employeeId={employee_id} />
          </TabsContent>

         

          <TabsContent value="membership">
            <MembershipTab employeeId={employee_id} />
          </TabsContent>

          <TabsContent value="scholarship">
            <ScholarshipTab employeeId={employee_id} />
          </TabsContent>

          <TabsContent value="recognition">
            <RecognitionTab employeeId={employee_id} />
          </TabsContent>

            <TabsContent value="recognition">
              <RecognitionTab employeeId={employee_id} />
            </TabsContent>

            <TabsContent value="research_innovation">
              <ResearchInnovationTab employeeId={employee_id} />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsTab employeeId={employee_id} />
            </TabsContent>

          </Tabs>
          
        </CardContent>

     
        
      </Card>
    </div>
  )
}

export default EmployeeEdit
