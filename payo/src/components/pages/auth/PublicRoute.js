
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function PublicRoute() {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div>Checking your account...</div>;
  }

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "user") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h2>Unable to identify your account role</h2>
      <p>
        Your account is signed in, but no valid role was found.
        Please check your user_roles table in Supabase.
      </p>
    </div>
  );
}

export default PublicRoute;
