import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/features/auth/components/AuthContext'
import axiosInstance from '@/api/axiosInstance'
import { useEffect, useState } from 'react'

const HeaderUser = () => {
  const { user } = useAuth() // Get employee_id from context
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `/employee/personal_info/${user.employee_id}`
        )
        setUserData(response.data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    if (user?.employee_id) {
      fetchUserData()
    }
  }, [user?.employee_id])

 

  // Get initials for avatar
  const getInitials = () => {
    if (!userData?.f_name) return 'U'
    const first = userData.f_name?.[0] || ''
    const last = userData.l_name?.[0] || ''
    return (first + last).toUpperCase()
  }

  return (
    <div>
      <Card className="shadow-lg border-0 bg-[#1A3A1A] rounded-none rounded-b-2xl">
        <CardContent className="px-4 md:px-6 md:py-2">
          <div className="flex sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold text-[#ffffff]">
                Welcome back, {userData?.f_name}
              </h2>
              <p className='text-sm text-white'>{userData?.employer_id || user.employee_id}</p>
              <p className="text-sm md:text-base text-white">
                {userData?.position || 'Employee'} • {userData?.department || 'Department'}
              </p>
            </div>
    
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarFallback className="bg-[#7CB342] text-[#1A3A1A] text-base md:text-lg">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

          </div>
        </CardContent>
      </Card>
    </div>
  )
} 

export default HeaderUser
