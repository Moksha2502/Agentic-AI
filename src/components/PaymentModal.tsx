import React, { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { paymentService } from '../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    features: string[];
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would collect card details here
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h4>
            <p className="text-gray-600">Welcome to {plan.name}!</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{plan.name}</h4>
              <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}/month</p>
              <div className="space-y-2">
                {plan.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Information
              </label>
              <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                <div className="flex items-center text-gray-500">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span className="text-sm">Secure payment processing</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Demo mode - No actual payment will be processed
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;