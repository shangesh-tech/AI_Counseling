import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  ArrowLeft,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  MessageCircle,
  Sparkles,
  User,
  Bot,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

const AIVoiceChat = () => {
  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI career counselor. I'm here to help you with university selection, career guidance, and academic planning. How can I assist you today?",
      timestamp: new Date(Date.now() - 60000)
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const messagesEndRef = useRef(null)

  // Simulated audio level animation
  useEffect(() => {
    let interval
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
    } else {
      setAudioLevel(0)
    }
    return () => clearInterval(interval)
  }, [isListening])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const quickQuestions = [
    "What are the best universities for Computer Science?",
    "How do I improve my SAT scores?",
    "What career options are available in AI?",
    "Which courses should I take in 12th grade?",
    "How do I write a good college application essay?",
    "What are the admission requirements for MIT?"
  ]

  const aiResponses = [
    "Based on your interests in technology and your strong mathematics background, I'd recommend focusing on Computer Science programs at top universities like MIT, Stanford, and Carnegie Mellon. These schools have excellent AI and machine learning programs.",
    
    "To improve your SAT scores, I suggest focusing on your weaker areas first. Practice regularly with official SAT prep materials, take timed practice tests, and consider working with a tutor if needed. Most students see significant improvement with consistent practice.",
    
    "AI offers exciting career opportunities! You could become an AI/ML Engineer, Data Scientist, Research Scientist, or AI Product Manager. The field is growing rapidly with high demand and excellent salaries. Would you like me to explain any of these roles in detail?",
    
    "For 12th grade, I recommend taking Advanced Mathematics, Physics, Chemistry, and Computer Science if available. These subjects will strengthen your foundation for engineering and science programs. Also consider taking the SAT or ACT during this year.",
    
    "A great college essay should tell your unique story and show your personality. Focus on specific experiences that shaped you, demonstrate growth and learning, and connect your experiences to your future goals. Avoid generic topics and be authentic.",
    
    "MIT typically looks for students with exceptional academic performance (95%+ grades), high SAT scores (1520+), strong extracurricular activities, and demonstrated passion for STEM. They also value leadership, innovation, and the ability to contribute to their community."
  ]

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        handleSendMessage("What are the best universities for Computer Science?")
      }, 3000)
    }
  }

  const handleSendMessage = (content = textInput) => {
    if (!content.trim()) return
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setTextInput('')
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickQuestion = (question) => {
    handleSendMessage(question)
  }

  const speakMessage = (content) => {
    setIsSpeaking(true)
    // Simulate speech synthesis
    setTimeout(() => {
      setIsSpeaking(false)
    }, 3000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">AI Voice Chat</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Chat with Your <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">AI Counselor</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get instant guidance on university selection, career planning, and academic decisions through voice or text.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white rounded-lg shadow-lg border h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="border-b bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Career Counselor</h3>
                    <p className="text-sm text-slate-600">Always here to help</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setMessages([messages[0]])}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${
                              message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </span>
                            {message.type === 'ai' && (
                              <button
                                onClick={() => speakMessage(message.content)}
                                className={`p-1 rounded hover:bg-slate-200 transition-colors ${
                                  isSpeaking ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                                }`}
                              >
                                {isSpeaking ? (
                                  <Volume2 className="w-3 h-3" />
                                ) : (
                                  <Play className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t p-6">
              {/* Quick Questions */}
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Visualization */}
              {isListening && (
                <div className="mb-4 flex justify-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-indigo-500 rounded-full transition-all duration-150"
                        style={{
                          height: `${Math.max(4, (audioLevel + Math.random() * 20) / 3)}px`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Input Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleVoiceToggle}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'border border-indigo-200 hover:border-indigo-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Voice Chat
                    </>
                  )}
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!textInput.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-100"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-2 text-center">
                {isListening
                  ? "Listening... Speak clearly into your microphone"
                  : "Click the microphone to start voice chat or type your question"
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Voice Recognition</h3>
              <p className="text-sm text-slate-600">
                Speak naturally and get instant responses from our AI counselor
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Smart Guidance</h3>
              <p className="text-sm text-slate-600">
                Get personalized advice based on your profile and goals
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">24/7 Available</h3>
              <p className="text-sm text-slate-600">
                Get help anytime, anywhere with our always-on AI assistant
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIVoiceChat
