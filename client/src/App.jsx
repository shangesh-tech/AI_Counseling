import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}


export default App
