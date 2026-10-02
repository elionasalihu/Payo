import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/main/Home";
import ClientDashboard from "./components/pages/client/Dashboard";
import AdminDashboard from "./components/pages/admin/Dashboard";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Expenses from "./components/pages/client/Expenses";
import UsersPage from "./components/pages/admin/Users";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;