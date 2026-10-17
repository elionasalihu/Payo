
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const {
    user,
    role,
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (role === "user") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
