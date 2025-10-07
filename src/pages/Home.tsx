import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Sparkles, Brain, MessageCircle, History, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const services = [
    {
      title: 'Diet AI',
      description: 'Get personalized nutrition advice and meal planning',
      icon: Apple,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600',
      link: '/diet-ai',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Skin Care AI',
      description: 'Advanced skincare analysis and personalized routines',
      icon: Sparkles,
      color: 'from-pink-500 to-purple-500',
      hoverColor: 'hover:from-pink-600 hover:to-purple-600',
      link: '/skincare-ai',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Well Being AI',
      description: 'Mental health support and wellness guidance',
      icon: Brain,
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-600',
      link: '/wellbeing-ai',
      image: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  const recentChats = [
    { id: 1, title: 'Diet plan for weight loss', service: 'Diet AI', time: '2 hours ago' },
    { id: 2, title: 'Acne treatment routine', service: 'Skin Care AI', time: '1 day ago' },
    { id: 3, title: 'Stress management tips', service: 'Well Being AI', time: '3 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Your AI-Powered'}
              <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {isAuthenticated ? 'Ready to continue your health journey?' : 'Health Companion'}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {isAuthenticated 
                ? 'Choose an AI assistant below to continue your personalized health journey'
                : 'Get personalized advice on diet, skincare, and wellbeing with our advanced AI technology'
              }
            </p>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Free Trial
              </Link>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={index}
                  to={service.link}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} ${service.hoverColor} transition-all duration-300 mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      Start Chat
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {isAuthenticated ? (
            <>
          {/* New Chat Button */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Link 
              to="/diet-ai"
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Chat
            </Link>
          </div>

          {/* Chat History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <History className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Chats</h3>
            </div>
            <div className="space-y-3">
              {recentChats.map((chat) => (
                <div key={chat.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <MessageCircle className="w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-gray-500">{chat.service}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Chats This Week</span>
                <span className="text-lg font-bold text-green-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Goals Achieved</span>
                <span className="text-lg font-bold text-blue-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Streak Days</span>
                <span className="text-lg font-bold text-purple-600">7</span>
              </div>
            </div>
          </div>
            </>
          ) : (
            <>
            {/* Quick Access */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
              <div className="space-y-3">
                <Link
                  to="/diet-ai"
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                >
                  <Apple className="w-4 h-4 mr-2" />
                  Diet AI
                </Link>
                <Link
                  to="/skincare-ai"
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Skincare AI
                </Link>
                <Link
                  to="/wellbeing-ai"
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Wellbeing AI
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Features</h3>
              <p className="text-gray-600 mb-4">
                Sign up to unlock premium features like chat history, progress tracking, and priority support.
              </p>
              <div className="space-y-3">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Get Premium
                </Link>
                <Link
                  to="/signin"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;