import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/main/Home";
import ClientDashboard from "./components/pages/client/Dashboard";
import AdminDashboard from "./components/pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;