import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { Sparkles } from 'lucide-react';

const SkinCareAI = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mr-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skin Care AI</h1>
            <p className="text-gray-600">Your personalized skincare consultant</p>
          </div>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <p className="text-pink-800">
            Welcome to Skin Care AI! I can analyze your skin type, recommend products, 
            create custom routines, and help you achieve your skincare goals.
          </p>
        </div>
      </div>
      
      <ChatInterface 
        chatType="skincare"
        placeholderText="Ask me about skincare routines, product recommendations, skin concerns, or treatments..."
        suggestions={[
          "What's the best routine for acne-prone skin?",
          "Recommend products for anti-aging",
          "How to treat dark circles?",
          "Create a morning skincare routine"
        ]}
      />
    </div>
  );
};

export default SkinCareAI;