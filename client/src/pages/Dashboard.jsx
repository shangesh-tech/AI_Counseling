import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Target,
  Mic,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Users,
  Award,
  Calendar,
  BarChart3
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Load user data from onboarding
    const data = localStorage.getItem('onboardingData')
    if (data) {
      setUserData(JSON.parse(data))
    }

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const quickActions = [
    {
      title: "Explore Careers",
      description: "Discover trending jobs in your field",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      path: "/jobs",
      badge: "Hot"
    },
    {
      title: "Check Eligibility",
      description: "See which courses you qualify for",
      icon: Target,
      color: "from-indigo-500 to-purple-600",
      path: "/eligibility",
      badge: "New"
    },
    {
      title: "Find Universities",
      description: "Get personalized recommendations",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-600",
      path: "/universities",
      badge: null
    },
    {
      title: "Learning Roadmap",
      description: "Get your personalized study plan",
      icon: BookOpen,
      color: "from-pink-500 to-red-600",
      path: "/roadmap",
      badge: null
    }
  ]

  const recentActivities = [
    {
      title: "Completed Career Assessment",
      description: "Identified top 5 career matches",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Explored Computer Science Programs",
      description: "Viewed 12 universities",
      time: "1 day ago",
      icon: GraduationCap,
      color: "text-blue-500"
    },
    {
      title: "Updated Skills Profile",
      description: "Added 3 new skills",
      time: "2 days ago",
      icon: Star,
      color: "text-amber-500"
    }
  ]

  const stats = [
    {
      label: "Career Matches",
      value: "8",
      change: "+2 this week",
      icon: Target,
      color: "text-blue-500"
    },
    {
      label: "Universities Explored",
      value: "24",
      change: "+6 this week",
      icon: GraduationCap,
      color: "text-indigo-500"
    },
    {
      label: "Skills Assessed",
      value: userData?.skills?.length || "0",
      change: "Complete profile",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      label: "Progress Score",
      value: "85%",
      change: "+15% this month",
      icon: BarChart3,
      color: "text-green-500"
    }
  ]

  const upcomingTasks = [
    {
      title: "Complete SAT Practice Test",
      dueDate: "Tomorrow",
      priority: "High",
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Research MIT Requirements",
      dueDate: "This Week",
      priority: "Medium",
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Update Portfolio",
      dueDate: "Next Week",
      priority: "Low",
      color: "bg-green-100 text-green-700"
    }
  ]

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">AI Counselor</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/ai-chat')}
                className="flex items-center px-4 py-2 border border-indigo-200 hover:border-indigo-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Mic className="w-4 h-4 mr-2" />
                AI Assistant
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userData?.name?.charAt(0) || 'U'}
                </span>
              </div>
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
                Ready to continue your journey? Here's what's happening today.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-4 border-0">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Profile Strength</p>
                    <p className="text-sm opacity-90">85% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border h-full">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-indigo-500" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="cursor-pointer hover:shadow-md transition-all border-0 bg-gradient-to-br from-white to-slate-50 rounded-lg border p-6"
                        onClick={() => navigate(action.path)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          {action.badge && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              {action.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {action.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          {action.description}
                        </p>
                        <button className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activity.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                  Upcoming Tasks
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          Due: {task.dueDate}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.color}`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant CTA */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg border-0">
              <div className="p-6 text-center">
                <Mic className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Chat with our AI counselor for instant guidance
                </p>
                <button
                  onClick={() => navigate('/ai-chat')}
                  className="px-4 py-2 bg-white text-indigo-600 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
