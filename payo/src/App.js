
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/pages/main/Home";

import ClientDashboard from "./components/pages/client/Dashboard";
import Expenses from "./components/pages/client/Expenses";
import Groups from "./components/pages/client/Groups";
import Activity from "./components/pages/client/Activity";
import AddExpense from "./components/pages/client/AddExpense";
import CreateGroup from "./components/pages/client/CreateGroup";

import AdminDashboard from "./components/pages/admin/Dashboard";
import UsersPage from "./components/pages/admin/Users";
import AdminExpenses from "./components/pages/admin/Expenses";
import ActivityAdmin from "./components/pages/admin/Activity";
import Analytics from "./components/pages/admin/Analytics";
import AddUser from "./components/pages/admin/AddUser";

import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import ProtectedRoute from "./components/pages/auth/ProtectedRoute";
import PublicRoute from "./components/pages/auth/PublicRoute";

import Settings from "./components/pages/shared/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public homepage */}
        <Route path="/" element={<Home />} />

        {/* Logged-out users only */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Client-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route
            path="/dashboard"
            element={<ClientDashboard />}
          />

          <Route
            path="/dashboard/expenses"
            element={<Expenses />}
          />

          <Route
            path="/dashboard/expenses/new"
            element={<AddExpense />}
          />

          <Route
            path="/dashboard/groups"
            element={<Groups />}
          />

          <Route
            path="/dashboard/groups/new"
            element={<CreateGroup />}
          />

          <Route
            path="/dashboard/activity"
            element={<Activity />}
          />

          <Route
            path="/dashboard/settings"
            element={<Settings />}
          />
        </Route>

        {/* Admin-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<UsersPage />}
          />

          <Route
            path="/admin/users/new"
            element={<AddUser />}
          />

          <Route
            path="/admin/expenses"
            element={<AdminExpenses />}
          />

          <Route
            path="/admin/activity"
            element={<ActivityAdmin />}
          />

          <Route
            path="/admin/analytics"
            element={<Analytics />}
          />

          <Route
            path="/admin/settings"
            element={<Settings />}
          />
        </Route>

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
