import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const plans = [
    {
      name: 'Diet AI',
      price: '₹1,500',
      period: '/month',
      description: 'Personalized nutrition guidance and meal planning',
      features: [
        'Personalized meal plans',
        'Nutritional analysis',
        'Recipe recommendations',
        'Dietary restriction support',
        'Progress tracking',
        '24/7 AI support'
      ],
      color: 'from-green-500 to-emerald-500',
      popular: false
    },
    {
      name: 'Skin Care AI',
      price: '₹1,500',
      period: '/month',
      description: 'Advanced skincare analysis and personalized routines',
      features: [
        'Skin type analysis',
        'Product recommendations',
        'Routine optimization',
        'Problem-specific treatments',
        'Progress photos tracking',
        'Expert consultations'
      ],
      color: 'from-pink-500 to-purple-500',
      popular: false
    },
    {
      name: 'Well Being AI',
      price: '₹500',
      period: '/month',
      description: 'Mental health support and wellness guidance',
      features: [
        'Stress management',
        'Mood tracking',
        'Mindfulness exercises',
        'Sleep optimization',
        'Wellness challenges',
        'Community support'
      ],
      color: 'from-blue-500 to-indigo-500',
      popular: false
    },
    {
      name: 'Complete Health Combo',
      price: '₹3,000',
      period: '/month',
      originalPrice: '₹3,500',
      description: 'All three AI services bundled together',
      features: [
        'All Diet AI features',
        'All Skin Care AI features',
        'All Well Being AI features',
        'Priority support',
        'Advanced analytics',
        'Cross-service insights',
        'Premium content access',
        'Monthly expert sessions'
      ],
      color: 'from-purple-600 to-pink-600',
      popular: true,
      savings: 'Save ₹500'
    }
  ];

  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      // Redirect to sign in for payment
      navigate('/signin');
      return;
    }
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Choose Your
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {' '}Health Plan
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Select the perfect AI-powered health solution for your needs. All plans include a 1-month free trial for new users.
        </p>
        <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
          <Star className="w-5 h-5 mr-2" />
          1 Month Free Trial for New Users
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
              plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
                🔥 Most Popular
              </div>
            )}
            
            <div className="p-8">
              {/* Plan Header */}
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${plan.color} mb-6`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mr-2">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mt-2">
                    {plan.savings}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${plan.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the free trial work?
              </h3>
              <p className="text-gray-600">
                New users get complete access to their chosen plan for 1 month absolutely free. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I switch plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade, downgrade, or switch between plans at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade encryption and follow strict privacy protocols to protect your health data.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the combo plan?
              </h3>
              <p className="text-gray-600">
                The combo includes all features from Diet AI, Skin Care AI, and Well Being AI, plus exclusive cross-service insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee if you're not completely satisfied with our service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the AI?
              </h3>
              <p className="text-gray-600">
                Our AI is trained on millions of data points and continuously learning. However, always consult healthcare professionals for serious concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default Pricing;