import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Users,
  DollarSign,
  Star,
  GraduationCap,
  BookOpen,
  Award,
  Globe,
  Heart,
  GitCompare,
  TrendingUp,
  Building
} from 'lucide-react'

const UniversitySelector = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [compareList, setCompareList] = useState([])

  const countries = [
    { id: 'all', name: 'All Countries', flag: '🌍' },
    { id: 'usa', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦' },
    { id: 'australia', name: 'Australia', flag: '🇦🇺' },
    { id: 'germany', name: 'Germany', flag: '🇩🇪' },
    { id: 'india', name: 'India', flag: '🇮🇳' }
  ]

  const universities = [
    {
      id: 'mit',
      name: "Massachusetts Institute of Technology",
      shortName: "MIT",
      country: 'usa',
      type: 'private',
      ranking: 1,
      location: "Cambridge, Massachusetts",
      tuition: "$57,986",
      acceptance: "4%",
      students: "11,934",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
      specialties: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      highlights: ["#1 Engineering School", "Nobel Prize Winners", "Innovation Hub"],
      description: "World's leading institution for technology and innovation with cutting-edge research facilities.",
      requirements: {
        gpa: "4.0",
        sat: "1520-1580",
        toefl: "100+",
        essays: "Required"
      },
      programs: ["Undergraduate", "Graduate", "PhD", "Executive"],
      facilities: ["Research Labs", "Innovation Center", "Startup Incubator", "AI Lab"],
      scholarships: ["Need-based Aid", "Merit Scholarships", "International Aid"]
    },
    {
      id: 'stanford',
      name: "Stanford University",
      shortName: "Stanford",
      country: 'usa',
      type: 'private',
      ranking: 2,
      location: "Stanford, California",
      tuition: "$56,169",
      acceptance: "4%",
      students: "17,249",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      specialties: ["Computer Science", "Business", "Medicine", "Engineering"],
      highlights: ["Silicon Valley Location", "Entrepreneurship Hub", "Top MBA Program"],
      description: "Premier research university known for innovation and entrepreneurship in the heart of Silicon Valley.",
      requirements: {
        gpa: "3.9+",
        sat: "1500-1570",
        toefl: "100+",
        essays: "Required"
      },
      programs: ["Undergraduate", "Graduate", "MBA", "PhD"],
      facilities: ["Startup Garage", "Design Thinking Lab", "Medical Center", "Research Park"],
      scholarships: ["Knight-Hennessy Scholars", "Need-based Aid", "Athletic Scholarships"]
    },
    {
      id: 'harvard',
      name: "Harvard University",
      shortName: "Harvard",
      country: 'usa',
      type: 'private',
      ranking: 3,
      location: "Cambridge, Massachusetts",
      tuition: "$54,269",
      acceptance: "3%",
      students: "23,731",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      specialties: ["Law", "Medicine", "Business", "Liberal Arts"],
      highlights: ["Oldest US University", "Largest Endowment", "8 US Presidents"],
      description: "America's oldest institution of higher education with unparalleled academic excellence and alumni network.",
      requirements: {
        gpa: "4.0",
        sat: "1510-1580",
        toefl: "100+",
        essays: "Required"
      },
      programs: ["Undergraduate", "Graduate", "Law", "Medical", "Business"],
      facilities: ["Widener Library", "Harvard Medical School", "Business School", "Law School"],
      scholarships: ["Harvard Financial Aid", "International Scholarships", "Merit Awards"]
    },
    {
      id: 'oxford',
      name: "University of Oxford",
      shortName: "Oxford",
      country: 'uk',
      type: 'public',
      ranking: 4,
      location: "Oxford, England",
      tuition: "£9,250 - £37,510",
      acceptance: "17%",
      students: "24,515",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop",
      specialties: ["Philosophy", "Literature", "Medicine", "Law"],
      highlights: ["900+ Years Old", "Tutorial System", "28 Prime Ministers"],
      description: "One of the world's oldest and most prestigious universities with a unique tutorial system.",
      requirements: {
        gpa: "A*A*A",
        sat: "1470+",
        toefl: "110+",
        essays: "Personal Statement"
      },
      programs: ["Undergraduate", "Graduate", "DPhil", "Executive"],
      facilities: ["Bodleian Library", "Ashmolean Museum", "Research Labs", "Colleges"],
      scholarships: ["Rhodes Scholarship", "Clarendon Fund", "Oxford-Weidenfeld"]
    },
    {
      id: 'iit-bombay',
      name: "Indian Institute of Technology Bombay",
      shortName: "IIT Bombay",
      country: 'india',
      type: 'public',
      ranking: 1,
      location: "Mumbai, Maharashtra",
      tuition: "₹2,50,000",
      acceptance: "1%",
      students: "10,000",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
      specialties: ["Engineering", "Technology", "Computer Science", "Research"],
      highlights: ["Top Engineering School", "IIT JEE Selection", "Industry Partnerships"],
      description: "Premier engineering institution in India known for producing world-class engineers and entrepreneurs.",
      requirements: {
        gpa: "90%+",
        jee: "Advanced Qualified",
        toefl: "N/A",
        essays: "Not Required"
      },
      programs: ["B.Tech", "M.Tech", "PhD", "Dual Degree"],
      facilities: ["Research Centers", "Incubation Cell", "Central Library", "Hostels"],
      scholarships: ["Merit-cum-Means", "SC/ST Scholarships", "International Exchange"]
    },
    {
      id: 'cambridge',
      name: "University of Cambridge",
      shortName: "Cambridge",
      country: 'uk',
      type: 'public',
      ranking: 5,
      location: "Cambridge, England",
      tuition: "£9,250 - £33,825",
      acceptance: "21%",
      students: "23,247",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop",
      specialties: ["Mathematics", "Natural Sciences", "Engineering", "Medicine"],
      highlights: ["800+ Years Old", "Newton & Hawking", "31 Colleges"],
      description: "Historic university renowned for scientific breakthroughs and academic excellence across all disciplines.",
      requirements: {
        gpa: "A*A*A",
        sat: "1460+",
        toefl: "110+",
        essays: "Personal Statement"
      },
      programs: ["Undergraduate", "Graduate", "PhD", "MPhil"],
      facilities: ["University Library", "Cavendish Laboratory", "Computer Laboratory", "Colleges"],
      scholarships: ["Gates Cambridge", "Cambridge Trust", "College Awards"]
    },
    {
      id: 'toronto',
      name: "University of Toronto",
      shortName: "U of T",
      country: 'canada',
      type: 'public',
      ranking: 18,
      location: "Toronto, Ontario",
      tuition: "CAD $58,160",
      acceptance: "43%",
      students: "97,757",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
      specialties: ["Medicine", "Engineering", "Business", "Computer Science"],
      highlights: ["Top Canadian University", "Research Intensive", "Diverse Community"],
      description: "Canada's leading research university with world-class programs and diverse international community.",
      requirements: {
        gpa: "85%+",
        sat: "1350+",
        toefl: "100+",
        essays: "Supplementary Application"
      },
      programs: ["Undergraduate", "Graduate", "Professional", "Continuing Education"],
      facilities: ["Research Institutes", "Teaching Hospitals", "Libraries", "Innovation Labs"],
      scholarships: ["Lester B. Pearson", "National Scholarship", "International Scholar Award"]
    },
    {
      id: 'melbourne',
      name: "University of Melbourne",
      shortName: "Melbourne",
      country: 'australia',
      type: 'public',
      ranking: 14,
      location: "Melbourne, Victoria",
      tuition: "AUD $44,736",
      acceptance: "70%",
      students: "51,000",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
      specialties: ["Medicine", "Law", "Business", "Arts"],
      highlights: ["Group of Eight", "Melbourne Model", "Research Excellence"],
      description: "Australia's leading university with innovative teaching methods and strong research focus.",
      requirements: {
        gpa: "80%+",
        sat: "1300+",
        toefl: "94+",
        essays: "Personal Statement"
      },
      programs: ["Undergraduate", "Graduate", "Professional", "Research"],
      facilities: ["Medical School", "Business School", "Research Centers", "Student Villages"],
      scholarships: ["Melbourne International", "Graduate Research", "Equity Scholarships"]
    }
  ]

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         uni.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCountry = selectedCountry === 'all' || uni.country === selectedCountry
    const matchesType = selectedType === 'all' || uni.type === selectedType
    
    return matchesSearch && matchesCountry && matchesType
  })

  const toggleCompare = (uniId) => {
    setCompareList(prev =>
      prev.includes(uniId)
        ? prev.filter(id => id !== uniId)
        : prev.length < 3 ? [...prev, uniId] : prev
    )
  }

  const getRankingColor = (ranking) => {
    if (ranking <= 5) return 'bg-green-100 text-green-700'
    if (ranking <= 20) return 'bg-blue-100 text-blue-700'
    return 'bg-gray-100 text-gray-700'
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
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">University Selector</span>
              </div>
            </div>
            
            {compareList.length > 0 && (
              <button className="flex items-center px-4 py-2 border border-indigo-200 hover:border-indigo-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare ({compareList.length})
              </button>
            )}
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
            Find Your Perfect <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">University</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore top universities worldwide and find the perfect match for your academic goals and career aspirations.
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
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search universities, locations, or programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Types</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredUniversities.length} Universities Found
            </h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                Top Ranked
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredUniversities.map((uni, index) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-80 h-48 lg:h-auto">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-slate-900">
                              {uni.name}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRankingColor(uni.ranking)}`}>
                              #{uni.ranking} Global
                            </span>
                          </div>
                          <div className="flex items-center text-slate-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {uni.location}
                          </div>
                          <p className="text-slate-600 mb-3">
                            {uni.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="font-semibold">{uni.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-sm text-slate-500">Tuition</p>
                            <p className="font-semibold text-slate-900">{uni.tuition}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-sm text-slate-500">Students</p>
                            <p className="font-semibold text-slate-900">{uni.students}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-purple-500" />
                          <div>
                            <p className="text-sm text-slate-500">Acceptance</p>
                            <p className="font-semibold text-slate-900">{uni.acceptance}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-amber-500" />
                          <div>
                            <p className="text-sm text-slate-500">Type</p>
                            <p className="font-semibold text-slate-900 capitalize">{uni.type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {uni.specialties.map((specialty, specIndex) => (
                              <span key={specIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-800 bg-white">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Highlights:</p>
                          <div className="flex flex-wrap gap-2">
                            {uni.highlights.map((highlight, highlightIndex) => (
                              <span key={highlightIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors">
                          <BookOpen className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => toggleCompare(uni.id)}
                          disabled={compareList.length >= 3 && !compareList.includes(uni.id)}
                          className={`flex items-center justify-center px-4 py-2 border rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            compareList.includes(uni.id) 
                              ? 'border-indigo-500 text-indigo-600 bg-indigo-50' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <GitCompare className="w-4 h-4 mr-2" />
                          {compareList.includes(uni.id) ? 'Remove' : 'Compare'}
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No universities found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
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
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-lg opacity-90 mb-6">
                Get personalized recommendations and create your learning roadmap with our AI counselor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/ai-chat')}
                  className="flex items-center justify-center px-6 py-3 bg-white text-indigo-600 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Ask AI Counselor
                </button>
                <button
                  onClick={() => navigate('/roadmap')}
                  className="flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-white hover:text-indigo-600 font-medium rounded-lg transition-colors"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Create Roadmap
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UniversitySelector
