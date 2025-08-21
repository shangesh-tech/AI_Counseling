import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  GraduationCap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  Mic,
  CheckCircle
} from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Guidance",
      description: "Get personalized recommendations based on your unique profile and interests"
    },
    {
      icon: TrendingUp,
      title: "Future Job Trends",
      description: "Discover emerging careers and high-growth opportunities in your field"
    },
    {
      icon: GraduationCap,
      title: "University Matching",
      description: "Find the perfect universities and courses that align with your goals"
    },
    {
      icon: BookOpen,
      title: "Learning Roadmaps",
      description: "Get detailed study plans with curated resources and timelines"
    },
    {
      icon: Target,
      title: "Eligibility Checker",
      description: "Check your eligibility for courses based on 12th marks, SAT, and JEE"
    },
    {
      icon: Mic,
      title: "Voice AI Assistant",
      description: "Chat with our AI counselor using voice for instant guidance"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Students Guided" },
    { number: "500+", label: "Universities" },
    { number: "1,000+", label: "Career Paths" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">AI Counselor</span>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Signup Button */}
              <button
                onClick={() => navigate('/signup')}
                className="px-5 py-2 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg transition-colors"
              >
                Sign Up
              </button>
              {/* Get Started Button */}
              <button
                onClick={() => navigate('/login')}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Career Guidance
              </span>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Your Future Starts with the{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Right Choice</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Discover your perfect career path with AI-powered guidance. Get personalized
                university recommendations, eligibility checks, and learning roadmaps tailored
                just for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/onboarding')}
                  className="flex items-center justify-center px-8 py-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-lg font-medium rounded-lg transition-colors"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                <button
                  onClick={() => navigate('/jobs')}
                  className="flex items-center justify-center px-8 py-6 border-2 border-indigo-200 hover:border-indigo-300 text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Explore Careers
                </button>
              </div>
              
              <div className="flex items-center mt-8 space-x-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-indigo-600">{stat.number}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="p-8 backdrop-blur-md bg-white/80 border-0 rounded-lg shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">AI Career Assistant</h3>
                      <p className="text-sm text-slate-500">Online now</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-700">
                        "Based on your interests in technology and problem-solving,
                        I recommend exploring Computer Science programs at top universities."
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-600">Analyzing your profile...</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-600">Finding matching universities...</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-slate-600">Creating your roadmap...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Powerful Features
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Your{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Career Journey</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and guidance you need
              to make informed decisions about your future.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Shape Your Future?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of students who have found their perfect career path with our AI guidance.
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="flex items-center justify-center px-8 py-6 bg-white text-indigo-600 hover:bg-gray-50 text-lg font-medium rounded-lg transition-colors mx-auto"
            >
              Start Your Journey Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Counselor</span>
            </div>
            <p className="text-slate-400 text-center md:text-right">
              © 2024 AI Counselor. Empowering students to make informed career decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage