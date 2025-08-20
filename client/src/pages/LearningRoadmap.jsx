import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  ArrowLeft,
  CheckCircle,
  Clock,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Star,
  Calendar,
  Target,
  Award,
  Users,
  Play,
  Download,
  Bookmark
} from 'lucide-react'

const LearningRoadmap = () => {
  const navigate = useNavigate()
  const [selectedPath, setSelectedPath] = useState('computer-science')
  const [completedSteps, setCompletedSteps] = useState(['cs-1', 'cs-2'])

  const learningPaths = [
    {
      id: 'computer-science',
      title: 'Computer Science & AI',
      description: 'Complete roadmap for Computer Science with AI specialization',
      duration: '4 years',
      difficulty: 'Advanced',
      color: 'from-blue-500 to-indigo-600',
      icon: '💻',
      popularity: '95%'
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      description: 'Master data analysis, machine learning, and statistics',
      duration: '3 years',
      difficulty: 'Intermediate',
      color: 'from-green-500 to-emerald-600',
      icon: '📊',
      popularity: '88%'
    },
    {
      id: 'medicine',
      title: 'Medicine & Healthcare',
      description: 'Pre-med preparation and medical school pathway',
      duration: '8 years',
      difficulty: 'Expert',
      color: 'from-red-500 to-pink-600',
      icon: '🏥',
      popularity: '92%'
    },
    {
      id: 'business',
      title: 'Business & Entrepreneurship',
      description: 'Business fundamentals and startup ecosystem',
      duration: '4 years',
      difficulty: 'Intermediate',
      color: 'from-amber-500 to-orange-600',
      icon: '💼',
      popularity: '85%'
    }
  ]

  const roadmapData = {
    'computer-science': {
      phases: [
        {
          id: 'foundation',
          title: 'Foundation Phase',
          duration: '6 months',
          description: 'Build strong programming and mathematical foundations',
          progress: 80,
          steps: [
            {
              id: 'cs-1',
              title: 'Programming Fundamentals',
              description: 'Learn Python, basic algorithms, and problem-solving',
              duration: '2 months',
              type: 'course',
              difficulty: 'Beginner',
              resources: [
                { type: 'video', title: 'Python for Beginners', platform: 'YouTube', free: true, rating: 4.8 },
                { type: 'course', title: 'CS50 Introduction to Computer Science', platform: 'edX', free: true, rating: 4.9 },
                { type: 'book', title: 'Automate the Boring Stuff with Python', platform: 'Online', free: true, rating: 4.7 }
              ],
              skills: ['Python', 'Problem Solving', 'Basic Algorithms']
            },
            {
              id: 'cs-2',
              title: 'Mathematics for CS',
              description: 'Discrete mathematics, linear algebra, and statistics',
              duration: '2 months',
              type: 'course',
              difficulty: 'Intermediate',
              resources: [
                { type: 'course', title: 'Mathematics for Computer Science', platform: 'MIT OCW', free: true, rating: 4.6 },
                { type: 'course', title: 'Linear Algebra', platform: 'Khan Academy', free: true, rating: 4.8 },
                { type: 'book', title: 'Discrete Mathematics and Its Applications', platform: 'Library', free: false, rating: 4.5 }
              ],
              skills: ['Discrete Math', 'Linear Algebra', 'Statistics']
            },
            {
              id: 'cs-3',
              title: 'Data Structures & Algorithms',
              description: 'Master fundamental data structures and algorithms',
              duration: '2 months',
              type: 'course',
              difficulty: 'Intermediate',
              resources: [
                { type: 'course', title: 'Algorithms Specialization', platform: 'Coursera', free: false, rating: 4.7 },
                { type: 'practice', title: 'LeetCode Problems', platform: 'LeetCode', free: true, rating: 4.6 },
                { type: 'book', title: 'Introduction to Algorithms (CLRS)', platform: 'Library', free: false, rating: 4.8 }
              ],
              skills: ['Data Structures', 'Algorithms', 'Problem Solving']
            }
          ]
        },
        {
          id: 'intermediate',
          title: 'Intermediate Phase',
          duration: '12 months',
          description: 'Dive deeper into computer science concepts and specializations',
          progress: 45,
          steps: [
            {
              id: 'cs-4',
              title: 'Object-Oriented Programming',
              description: 'Learn OOP concepts with Java or C++',
              duration: '3 months',
              type: 'course',
              difficulty: 'Intermediate',
              resources: [
                { type: 'course', title: 'Java Programming', platform: 'Coursera', free: false, rating: 4.6 },
                { type: 'course', title: 'Object-Oriented Programming in C++', platform: 'edX', free: true, rating: 4.5 },
                { type: 'project', title: 'Build a Simple Game', platform: 'GitHub', free: true, rating: 4.7 }
              ],
              skills: ['Java', 'C++', 'OOP Principles', 'Design Patterns']
            },
            {
              id: 'cs-5',
              title: 'Database Systems',
              description: 'Relational databases, SQL, and database design',
              duration: '2 months',
              type: 'course',
              difficulty: 'Intermediate',
              resources: [
                { type: 'course', title: 'Database Systems', platform: 'Stanford Online', free: true, rating: 4.7 },
                { type: 'practice', title: 'SQL Practice', platform: 'HackerRank', free: true, rating: 4.5 },
                { type: 'project', title: 'Design a Database Schema', platform: 'Self-guided', free: true, rating: 4.6 }
              ],
              skills: ['SQL', 'Database Design', 'Normalization', 'DBMS']
            },
            {
              id: 'cs-6',
              title: 'Web Development',
              description: 'Full-stack web development with modern frameworks',
              duration: '4 months',
              type: 'project',
              difficulty: 'Intermediate',
              resources: [
                { type: 'course', title: 'Full Stack Web Development', platform: 'freeCodeCamp', free: true, rating: 4.8 },
                { type: 'course', title: 'React.js Complete Course', platform: 'Udemy', free: false, rating: 4.7 },
                { type: 'project', title: 'Build a Portfolio Website', platform: 'Self-guided', free: true, rating: 4.9 }
              ],
              skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'APIs']
            },
            {
              id: 'cs-7',
              title: 'Machine Learning Basics',
              description: 'Introduction to ML algorithms and applications',
              duration: '3 months',
              type: 'course',
              difficulty: 'Advanced',
              resources: [
                { type: 'course', title: 'Machine Learning Course', platform: 'Coursera (Andrew Ng)', free: false, rating: 4.9 },
                { type: 'course', title: 'Intro to Machine Learning', platform: 'Kaggle Learn', free: true, rating: 4.6 },
                { type: 'project', title: 'ML Project Portfolio', platform: 'Kaggle', free: true, rating: 4.7 }
              ],
              skills: ['Python ML Libraries', 'Supervised Learning', 'Data Analysis', 'Model Evaluation']
            }
          ]
        },
        {
          id: 'advanced',
          title: 'Advanced Phase',
          duration: '18 months',
          description: 'Specialize in AI, advanced algorithms, and system design',
          progress: 20,
          steps: [
            {
              id: 'cs-8',
              title: 'Advanced AI & Deep Learning',
              description: 'Neural networks, deep learning, and AI applications',
              duration: '6 months',
              type: 'specialization',
              difficulty: 'Expert',
              resources: [
                { type: 'course', title: 'Deep Learning Specialization', platform: 'Coursera', free: false, rating: 4.8 },
                { type: 'course', title: 'CS231n: CNN for Visual Recognition', platform: 'Stanford', free: true, rating: 4.9 },
                { type: 'project', title: 'AI Research Project', platform: 'Self-guided', free: true, rating: 4.8 }
              ],
              skills: ['TensorFlow', 'PyTorch', 'Neural Networks', 'Computer Vision', 'NLP']
            },
            {
              id: 'cs-9',
              title: 'System Design & Architecture',
              description: 'Large-scale system design and distributed systems',
              duration: '4 months',
              type: 'course',
              difficulty: 'Expert',
              resources: [
                { type: 'course', title: 'System Design Interview', platform: 'Educative', free: false, rating: 4.7 },
                { type: 'book', title: 'Designing Data-Intensive Applications', platform: 'Library', free: false, rating: 4.9 },
                { type: 'practice', title: 'System Design Practice', platform: 'Pramp', free: false, rating: 4.6 }
              ],
              skills: ['System Architecture', 'Scalability', 'Distributed Systems', 'Microservices']
            },
            {
              id: 'cs-10',
              title: 'Capstone Project',
              description: 'Build a comprehensive AI-powered application',
              duration: '8 months',
              type: 'project',
              difficulty: 'Expert',
              resources: [
                { type: 'project', title: 'AI Startup Project', platform: 'Self-guided', free: true, rating: 4.9 },
                { type: 'mentorship', title: 'Industry Mentor Program', platform: 'Various', free: false, rating: 4.8 },
                { type: 'competition', title: 'AI Competitions', platform: 'Kaggle/DrivenData', free: true, rating: 4.7 }
              ],
              skills: ['Full-Stack Development', 'AI Integration', 'Project Management', 'Deployment']
            }
          ]
        }
      ]
    }
  }

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return Video
      case 'course': return BookOpen
      case 'book': return FileText
      case 'project': return Target
      case 'practice': return Play
      default: return BookOpen
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'Advanced': return 'bg-orange-100 text-orange-700'
      case 'Expert': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const currentPath = roadmapData[selectedPath]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Learning Roadmap</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Your Personalized <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Learning Journey</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Follow a structured roadmap with curated resources, timelines, and milestones to achieve your career goals.
          </p>
        </motion.div>

        {/* Path Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className={`cursor-pointer transition-all duration-300 border-2 rounded-lg bg-white shadow-sm hover:shadow-md ${
                  selectedPath === path.id
                    ? 'border-indigo-500 shadow-lg'
                    : 'border-transparent hover:border-indigo-200'
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3">{path.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{path.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{path.description}</p>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>{path.duration}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-800 bg-white">
                      <Users className="w-3 h-3 mr-1" />
                      {path.popularity} choose this
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Roadmap Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Timeline Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg border sticky top-8">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                    Progress Overview
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {currentPath?.phases.map((phase, index) => (
                      <div key={phase.id} className="relative">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            phase.progress > 50
                              ? 'bg-green-100 text-green-700'
                              : phase.progress > 0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 text-sm">{phase.title}</p>
                            <p className="text-xs text-slate-500">{phase.duration}</p>
                            <div className="mt-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${phase.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        {index < currentPath.phases.length - 1 && (
                          <div className="absolute left-4 top-8 w-px h-6 bg-slate-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {currentPath?.phases.map((phase) => (
                  <div key={phase.id} className="bg-white rounded-lg shadow-lg border">
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-indigo-500" />
                            {phase.title}
                          </h2>
                          <p className="text-slate-600 mt-1">{phase.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {phase.duration}
                          </span>
                          <div className="mt-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${phase.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{phase.progress}% Complete</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {phase.steps.map((step) => (
                          <div key={step.id} className="border rounded-lg p-6 bg-slate-50">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start space-x-3">
                                <button
                                  onClick={() => toggleStepCompletion(step.id)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                    completedSteps.includes(step.id)
                                      ? 'bg-green-500 text-white hover:bg-green-600'
                                      : 'bg-white border-2 border-slate-300 hover:border-indigo-500'
                                  }`}
                                >
                                  {completedSteps.includes(step.id) && (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                </button>
                                <div>
                                  <h4 className="font-semibold text-slate-900">{step.title}</h4>
                                  <p className="text-slate-600 text-sm mt-1">{step.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                                  {step.difficulty}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-800 bg-white">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {step.duration}
                                </span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm font-medium text-slate-700 mb-2">Skills you'll learn:</p>
                              <div className="flex flex-wrap gap-2">
                                {step.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-800 bg-white">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-slate-700 mb-3">Recommended Resources:</p>
                              <div className="grid md:grid-cols-2 gap-3">
                                {step.resources.map((resource, resourceIndex) => {
                                  const ResourceIcon = getResourceIcon(resource.type)
                                  return (
                                    <div key={resourceIndex} className="bg-white p-3 rounded-lg border">
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                          <ResourceIcon className="w-4 h-4 text-indigo-500" />
                                          <span className="text-sm font-medium text-slate-900">
                                            {resource.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-500" />
                                          <span className="text-xs text-slate-600">{resource.rating}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500">{resource.platform}</span>
                                        <div className="flex items-center space-x-2">
                                          {resource.free ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                              Free
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                              Paid
                                            </span>
                                          )}
                                          <button className="p-1 hover:bg-gray-100 rounded">
                                            <ExternalLink className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
              <p className="text-lg opacity-90 mb-6">
                Get personalized guidance and track your progress with our AI counselor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/ai-chat')}
                  className="flex items-center justify-center px-6 py-3 bg-white text-indigo-600 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Get AI Guidance
                </button>
                <button className="flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-white hover:text-indigo-600 font-medium rounded-lg transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LearningRoadmap
