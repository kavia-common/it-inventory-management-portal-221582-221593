import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./state/auth/AuthContext";
import { InventoryProvider } from "./state/inventory/InventoryContext";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Toast from "./components/common/Toast";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Islands from "./pages/Islands";
import HomeMaterials from "./pages/HomeMaterials";
import Cabinets from "./pages/Cabinets";
import Movements from "./pages/Movements";
import Procedures from "./pages/Procedures";
import Alerts from "./pages/Alerts";
import Metrics from "./pages/Metrics";
import AdminUsers from "./pages/AdminUsers";
import QuickContacts from "./pages/QuickContacts";
import NotFound from "./pages/NotFound";

// PUBLIC_INTERFACE
function App() {
  /** Root application renders the layout and registers routes. */
  return (
    <AuthProvider>
      <InventoryProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Sidebar />
            <Navbar />
            <main className="app-content">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "viewer", "technician"]}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "viewer", "technician"]}>
                      <Inventory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/islands"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "viewer", "technician"]}>
                      <Islands />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homematerials"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "viewer", "technician"]}>
                      <HomeMaterials />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cabinets"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "technician"]}>
                      <Cabinets />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/movements"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "technician"]}>
                      <Movements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/procedures"
                  element={
                    <ProtectedRoute roles={["admin", "manager"]}>
                      <Procedures />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/alerts"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "viewer", "technician"]}>
                      <Alerts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/metrics"
                  element={
                    <ProtectedRoute roles={["admin", "manager"]}>
                      <Metrics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute roles={["admin"]}>
                      <AdminUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quick-contacts"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "viewer", "technician"]}>
                      <QuickContacts />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toast />
          </div>
        </BrowserRouter>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
