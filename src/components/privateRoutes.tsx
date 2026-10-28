import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextMemoria'

function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute