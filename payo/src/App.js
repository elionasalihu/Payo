import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ActivityAdmin from "./components/pages/admin/Activity"
import Analytics from "./components/pages/admin/Analytics";
import Settings from "./components/pages/shared/Setting";
import AddUser from "./components/pages/admin/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/expenses" element={<Expenses />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/dashboard/groups" element={<Groups />} />
        <Route path="/admin/expenses" element={<AdminExpenses />} />
        <Route path="/dashboard/activity" element={<Activity />} />
        <Route path="/admin/activity" element={<ActivityAdmin />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/users/new" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;