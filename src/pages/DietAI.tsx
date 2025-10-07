import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { Apple } from 'lucide-react';

const DietAI = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4">
            <Apple className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Diet AI</h1>
            <p className="text-gray-600">Your personalized nutrition companion</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">
            Welcome to Diet AI! I can help you with personalized meal planning, nutritional analysis, 
            dietary recommendations, and answer any questions about healthy eating.
          </p>
        </div>
      </div>
      
      <ChatInterface 
        chatType="diet"
        placeholderText="Ask me about nutrition, meal planning, healthy recipes, or dietary advice..."
        suggestions={[
          "Create a meal plan for weight loss",
          "What are the best foods for muscle building?",
          "Help me plan a low-carb diet",
          "Suggest healthy breakfast recipes"
        ]}
      />
    </div>
  );
};

export default DietAI;