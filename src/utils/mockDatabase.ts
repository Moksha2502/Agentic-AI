// Simple localStorage-based chat storage - no MongoDB needed
export interface SimpleMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface SimpleChat {
  id: string;
  title: string;
  messages: SimpleMessage[];
  updatedAt: Date;
  type: 'diet' | 'skincare' | 'wellbeing';
}

class SimpleStorage {
  private getStorageKey(chatType: string): string {
    return `nutriderma-${chatType}-chats`;
  }

  getChats(chatType: string): SimpleChat[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(chatType));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    }
    return [];
  }

  saveChats(chatType: string, chats: SimpleChat[]): void {
    try {
      localStorage.setItem(this.getStorageKey(chatType), JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats:', error);
    }
  }

  addChat(chatType: string, chat: SimpleChat): void {
    const chats = this.getChats(chatType);
    chats.unshift(chat);
    this.saveChats(chatType, chats);
  }

  updateChat(chatType: string, chatId: string, updatedChat: SimpleChat): void {
    const chats = this.getChats(chatType);
    const index = chats.findIndex(c => c.id === chatId);
    if (index !== -1) {
      chats[index] = updatedChat;
      this.saveChats(chatType, chats);
    }
  }

  deleteChat(chatType: string, chatId: string): void {
    const chats = this.getChats(chatType);
    const filteredChats = chats.filter(c => c.id !== chatId);
    this.saveChats(chatType, filteredChats);
  }
}

export const simpleStorage = new SimpleStorage();