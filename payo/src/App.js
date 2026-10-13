
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/pages/main/Home";
import ClientDashboard from "./components/pages/client/Dashboard";
import AdminDashboard from "./components/pages/admin/Dashboard";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Expenses from "./components/pages/client/Expenses";
import UsersPage from "./components/pages/admin/Users";
import Groups from "./components/pages/client/Groups";
import AdminExpenses from "./components/pages/admin/Expenses";
import Activity from "./components/pages/client/Activity";
import ActivityAdmin from "./components/pages/admin/Activity";
import Analytics from "./components/pages/admin/Analytics";
import Settings from "./components/pages/shared/Setting";
import AddUser from "./components/pages/admin/AddUser";
import AddExpense from "./components/pages/client/AddExpense";
import CreateGroup from "./components/pages/client/CreateGroup";

import ProtectedRoute from "./components/pages/auth/ProtectedRoute";
import PublicRoute from "./components/pages/auth/PublicRoute";

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

        {/* All authenticated users */}
        <Route element={<ProtectedRoute />}>
          {/* Client pages */}
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

          {/* Admin pages — authentication only for now */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/users/new" element={<AddUser />} />
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
