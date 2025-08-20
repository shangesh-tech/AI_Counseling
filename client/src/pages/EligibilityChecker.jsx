import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calculator,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Star
} from 'lucide-react'

const EligibilityChecker = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('12th')
  const [scores, setScores] = useState({
    physics: '',
    chemistry: '',
    mathematics: '',
    biology: '',
    english: '',
    totalPercentage: '',
    satScore: '',
    jeeMainScore: '',
    jeeAdvancedScore: ''
  })
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const universities = [
    {
      name: "MIT",
      courses: ["Computer Science", "Engineering", "Physics"],
      requirements: {
        percentage: 95,
        sat: 1500,
        jeeMain: 250,
        jeeAdvanced: 200
      },
      acceptance: "2%",
      ranking: "#1 Global",
      location: "Cambridge, MA"
    },
    {
      name: "Stanford University",
      courses: ["Computer Science", "Business", "Engineering"],
      requirements: {
        percentage: 93,
        sat: 1480,
        jeeMain: 240,
        jeeAdvanced: 190
      },
      acceptance: "4%",
      ranking: "#2 Global",
      location: "Stanford, CA"
    },
    {
      name: "IIT Bombay",
      courses: ["Engineering", "Technology", "Science"],
      requirements: {
        percentage: 90,
        sat: 1400,
        jeeMain: 280,
        jeeAdvanced: 250
      },
      acceptance: "1%",
      ranking: "#1 India",
      location: "Mumbai, India"
    },
    {
      name: "Harvard University",
      courses: ["Medicine", "Law", "Business", "Liberal Arts"],
      requirements: {
        percentage: 95,
        sat: 1520,
        jeeMain: 0,
        jeeAdvanced: 0
      },
      acceptance: "3%",
      ranking: "#3 Global",
      location: "Cambridge, MA"
    },
    {
      name: "UC Berkeley",
      courses: ["Computer Science", "Engineering", "Business"],
      requirements: {
        percentage: 88,
        sat: 1420,
        jeeMain: 220,
        jeeAdvanced: 180
      },
      acceptance: "15%",
      ranking: "#4 Global",
      location: "Berkeley, CA"
    },
    {
      name: "IIT Delhi",
      courses: ["Engineering", "Technology", "Mathematics"],
      requirements: {
        percentage: 88,
        sat: 1380,
        jeeMain: 270,
        jeeAdvanced: 240
      },
      acceptance: "1.5%",
      ranking: "#2 India",
      location: "New Delhi, India"
    },
    {
      name: "Carnegie Mellon",
      courses: ["Computer Science", "Robotics", "AI"],
      requirements: {
        percentage: 90,
        sat: 1460,
        jeeMain: 230,
        jeeAdvanced: 185
      },
      acceptance: "13%",
      ranking: "#25 Global",
      location: "Pittsburgh, PA"
    },
    {
      name: "BITS Pilani",
      courses: ["Engineering", "Pharmacy", "Science"],
      requirements: {
        percentage: 85,
        sat: 1350,
        jeeMain: 200,
        jeeAdvanced: 0
      },
      acceptance: "8%",
      ranking: "#10 India",
      location: "Pilani, India"
    }
  ]

  const calculateEligibility = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const userPercentage = parseFloat(scores.totalPercentage) || 0
      const userSAT = parseInt(scores.satScore) || 0
      const userJEEMain = parseInt(scores.jeeMainScore) || 0
      const userJEEAdvanced = parseInt(scores.jeeAdvancedScore) || 0

      const eligibleUniversities = universities.map(uni => {
        let eligible = true
        let score = 0
        const reasons = []

        // Check percentage requirement
        if (userPercentage < uni.requirements.percentage) {
          eligible = false
          reasons.push(`Need ${uni.requirements.percentage}% (You have ${userPercentage}%)`)
        } else {
          score += 25
        }

        // Check SAT requirement (if applicable)
        if (uni.requirements.sat > 0) {
          if (userSAT < uni.requirements.sat) {
            eligible = false
            reasons.push(`Need SAT ${uni.requirements.sat} (You have ${userSAT})`)
          } else {
            score += 25
          }
        } else {
          score += 25 // No SAT required
        }

        // Check JEE Main requirement (if applicable)
        if (uni.requirements.jeeMain > 0) {
          if (userJEEMain < uni.requirements.jeeMain) {
            eligible = false
            reasons.push(`Need JEE Main ${uni.requirements.jeeMain} (You have ${userJEEMain})`)
          } else {
            score += 25
          }
        } else {
          score += 25 // No JEE Main required
        }

        // Check JEE Advanced requirement (if applicable)
        if (uni.requirements.jeeAdvanced > 0) {
          if (userJEEAdvanced < uni.requirements.jeeAdvanced) {
            eligible = false
            reasons.push(`Need JEE Advanced ${uni.requirements.jeeAdvanced} (You have ${userJEEAdvanced})`)
          } else {
            score += 25
          }
        } else {
          score += 25 // No JEE Advanced required
        }

        return {
          ...uni,
          eligible,
          score,
          reasons,
          match: eligible ? 'Perfect Match' : reasons.length === 1 ? 'Close Match' : 'Needs Improvement'
        }
      })

      setResults({
        eligible: eligibleUniversities.filter(u => u.eligible),
        closeMatch: eligibleUniversities.filter(u => !u.eligible && u.reasons.length <= 2),
        needsImprovement: eligibleUniversities.filter(u => !u.eligible && u.reasons.length > 2),
        totalEligible: eligibleUniversities.filter(u => u.eligible).length,
        overallScore: Math.round(eligibleUniversities.reduce((acc, u) => acc + u.score, 0) / eligibleUniversities.length)
      })
      
      setIsCalculating(false)
    }, 2000)
  }

  const getMatchColor = (match) => {
    switch (match) {
      case 'Perfect Match': return 'bg-green-100 text-green-700'
      case 'Close Match': return 'bg-yellow-100 text-yellow-700'
      case 'Needs Improvement': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getMatchIcon = (match) => {
    switch (match) {
      case 'Perfect Match': return CheckCircle
      case 'Close Match': return AlertCircle
      case 'Needs Improvement': return XCircle
      default: return AlertCircle
    }
  }

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
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Eligibility Checker</span>
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
            Check Your <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">University Eligibility</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Enter your academic scores to see which top universities and courses you're eligible for.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg border sticky top-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-indigo-500" />
                  Enter Your Scores
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {/* Tabs */}
                <div className="w-full">
                  <div className="grid w-full grid-cols-3 bg-slate-100 rounded-lg p-1">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === '12th' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      onClick={() => setActiveTab('12th')}
                    >
                      12th Grade
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'sat' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      onClick={() => setActiveTab('sat')}
                    >
                      SAT
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'jee' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      onClick={() => setActiveTab('jee')}
                    >
                      JEE
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  {activeTab === '12th' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="physics" className="block text-sm font-medium text-gray-700 mb-1">
                          Physics (%)
                        </label>
                        <input
                          id="physics"
                          type="number"
                          placeholder="85"
                          value={scores.physics}
                          onChange={(e) => setScores(prev => ({ ...prev, physics: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="chemistry" className="block text-sm font-medium text-gray-700 mb-1">
                          Chemistry (%)
                        </label>
                        <input
                          id="chemistry"
                          type="number"
                          placeholder="90"
                          value={scores.chemistry}
                          onChange={(e) => setScores(prev => ({ ...prev, chemistry: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="mathematics" className="block text-sm font-medium text-gray-700 mb-1">
                          Mathematics (%)
                        </label>
                        <input
                          id="mathematics"
                          type="number"
                          placeholder="95"
                          value={scores.mathematics}
                          onChange={(e) => setScores(prev => ({ ...prev, mathematics: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="totalPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                          Overall Percentage (%)
                        </label>
                        <input
                          id="totalPercentage"
                          type="number"
                          placeholder="88.5"
                          value={scores.totalPercentage}
                          onChange={(e) => setScores(prev => ({ ...prev, totalPercentage: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'sat' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="satScore" className="block text-sm font-medium text-gray-700 mb-1">
                          SAT Score (out of 1600)
                        </label>
                        <input
                          id="satScore"
                          type="number"
                          placeholder="1450"
                          value={scores.satScore}
                          onChange={(e) => setScores(prev => ({ ...prev, satScore: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Leave blank if not taken
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'jee' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="jeeMainScore" className="block text-sm font-medium text-gray-700 mb-1">
                          JEE Main Score (out of 300)
                        </label>
                        <input
                          id="jeeMainScore"
                          type="number"
                          placeholder="250"
                          value={scores.jeeMainScore}
                          onChange={(e) => setScores(prev => ({ ...prev, jeeMainScore: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="jeeAdvancedScore" className="block text-sm font-medium text-gray-700 mb-1">
                          JEE Advanced Score (out of 300)
                        </label>
                        <input
                          id="jeeAdvancedScore"
                          type="number"
                          placeholder="200"
                          value={scores.jeeAdvancedScore}
                          onChange={(e) => setScores(prev => ({ ...prev, jeeAdvancedScore: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Leave blank if not taken
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={calculateEligibility}
                  disabled={isCalculating || !scores.totalPercentage}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Check Eligibility
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {!results ? (
              <div className="bg-white rounded-lg shadow-lg border h-96 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Ready to Check Your Eligibility?
                  </h3>
                  <p className="text-slate-600">
                    Enter your academic scores to see which universities match your profile.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Your Eligibility Score</h3>
                      <p className="opacity-90">
                        You're eligible for {results.totalEligible} out of {universities.length} top universities
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{results.overallScore}%</div>
                      <p className="text-sm opacity-90">Overall Match</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${results.overallScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Perfect Matches */}
                {results.eligible.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg border">
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-semibold text-green-600 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Perfect Matches ({results.eligible.length})
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid gap-4">
                        {results.eligible.map((uni, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-green-50">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-slate-900">{uni.name}</h4>
                                <p className="text-sm text-slate-600">{uni.location}</p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-1">
                                  ✅ Eligible
                                </span>
                                <p className="text-xs text-slate-500">{uni.ranking}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {uni.courses.map((course, courseIndex) => (
                                <span key={courseIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border">
                                  {course}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center text-sm text-slate-600">
                              <span>Acceptance Rate: {uni.acceptance}</span>
                              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Close Matches */}
                {results.closeMatch.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg border">
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-semibold text-yellow-600 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Close Matches ({results.closeMatch.length})
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid gap-4">
                        {results.closeMatch.map((uni, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-yellow-50">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-slate-900">{uni.name}</h4>
                                <p className="text-sm text-slate-600">{uni.location}</p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-1">
                                  ⚠️ Close
                                </span>
                                <p className="text-xs text-slate-500">{uni.ranking}</p>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-medium text-slate-700 mb-1">Requirements to meet:</p>
                              <ul className="text-sm text-red-600 space-y-1">
                                {uni.reasons.map((reason, reasonIndex) => (
                                  <li key={reasonIndex}>• {reason}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {uni.courses.map((course, courseIndex) => (
                                <span key={courseIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border">
                                  {course}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center text-sm text-slate-600">
                              <span>Acceptance Rate: {uni.acceptance}</span>
                              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                Improvement Plan
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/universities')}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Explore Universities
                  </button>
                  <button
                    onClick={() => navigate('/roadmap')}
                    className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Get Study Plan
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityChecker
