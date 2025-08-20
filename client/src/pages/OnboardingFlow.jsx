import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowLeft,
  User,
  Brain,
  Heart,
  Target,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const OnboardingFlow = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    school: '',
    skills: [],
    interests: [],
    passions: '',
    goals: '',
    preferredFields: []
  })

  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Tell us about yourself',
      icon: User,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'skills',
      title: 'Skills & Knowledge',
      subtitle: 'What are you good at?',
      icon: Brain,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'interests',
      title: 'Interests & Hobbies',
      subtitle: 'What do you enjoy doing?',
      icon: Heart,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'goals',
      title: 'Goals & Aspirations',
      subtitle: 'Where do you see yourself?',
      icon: Target,
      color: 'from-pink-500 to-red-600'
    }
  ]

  const skillOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Art & Design',
    'Music', 'Sports', 'Leadership', 'Communication', 'Problem Solving',
    'Critical Thinking', 'Creativity', 'Research', 'Public Speaking', 'Writing'
  ]

  const interestOptions = [
    'Technology', 'Science', 'Medicine', 'Engineering', 'Business',
    'Arts & Culture', 'Sports', 'Music', 'Travel', 'Environment',
    'Social Work', 'Education', 'Finance', 'Law', 'Media',
    'Gaming', 'Photography', 'Cooking', 'Reading', 'Movies'
  ]

  const fieldOptions = [
    'Computer Science', 'Engineering', 'Medicine', 'Business', 'Law',
    'Arts & Humanities', 'Science & Research', 'Education', 'Social Work',
    'Media & Communication', 'Design', 'Finance', 'Healthcare', 'Environment'
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save data and navigate to dashboard
      localStorage.setItem('onboardingData', JSON.stringify(formData))
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleSelection = (item, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="grade" className="block text-base font-medium text-gray-700 mb-2">
                Current Grade
              </label>
              <input
                id="grade"
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                placeholder="e.g., 12th Grade"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="school" className="block text-base font-medium text-gray-700 mb-2">
                School Name
              </label>
              <input
                id="school"
                type="text"
                value={formData.school}
                onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                placeholder="Enter your school name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-4">
                Select your strongest skills and subjects
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <span
                    key={skill}
                    className={`cursor-pointer p-3 text-center justify-center transition-all rounded-full text-sm font-medium border ${
                      formData.skills.includes(skill)
                        ? 'bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-500'
                        : 'hover:bg-indigo-50 hover:border-indigo-300 text-gray-700 border-gray-300 bg-white'
                    }`}
                    onClick={() => toggleSelection(skill, 'skills')}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-3">
                Selected: {formData.skills.length} skills
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-4">
                What are your interests and hobbies?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <span
                    key={interest}
                    className={`cursor-pointer p-3 text-center justify-center transition-all rounded-full text-sm font-medium border ${
                      formData.interests.includes(interest)
                        ? 'bg-purple-500 hover:bg-purple-600 text-white border-purple-500'
                        : 'hover:bg-purple-50 hover:border-purple-300 text-gray-700 border-gray-300 bg-white'
                    }`}
                    onClick={() => toggleSelection(interest, 'interests')}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="passions" className="block text-base font-medium text-gray-700 mb-2">
                Tell us about your passions (Optional)
              </label>
              <textarea
                id="passions"
                value={formData.passions}
                onChange={(e) => setFormData(prev => ({ ...prev, passions: e.target.value }))}
                placeholder="Describe what you're passionate about..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="goals" className="block text-base font-medium text-gray-700 mb-2">
                What are your career goals?
              </label>
              <textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                placeholder="Describe your career aspirations and goals..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-4">
                Which fields interest you most?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {fieldOptions.map((field) => (
                  <span
                    key={field}
                    className={`cursor-pointer p-3 text-center justify-center transition-all rounded-full text-sm font-medium border ${
                      formData.preferredFields.includes(field)
                        ? 'bg-pink-500 hover:bg-pink-600 text-white border-pink-500'
                        : 'hover:bg-pink-50 hover:border-pink-300 text-gray-700 border-gray-300 bg-white'
                    }`}
                    onClick={() => toggleSelection(field, 'preferredFields')}
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">AI Counselor</h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Let's Get to Know You Better
            </h2>
            <p className="text-slate-600">
              Help us create a personalized experience just for you
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  index <= currentStep
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    (() => {
                      const IconComponent = step.icon
                      return <IconComponent className="w-5 h-5" />
                    })()
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                    index < currentStep ? 'bg-indigo-500' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 mt-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-xl">
              <div className="text-center pb-6 pt-8 px-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r ${steps[currentStep].color}`}>
                  {(() => {
                    const IconComponent = steps[currentStep].icon
                    return <IconComponent className="w-8 h-8 text-white" />
                  })()}
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-slate-600">
                  {steps[currentStep].subtitle}
                </p>
              </div>
              
              <div className="px-8 pb-8">
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className={`flex items-center px-6 py-3 bg-gradient-to-r ${steps[currentStep].color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        Complete Setup
                        <Sparkles className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default OnboardingFlow
