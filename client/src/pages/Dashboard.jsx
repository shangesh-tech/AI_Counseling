import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Brain,
  Download,
  MessageCircle,
  Trash2,
} from 'lucide-react';
import OnboardingFlow from './OnboardingFlow';

// ChatModal Component
const ChatModal = ({ selectedReport, onClose }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatContainerRef = useRef(null);

const sendChatMessage = async () => {
  if (!chatInput.trim() || !selectedReport?.id) return;

  const newMessage = { role: 'user', content: chatInput };
  setChatMessages(prev => [...prev, newMessage]);
  const currentMessage = chatInput;
  setChatInput('');

  try {
    const token = localStorage.getItem('token');
    console.log('Sending chat request with reportId:', selectedReport.id);
    
    const response = await axios.post('http://localhost:5000/chat', 
      {
        reportId: selectedReport.id,
        message: currentMessage
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const aiMessage = { role: 'assistant', content: response.data.reply };
    setChatMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    console.error('Error sending chat message:', error);
    let errorMessage = 'Sorry, an error occurred while processing your request.';
    
    if (error.response?.status === 400) {
      errorMessage = error.response.data?.error || 'Invalid request. Please try again.';
    } else if (error.response?.status === 404) {
      errorMessage = 'Report not found. Please try refreshing the page.';
    }
    
    setChatMessages(prev => [...prev, { 
      role: 'assistant', 
      content: errorMessage
    }]);
  }

  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Chat about {selectedReport?.fileName || 'Report'}
      </h2>
      <div
        ref={chatContainerRef}
        className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
      >
        {chatMessages.length === 0 ? (
          <div className="text-gray-500 text-center">
            Ask me anything about your career report!
          </div>
        ) : (
          chatMessages.map((message, index) => (
            <div
              key={index}
              className={`p-3 mb-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-100 text-right ml-8' 
                  : 'bg-gray-200 text-left mr-8'
              }`}
            >
              <div className={`text-xs mb-1 ${
                message.role === 'user' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {message.role === 'user' ? 'You' : 'AI Assistant'}
              </div>
              {message.content}
            </div>
          ))
        )}
      </div>
      <textarea
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask me about your career report, job recommendations, skills development..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={3}
      />
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
        <button
          onClick={sendChatMessage}
          disabled={!chatInput.trim()}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userReports, setUserReports] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Add useEffect to monitor userReports changes
  useEffect(() => {
    if (userReports.length > 0) {
      console.log('userReports state updated with:', userReports.length, 'reports');
      console.log('Reports data:', userReports);
    }
  }, [userReports]);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }

    // Fetch reports
    fetchReports();

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        navigate('/login');
        return;
      }

      const { data } = await axios.get('http://localhost:5000/reports', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Fetched reports from API:', data.reports);
      
      // Set the reports data (this is asynchronous)
      setUserReports(data.reports || []);
      
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError('Failed to fetch reports');
      }
      console.error('Error fetching reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!reportId || !window.confirm('Are you sure you want to delete this report?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh reports list after deletion
      fetchReports();
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to delete report');
      }
      console.error('Error deleting report:', err);
    }
  };

  const downloadReport = (reportUrl, fileName) => {
    if (!reportUrl) {
      setError('Report file not available');
      return;
    }

    const fullUrl = reportUrl.startsWith('http') 
      ? reportUrl 
      : `http://localhost:5000/${reportUrl}`;
      
    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = fileName || 'career-report.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Open Chat Modal
  const openChat = (report) => {
    if (!report?.id) { // Changed from _id to id
      setError('Cannot open chat for this report');
      return;
    }
    setSelectedReport(report);
    setIsChatOpen(true);
  };

  // Handle onboarding completion
  const generateReport = (data) => {
    console.log('Onboarding completed:', data);
    setIsOnboardingOpen(false);
    
    if (data.success) {
      // Report was generated successfully, refresh the reports list
      fetchReports();
    } else {
      // Handle error case
      setError(data.error || 'Failed to generate report');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Career Counselor
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
              >
                Create New Report
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {getGreeting()}, {userData?.name || 'Student'}! 👋
              </h1>
              <p className="text-slate-600">
                Ready to continue your journey? Here are your career reports.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-slate-500">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6"
          >
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-4 text-red-800 hover:text-red-900"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Reports Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <p className="ml-4 text-slate-600">Loading your reports...</p>
          </div>
        ) : userReports?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Brain className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No Reports Yet
            </h3>
            <p className="text-slate-600 mb-6">
              Create your first career report to get personalized recommendations.
            </p>
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Create Your First Report
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userReports.map((report, index) => (
              <motion.div
                key={report.id || `report-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Report #{report.id?.slice(-4) ?? 'N/A'} {/* Changed from _id to id */}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    report.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : report.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status || 'Unknown'}
                  </span>
                </div>
                
                {/* Report Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div>
                    <span className="font-medium">Student:</span> {report.studentName || 'Unknown'}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {
                      report.createdAt 
                        ? new Date(report.createdAt).toLocaleDateString() 
                        : 'Unknown'
                    }
                  </div>
                  {report.fileSize && (
                    <div>
                      <span className="font-medium">Size:</span> {formatFileSize(report.fileSize)}
                    </div>
                  )}
                  {report.interests?.length > 0 && (
                    <div>
                      <span className="font-medium">Interests:</span> {
                        report.interests.slice(0, 2).join(', ')
                      }
                      {report.interests.length > 2 && '...'}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => openChat(report)}
                    disabled={!report.id || report.status !== 'completed'}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Chat about this report"
                  >
                    <MessageCircle size={16} />
                    Chat
                  </button>
                  
                  <button
                    onClick={() => downloadReport(report.pdfUrl, report.fileName)}
                    disabled={!report.pdfUrl || report.status !== 'completed'}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download report PDF"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  
                  <button
                    onClick={() => handleDeleteReport(report.id)} 
                    disabled={!report.id}
                    className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete report"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {isOnboardingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden"
            >
              <OnboardingFlow 
                onComplete={generateReport} 
                onClose={() => setIsOnboardingOpen(false)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <ChatModal
                selectedReport={selectedReport}
                onClose={() => {
                  setIsChatOpen(false);
                  setSelectedReport(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
