import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import DocumentUpload from "./pages/DocumentUpload"
import SummaryGeneration from "./pages/SummaryGenerator"
import RiskAnalysis from "./pages/RiskAnalysis"
import Profile from "./pages/Profile"
import Navbar from "./components/layout/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <DocumentUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summary/:documentId"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <SummaryGeneration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis/:documentId"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RiskAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

