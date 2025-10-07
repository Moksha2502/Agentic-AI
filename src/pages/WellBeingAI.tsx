import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { Brain } from 'lucide-react';

const WellBeingAI = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mr-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Well Being AI</h1>
            <p className="text-gray-600">Your mental health and wellness companion</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            Welcome to Well Being AI! I'm here to support your mental health, provide stress management techniques, 
            and guide you towards better overall wellness.
          </p>
        </div>
      </div>
      
      <ChatInterface 
        chatType="wellbeing"
        placeholderText="Ask me about stress management, meditation, sleep, mood improvement, or wellness tips..."
        suggestions={[
          "Help me manage work stress",
          "Teach me breathing exercises",
          "How to improve my sleep quality?",
          "Suggest mindfulness activities"
        ]}
      />
    </div>
  );
};

export default WellBeingAI;