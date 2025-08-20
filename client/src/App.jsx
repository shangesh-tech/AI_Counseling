import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import LandingPage from './pages/LandingPage'
import OnboardingFlow from './pages/OnboardingFlow'
import Dashboard from './pages/Dashboard'
import JobExplorer from './pages/JobExplorer'
import EligibilityChecker from './pages/EligibilityChecker'
import UniversitySelector from './pages/UniversitySelector'
import LearningRoadmap from './pages/LearningRoadmap'
import AIVoiceChat from './pages/AIVoiceChat'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
 return (
   <Router>
     <div className="min-h-screen bg-background">
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/" element={<LandingPage />} />
         <Route path="/onboarding" element={<OnboardingFlow />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/jobs" element={<JobExplorer />} />
         <Route path="/eligibility" element={<EligibilityChecker />} />
         <Route path="/universities" element={<UniversitySelector />} />
         <Route path="/roadmap" element={<LearningRoadmap />} />
         <Route path="/ai-chat" element={<AIVoiceChat />} />
       </Routes>
       <Toaster position="top-right" />
     </div>
   </Router>
 )
}


export default App
