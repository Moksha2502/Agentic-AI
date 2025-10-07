import axios from 'axios';
import { IChat, IMessage } from '../models/Chat';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api';

export class ChatService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Create a new chat
  async createNewChat(chatType: 'diet' | 'skincare' | 'wellbeing'): Promise<IChat> {
    try {
      const response = await axios.post(`${API_BASE_URL}/chats`, {
        chatType,
        title: `New ${chatType} chat`
      }, {
        headers: this.getAuthHeaders()
      });
      
      return response.data.chat;
    } catch (error: any) {
      console.error('Error creating new chat:', error);
      throw new Error(error.response?.data?.message || 'Failed to create chat');
    }
  }

  // Get all chats for user
  async getUserChats(chatType?: string): Promise<IChat[]> {
    try {
      const url = chatType 
        ? `${API_BASE_URL}/chats?chatType=${chatType}`
        : `${API_BASE_URL}/chats`;
        
      const response = await axios.get(url, {
        headers: this.getAuthHeaders()
      });
      
      return response.data.chats;
    } catch (error: any) {
      console.error('Error fetching user chats:', error);
      return [];
    }
  }

  // Get specific chat
  async getChat(chatId: string): Promise<IChat | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/chats/${chatId}`, {
        headers: this.getAuthHeaders()
      });
      
      return response.data.chat;
    } catch (error: any) {
      console.error('Error fetching chat:', error);
      return null;
    }
  }

  // Send message to AI and save to database
  async sendMessage(chatId: string, message: string, chatType: 'diet' | 'skincare' | 'wellbeing'): Promise<IMessage> {
    try {
      // Send message to backend (which will use Gemini AI)
      const response = await axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, {
        message,
        chatType
      }, {
        headers: this.getAuthHeaders()
      });

      return response.data.aiMessage;
    } catch (error: any) {
      console.error('Error sending message:', error);
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }

  // Delete a chat
  async deleteChat(chatId: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/chats/${chatId}`, {
        headers: this.getAuthHeaders()
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting chat:', error);
      return false;
    }
  }

}

export const chatService = new ChatService();