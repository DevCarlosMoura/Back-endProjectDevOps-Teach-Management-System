import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  return authService.isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
}
