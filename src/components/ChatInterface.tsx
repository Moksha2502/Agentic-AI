import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Plus, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}

interface ChatInterfaceProps {
  chatType: "diet" | "skincare" | "wellbeing";
  placeholderText: string;
  suggestions: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatType,
  placeholderText,
  suggestions,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_BASE =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api";

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from localStorage
  // Load chat history from backend on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${API_BASE}/chats?chatType=${chatType}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }
        const data = await response.json();
        const chats: Chat[] = data.chats.map((chat: any) => ({
          id: chat._id,
          title: chat.title,
          messages: chat.messages,
          updatedAt: new Date(chat.updatedAt),
        }));
        setChatHistory(chats);
      } catch (err: any) {
        console.error("Error fetching chat history:", err);
        setChatHistory([]); // fallback
      }
    };

    fetchChatHistory();
  }, [chatType]);

  const saveChatsToStorage = (chats: Chat[]) => {
    localStorage.setItem(`nutriderma-${chatType}-chats`, JSON.stringify(chats));
    setChatHistory(chats);
  };

  // Create a new chat (chatType optional)
  const createNewChat = async (): Promise<string | null> => {
    try {
      const response = await fetch(`${API_BASE}/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatType }), // chatType is optional on backend now
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create chat");
      }

      const data = await response.json();
      const chat: Chat = {
        id: data.chat._id,
        title: data.chat.title,
        messages: data.chat.messages,
        updatedAt: new Date(data.chat.updatedAt),
      };

      const updatedChats = [chat, ...chatHistory];
      saveChatsToStorage(updatedChats);
      setCurrentChatId(chat.id);
      setMessages([]);
      return chat.id;
    } catch (err: any) {
      console.error(err);
      alert(`Failed to create chat: ${err.message}`);
      return null;
    }
  };

  const loadChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const deleteChat = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedChats = chatHistory.filter((c) => c.id !== chatId);
    saveChatsToStorage(updatedChats);
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  // Send message
  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    setIsLoading(true);

    try {
      let chatId = currentChatId;
      if (!chatId) {
        chatId = await createNewChat();
        if (!chatId) return;
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");

      // Send message to backend
      const response = await fetch(`${API_BASE}/chats/${chatType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: messageText }), // no chatType required
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to send message");
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.aiMessage?.text || "AI response not available",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      const updatedChats = chatHistory.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage, aiMessage],
              updatedAt: new Date(),
            }
          : chat
      );
      saveChatsToStorage(updatedChats);
    } catch (err: any) {
      console.error("Send message error:", err);
      alert(`Error sending message: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${Math.floor(diffHours)} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Chat History</h3>
        </div>
        <button
          onClick={createNewChat}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" /> New Chat
        </button>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <div className="text-center py-4">
              <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No chats yet</p>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 group relative ${
                  currentChatId === chat.id
                    ? "bg-blue-100 border border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1 min-w-0">
                    <MessageCircle className="w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(chat.updatedAt)}
                      </p>
                      {chat.messages.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {chat.messages[chat.messages.length - 1].text}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all duration-200"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {chatType} AI
            </h2>
            <p className="text-sm text-gray-500">
              {currentChatId
                ? "Active conversation"
                : "Start a new conversation"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading ? "bg-yellow-400" : "bg-green-400"
              }`}
            ></div>
            <span className="text-xs text-gray-500">
              {isLoading ? "Thinking..." : "Ready"}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start a conversation
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose a suggestion below or type your own question
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isLoading}
                    className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-6 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.sender === "ai" ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center space-x-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholderText}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
