import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api";

class PaymentService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Mock: Create payment intent
  async createPaymentIntent(plan: string, amount: number) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/create-payment-intent`,
        { plan, amount },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create payment intent"
      );
    }
  }

  // Mock: Create subscription
  async createSubscription(plan: string) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/create-subscription`,
        { plan },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create subscription"
      );
    }
  }

  // Mock: Cancel subscription
  async cancelSubscription() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/cancel-subscription`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to cancel subscription"
      );
    }
  }

  // Simulate a full payment process
  async processPayment(plan: string, amount: number) {
    try {
      // Create a payment intent (mock)
      const paymentIntent = await this.createPaymentIntent(plan, amount);

      // Create subscription (mock)
      const subscription = await this.createSubscription(plan);

      return { paymentIntent, subscription };
    } catch (error: any) {
      throw new Error(error.message || "Payment failed");
    }
  }
}

export const paymentService = new PaymentService();
