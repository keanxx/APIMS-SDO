import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useRef, useEffect } from "react"
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
  const tabsListRef = useRef(null);

  useEffect(() => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="space-y-4 bg-[#F7F9F7] p-6">
      <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">
        CSC Form 212 - {employeeName}
      </h1>
      <Button variant="outline" onClick={() => navigate(`/employees/${employee_id}`)}>
        ← Back to Overview
      </Button>

      <Card>
        <CardContent className="pb-4">
          <Tabs defaultValue="personal">
            <div className="w-full overflow-x-auto">
              <TabsList
                ref={tabsListRef}
                className="inline-flex whitespace-nowrap scroll-smooth w-full min-w-max md:h-[50px] h-[40px] mb-4"
              >
                <TabsTrigger
                  value="personal"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="family"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Family
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="involvement"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Involvement
                </TabsTrigger>
                <TabsTrigger
                  value="trainings"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Trainings
                </TabsTrigger>
                <TabsTrigger
                  value="eligibility"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Eligibility
                </TabsTrigger>
                <TabsTrigger
                  value="publication"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Publication
                </TabsTrigger>
                <TabsTrigger
                  value="membership"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Membership
                </TabsTrigger>
                <TabsTrigger
                  value="scholarship"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Scholarship
                </TabsTrigger>
                <TabsTrigger
                  value="recognition"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Recognition
                </TabsTrigger>
                <TabsTrigger
                  value="research_innovation"
                  className="flex-shrink-0 min-w-[140px] py-4 px-4"
                >
                  Research & Innovation
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex-shrink-0 min-w-[120px] py-4 px-4"
                >
                  Skills
                </TabsTrigger>
              </TabsList>
            </div>

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
