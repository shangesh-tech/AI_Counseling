import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowLeft,
  Star,
  DollarSign,
  Users,
  Clock,
  MapPin,
  Briefcase,
  Code,
  Stethoscope,
  Calculator,
  Palette,
  Wrench,
  Globe
} from 'lucide-react'

const JobExplorer = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const jobCategories = [
    { id: 'all', name: 'All Jobs', icon: Briefcase },
    { id: 'technology', name: 'Technology', icon: Code },
    { id: 'healthcare', name: 'Healthcare', icon: Stethoscope },
    { id: 'finance', name: 'Finance', icon: Calculator },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'engineering', name: 'Engineering', icon: Wrench },
    { id: 'business', name: 'Business', icon: Globe }
  ]

  const trendingJobs = [
    {
      title: "AI/ML Engineer",
      category: "Technology",
      growth: "+45%",
      trend: "up",
      salary: "$120k - $180k",
      demand: "Very High",
      description: "Design and develop artificial intelligence and machine learning systems",
      skills: ["Python", "TensorFlow", "Machine Learning", "Data Science"],
      companies: ["Google", "Microsoft", "OpenAI", "Tesla"],
      education: "Bachelor's in CS/Engineering",
      experience: "2-5 years",
      remote: true,
      hot: true
    },
    {
      title: "Data Scientist",
      category: "Technology",
      growth: "+35%",
      trend: "up",
      salary: "$95k - $150k",
      demand: "High",
      description: "Analyze complex data to help companies make better decisions",
      skills: ["Python", "R", "SQL", "Statistics", "Visualization"],
      companies: ["Netflix", "Uber", "Airbnb", "Meta"],
      education: "Bachelor's in Math/Statistics/CS",
      experience: "1-4 years",
      remote: true,
      hot: true
    },
    {
      title: "Cybersecurity Specialist",
      category: "Technology",
      growth: "+28%",
      trend: "up",
      salary: "$85k - $140k",
      demand: "Very High",
      description: "Protect organizations from cyber threats and security breaches",
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment"],
      companies: ["IBM", "Cisco", "CrowdStrike", "Palo Alto"],
      education: "Bachelor's in CS/IT",
      experience: "2-6 years",
      remote: false,
      hot: true
    },
    {
      title: "UX/UI Designer",
      category: "Creative",
      growth: "+22%",
      trend: "up",
      salary: "$70k - $120k",
      demand: "High",
      description: "Create intuitive and engaging user experiences for digital products",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      companies: ["Apple", "Adobe", "Spotify", "Slack"],
      education: "Bachelor's in Design/HCI",
      experience: "1-5 years",
      remote: true,
      hot: false
    },
    {
      title: "Renewable Energy Engineer",
      category: "Engineering",
      growth: "+30%",
      trend: "up",
      salary: "$75k - $125k",
      demand: "High",
      description: "Develop sustainable energy solutions and green technologies",
      skills: ["Solar/Wind Systems", "CAD", "Project Management"],
      companies: ["Tesla", "GE Renewable", "Vestas", "First Solar"],
      education: "Bachelor's in Engineering",
      experience: "2-7 years",
      remote: false,
      hot: true
    },
    {
      title: "Digital Marketing Manager",
      category: "Business",
      growth: "+18%",
      trend: "up",
      salary: "$60k - $100k",
      demand: "Medium",
      description: "Plan and execute digital marketing campaigns across various channels",
      skills: ["SEO/SEM", "Social Media", "Analytics", "Content Strategy"],
      companies: ["HubSpot", "Salesforce", "Adobe", "Shopify"],
      education: "Bachelor's in Marketing/Business",
      experience: "2-5 years",
      remote: true,
      hot: false
    },
    {
      title: "Nurse Practitioner",
      category: "Healthcare",
      growth: "+26%",
      trend: "up",
      salary: "$95k - $130k",
      demand: "Very High",
      description: "Provide advanced nursing care and primary healthcare services",
      skills: ["Clinical Skills", "Patient Care", "Diagnosis", "Treatment"],
      companies: ["Kaiser Permanente", "Mayo Clinic", "Cleveland Clinic"],
      education: "Master's in Nursing",
      experience: "3-8 years",
      remote: false,
      hot: true
    },
    {
      title: "Financial Analyst",
      category: "Finance",
      growth: "+8%",
      trend: "up",
      salary: "$65k - $95k",
      demand: "Medium",
      description: "Analyze financial data to guide business investment decisions",
      skills: ["Excel", "Financial Modeling", "SQL", "Bloomberg Terminal"],
      companies: ["Goldman Sachs", "JP Morgan", "BlackRock", "Vanguard"],
      education: "Bachelor's in Finance/Economics",
      experience: "1-4 years",
      remote: false,
      hot: false
    }
  ]

  const filteredJobs = trendingJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' ||
                           job.category.toLowerCase() === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'bg-red-100 text-red-700'
      case 'High': return 'bg-orange-100 text-orange-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTrendIcon = (trend) => {
    return trend === 'up' ? TrendingUp : TrendingDown
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
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Job Explorer</span>
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
            Explore Future <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">Career Opportunities</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover trending jobs, growth opportunities, and career paths that align with your interests and skills.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs, skills, or companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {jobCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Job Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredJobs.length} Jobs Found
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending Now
            </span>
          </div>

          <div className="grid gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-md border-0 hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-slate-900">
                                {job.title}
                              </h3>
                              {job.hot && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  🔥 Hot
                                </span>
                              )}
                              {job.remote && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-200 text-green-700 bg-white">
                                  Remote
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600 mb-3">
                              {job.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <div>
                              <p className="text-sm text-slate-500">Salary Range</p>
                              <p className="font-semibold text-slate-900">{job.salary}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {job.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <div>
                              <p className="text-sm text-slate-500">Growth Rate</p>
                              <p className="font-semibold text-green-600">{job.growth}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <div>
                              <p className="text-sm text-slate-500">Demand</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDemandColor(job.demand)}`}>
                                {job.demand}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <div>
                              <p className="text-sm text-slate-500">Experience</p>
                              <p className="font-semibold text-slate-900">{job.experience}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Required Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-800 bg-white">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Top Companies:</p>
                            <div className="flex flex-wrap gap-2">
                              {job.companies.slice(0, 4).map((company, companyIndex) => (
                                <span key={companyIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                  {company}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span>📚 {job.education}</span>
                            <span>📍 {job.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors">
                          Learn More
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                          <Star className="w-4 h-4 mr-2" />
                          Save Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or explore different categories.</p>
            </div>
          )}
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
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-lg opacity-90 mb-6">
                Check your eligibility for these exciting career paths and get personalized university recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/eligibility')}
                  className="px-6 py-3 bg-white text-indigo-600 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                >
                  Check Eligibility
                </button>
                <button
                  onClick={() => navigate('/universities')}
                  className="px-6 py-3 border border-white text-white hover:bg-white hover:text-indigo-600 font-medium rounded-lg transition-colors"
                >
                  Find Universities
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default JobExplorer
