import React from 'react';
import { Heart, Target, Shield, Award } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: Heart,
      title: 'Comprehensive Health Care',
      description: 'We provide holistic health solutions covering diet, skincare, and mental wellbeing through advanced AI technology.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Target,
      title: 'Personalized Solutions',
      description: 'Our AI analyzes your unique needs and preferences to deliver tailored recommendations for optimal results.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your health data is protected with enterprise-grade security and privacy measures you can trust.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Award,
      title: 'Expert-Backed',
      description: 'Our recommendations are based on scientific research and validated by healthcare professionals.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const services = [
    {
      title: 'Diet & Nutrition AI',
      description: 'Transform your eating habits with personalized meal plans, nutritional analysis, and dietary guidance. Our AI considers your health goals, dietary restrictions, food preferences, and lifestyle to create sustainable nutrition strategies.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      benefits: [
        'Personalized meal planning',
        'Nutritional analysis',
        'Dietary restriction support',
        'Healthy recipe suggestions'
      ]
    },
    {
      title: 'Skin Care AI',
      description: 'Achieve radiant, healthy skin with AI-powered skincare analysis and recommendations. Get personalized routines, product suggestions, and treatment plans based on your skin type, concerns, and environmental factors.',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
      benefits: [
        'Skin type analysis',
        'Product recommendations',
        'Routine optimization',
        'Problem-specific treatments'
      ]
    },
    {
      title: 'Well Being AI',
      description: 'Enhance your mental health and overall wellbeing with compassionate AI support. Access stress management techniques, mindfulness exercises, mood tracking, and personalized wellness strategies for a balanced life.',
      image: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=600',
      benefits: [
        'Stress management',
        'Mood tracking',
        'Mindfulness exercises',
        'Sleep optimization'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About 
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {' '}NutriDerma AI
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're revolutionizing personal healthcare with AI-powered solutions that make expert health guidance accessible, affordable, and personalized for everyone.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            To democratize healthcare by providing intelligent, personalized, and accessible AI-driven solutions 
            that empower individuals to take control of their diet, skincare, and overall wellbeing journey.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Services Detail */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Our AI-Powered Services
        </h2>
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
              <div className="lg:w-1/2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Health Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have already discovered the power of AI-driven health guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;