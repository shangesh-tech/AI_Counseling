import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Brain,
  Heart,
  Target,
  CheckCircle,
  Sparkles,
  GraduationCap,
  MapPin,
  Award,
} from "lucide-react";
import axios from "axios";

const OnboardingFlow = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    school: "",
    location: "",
    skills: [],
    interests: [],
    passions: "",
    goals: "",
    preferredFields: [],
    marks: "",
    exams: {
      sat: "",
      jee: "",
      neet: "",
      boards: "",
    },
  });

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Tell us about yourself",
      icon: User,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "academic",
      title: "Academic Background",
      subtitle: "Your educational journey",
      icon: GraduationCap,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "skills",
      title: "Skills & Interests",
      subtitle: "What are you passionate about?",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "goals",
      title: "Career Aspirations",
      subtitle: "Your future plans",
      icon: Target,
      color: "from-pink-500 to-red-600",
    },
  ];

  // Simplified and non-redundant options
  const skillOptions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English Literature",
    "History",
    "Geography",
    "Economics",
    "Psychology",
    "Art & Design",
    "Music",
    "Sports",
    "Leadership",
    "Public Speaking",
    "Creative Writing",
    "Research",
    "Problem Solving",
    "Communication",
    "Innovation",
  ];

  const interestOptions = [
    "Technology & Programming",
    "Medical & Healthcare",
    "Engineering & Innovation",
    "Business & Entrepreneurship",
    "Arts & Creative Fields",
    "Science & Research",
    "Education & Teaching",
    "Social Work & NGO",
    "Media & Communication",
    "Finance & Investment",
    "Law & Governance",
    "Environment & Sustainability",
  ];

  const fieldOptions = [
    "Computer Science & IT",
    "Medical & Healthcare",
    "Engineering",
    "Business & Management",
    "Arts & Humanities",
    "Science & Research",
    "Law & Legal Studies",
    "Media & Communication",
    "Design & Creative Arts",
    "Finance & Economics",
    "Social Work",
    "Education & Teaching",
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {

        const finalData = {
          ...formData,
          jobPreferences: formData.preferredFields,
          knowledge: formData.skills,
        };

        localStorage.setItem("onboardingData", JSON.stringify(finalData));

        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://ai-counseling-9ybe.onrender.com/analysis",
          finalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Report generated successfully:", response.data);

        // Call onComplete with success data - this should navigate to dashboard
        onComplete({
          success: true,
          reportData: response.data,
          formData: finalData,
        });
      } catch (error) {
        console.error("Error generating report:", error);
        onComplete({
          success: false,
          error: error.response?.data?.error || "Failed to generate report",
          formData: {
            ...formData,
            jobPreferences: formData.preferredFields,
            knowledge: formData.skills,
          },
        });
      } finally {
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSelection = (item, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() && formData.age && formData.grade.trim();
      case 1:
        return formData.school.trim() && formData.location.trim();
      case 2:
        return formData.skills.length > 0 && formData.interests.length > 0;
      case 3:
        return formData.goals.trim() && formData.preferredFields.length > 0;
      default:
        return true;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Age *
                </label>
                <input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, age: e.target.value }))
                  }
                  placeholder="Your age"
                  min="12"
                  max="25"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Current Grade/Year *
              </label>
              <input
                id="grade"
                type="text"
                value={formData.grade}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, grade: e.target.value }))
                }
                placeholder="e.g., 12th Grade, 1st Year College"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="school"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                School/College Name *
              </label>
              <input
                id="school"
                type="text"
                value={formData.school}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, school: e.target.value }))
                }
                placeholder="Enter your institution name"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Location *
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="City, State"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="marks"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Recent Academic Performance
              </label>
              <input
                id="marks"
                type="text"
                value={formData.marks}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, marks: e.target.value }))
                }
                placeholder="e.g., 85% in 12th, 8.5 CGPA"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Exam Scores (if applicable)
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="JEE Score"
                  value={formData.exams.jee}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      exams: { ...prev.exams, jee: e.target.value },
                    }))
                  }
                  className="h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="NEET Score"
                  value={formData.exams.neet}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      exams: { ...prev.exams, neet: e.target.value },
                    }))
                  }
                  className="h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Select your strongest skills and subjects *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <motion.button
                    key={skill}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className={`p-3 text-center rounded-xl text-sm font-medium border-2 transition-all ${
                      formData.skills.includes(skill)
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-500 shadow-lg"
                        : "hover:bg-indigo-50 hover:border-indigo-300 text-gray-700 border-gray-200 bg-white hover:shadow-md"
                    }`}
                    onClick={() => toggleSelection(skill, "skills")}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Selected: {formData.skills.length} skills
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                What areas interest you most? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <motion.button
                    key={interest}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className={`p-4 text-left rounded-xl text-sm font-medium border-2 transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-500 shadow-lg"
                        : "hover:bg-purple-50 hover:border-purple-300 text-gray-700 border-gray-200 bg-white hover:shadow-md"
                    }`}
                    onClick={() => toggleSelection(interest, "interests")}
                  >
                    {interest}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="passions"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Tell us about your passions (Optional)
              </label>
              <textarea
                id="passions"
                value={formData.passions}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, passions: e.target.value }))
                }
                placeholder="What drives you? What are you passionate about?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="goals"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                What are your career goals and aspirations? *
              </label>
              <textarea
                id="goals"
                value={formData.goals}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, goals: e.target.value }))
                }
                placeholder="Describe your career aspirations, dream job, or what you want to achieve in your professional life..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Which career fields would you like to explore? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fieldOptions.map((field) => (
                  <motion.button
                    key={field}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className={`p-4 text-left rounded-xl text-sm font-medium border-2 transition-all ${
                      formData.preferredFields.includes(field)
                        ? "bg-gradient-to-r from-pink-500 to-red-500 text-white border-pink-500 shadow-lg"
                        : "hover:bg-pink-50 hover:border-pink-300 text-gray-700 border-gray-200 bg-white hover:shadow-md"
                    }`}
                    onClick={() => toggleSelection(field, "preferredFields")}
                  >
                    {field}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Selected: {formData.preferredFields.length} fields
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Counselor
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Let's Get to Know You Better
            </h2>
            <p className="text-slate-600 text-lg">
              Help us create a personalized career roadmap just for you
            </p>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    index < steps.length - 1 ? "flex-1" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      index <= currentStep
                        ? `bg-gradient-to-r ${step.color} text-white`
                        : "bg-white text-slate-400 border-2 border-slate-200"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-2 mx-4 rounded-full transition-all ${
                        index < currentStep
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-3 text-center font-medium">
            Step {currentStep + 1} of {steps.length} • {Math.round(progress)}%
            Complete
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="text-center pb-8 pt-10 px-8">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-r ${steps[currentStep].color} shadow-lg`}
                >
                  {(() => {
                    const IconComponent = steps[currentStep].icon;
                    return <IconComponent className="w-10 h-10 text-white" />;
                  })()}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  {steps[currentStep].title}
                </h2>
                <p className="text-slate-600 text-lg">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              <div className="px-8 pb-10">
                {renderStepContent()}

                <div className="flex justify-between mt-10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm disabled:shadow-none"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`flex items-center px-8 py-4 bg-gradient-to-r ${steps[currentStep].color} text-white rounded-xl hover:shadow-lg transition-all font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-sm`}
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        Generate Report
                        <Sparkles className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;
