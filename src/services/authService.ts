import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api';

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    subscription: {
      plan: string;
      isActive: boolean;
      endDate: string;
    };
  };
  message?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class AuthService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      }, {
        headers: this.getAuthHeaders()
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
        headers: this.getAuthHeaders()
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });
      
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  }

  async updateProfile(userData: Partial<RegisterData>) {
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/profile`, userData, {
        headers: this.getAuthHeaders()
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }
}

export const authService = new AuthService();