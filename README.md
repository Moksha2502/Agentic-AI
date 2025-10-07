# NutriDerma AI - Complete Healthcare Chatbot Website

A comprehensive AI-powered healthcare platform providing personalized assistance for diet, skincare, and wellbeing.

## Features

- **Multi-AI Chat System**: Separate AI assistants for Diet, Skincare, and Wellbeing
- **Real-time Chat Interface**: Interactive chat with message history and persistence
- **MongoDB Integration**: Full database support with fallback to localStorage
- **Google Colab Integration**: Connect your AI models via ngrok
- **Responsive Design**: Mobile-first design with modern UI/UX
- **User Authentication**: Sign in/Register pages (ready for backend integration)
- **Pricing Plans**: Flexible subscription options with free trial

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: MongoDB with Mongoose (with localStorage fallback)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 16+ 
- MongoDB (optional - uses localStorage fallback)
- Google Colab notebook with ngrok (for AI integration)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/nutriderma-ai
   REACT_APP_NGROK_URL=https://your-ngrok-url.ngrok.io
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Google Colab Integration

### Setting up your Colab notebook:

1. Install required packages in Colab:
   ```python
   !pip install flask flask-cors pyngrok
   ```

2. Create your AI endpoint:
   ```python
   from flask import Flask, request, jsonify
   from flask_cors import CORS
   from pyngrok import ngrok
   
   app = Flask(__name__)
   CORS(app)
   
   @app.route('/api/chat', methods=['POST'])
   def chat():
       data = request.json
       message = data.get('message')
       chat_type = data.get('chatType')
       
       # Your AI logic here
       response = process_ai_request(message, chat_type)
       
       return jsonify({'response': response})
   
   # Start ngrok tunnel
   public_url = ngrok.connect(5000)
   print(f"Public URL: {public_url}")
   
   # Run the app
   app.run(port=5000)
   ```

3. Copy the ngrok URL and update your `.env` file

## Database Schema

### Chat Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  chatType: 'diet' | 'skincare' | 'wellbeing',
  title: String,
  messages: [{
    id: String,
    text: String,
    sender: 'user' | 'ai',
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints (Expected from Colab)

### POST /api/chat
```json
{
  "message": "User's message",
  "chatType": "diet|skincare|wellbeing",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "response": "AI generated response"
}
```

## Features Overview

### Chat System
- ✅ Real-time messaging interface
- ✅ Chat history with persistence
- ✅ New chat creation
- ✅ Chat deletion
- ✅ Auto-generated chat titles
- ✅ Message timestamps
- ✅ Loading states and error handling

### Database
- ✅ MongoDB integration with Mongoose
- ✅ localStorage fallback for development
- ✅ Automatic data persistence
- ✅ Chat CRUD operations

### UI/UX
- ✅ Responsive design (mobile-first)
- ✅ Modern gradient color scheme
- ✅ Smooth animations and transitions
- ✅ Professional healthcare aesthetic
- ✅ Accessible navigation
- ✅ Loading states and feedback

### Pages
- ✅ Home page with service overview
- ✅ About Us with detailed information
- ✅ Pricing with subscription plans
- ✅ Sign In/Register forms
- ✅ Individual AI chat pages

## Customization

### Adding New AI Types
1. Update the `chatType` union type in `src/models/Chat.ts`
2. Add new route in `src/App.tsx`
3. Create new page component
4. Update navigation in `src/components/Header.tsx`

### Styling
- Colors: Modify Tailwind classes or extend the config
- Fonts: Update in `src/index.css`
- Components: All styled with Tailwind CSS classes

### AI Integration
- Update `NGROK_URL` in `src/services/chatService.ts`
- Modify the `callAI` method for different API formats
- Add authentication headers if needed

## Deployment

The app is ready for deployment on platforms like:
- Vercel
- Netlify  
- AWS Amplify
- Heroku

Make sure to set environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.