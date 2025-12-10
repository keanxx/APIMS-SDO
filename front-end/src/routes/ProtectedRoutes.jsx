import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/components/AuthContext'

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user, loading } = useAuth() // ✅ Use context
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div> // Show loading while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'user') {
      return <Navigate to="/user/dashboard" replace />
    } else {
      return <Navigate to="/dashboard" replace />
    }
  }

  return <Outlet />
}

export default ProtectedRoutes
