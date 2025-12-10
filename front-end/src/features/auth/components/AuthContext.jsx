import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem('access_token')
    const employeeId = localStorage.getItem('employee_id')
    const role = localStorage.getItem('hr_role')

    console.log('🔍 Token check:', { token: !!token, employeeId, role })

    if (!token || !employeeId) {
      console.log('❌ Missing credentials')
      setLoading(false)
      return
    }

    // ✅ Just set user from localStorage, no API call needed
    setUser({ employee_id: employeeId, role })
    setLoading(false)
  }

  loadUser()
}, [])


  // ✅ Add login function
  const login = (token, role, employeeId, userData) => {
    localStorage.setItem('access_token', token)
    localStorage.setItem('hr_role', role)
    localStorage.setItem('employee_id', employeeId)
    setUser({ ...userData, role })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('hr_role')
    localStorage.removeItem('employee_id')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
