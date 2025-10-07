
---

# NutriDerma AI - Healthcare Chatbot Website

An AI-powered healthcare platform providing personalized assistance for **diet, skincare, and wellbeing**.

## Features

* **Multi-AI Chat System**: Separate AI assistants for Diet, Skincare, and Wellbeing
* **Real-time Chat Interface**: Interactive chat with message history and persistence
* **MongoDB Integration**: Full database support with localStorage fallback
* **Responsive Design**: Mobile-first, modern UI/UX
* **User Authentication**: Sign in/Register pages with JWT-based auth
* **Chat Management**: Create, delete, and switch chats
* **Loading & Error Handling**: Clear user feedback for messages and API calls

## Tech Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Icons**: Lucide React
* **Routing**: React Router DOM
* **HTTP Client**: Fetch API
* **Build Tool**: Vite

## Getting Started

### Prerequisites

* Node.js 16+
* MongoDB running locally or remotely

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/NutriDerma-AI.git
   cd NutriDerma-AI
   ```
2. Install dependencies for both frontend and backend:

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```
3. Create environment file:

   ```bash
   cp .env.example .env
   ```
4. Update `.env`:

   ```env
   MONGODB_URI=mongodb://localhost:27017/nutriderma-ai
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```

   * This runs **frontend** on Vite and **backend** on Express.

## Database Schema

### Chat Collection

```javascript
{
  _id: ObjectId,
  userId: String,
  chatType: 'diet' | 'skincare' | 'wellbeing',
  title: String,
  messages: [
    {
      id: String,
      text: String,
      sender: 'user' | 'ai',
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String, // hashed
  subscription: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Auth

* **POST /api/auth/register** – Register a user
* **POST /api/auth/login** – Login a user
* **GET /api/auth/me** – Get current logged-in user

### Chat

* **POST /api/chats** – Create new chat
* **GET /api/chats?chatType=diet|skincare|wellbeing** – Get chat history
* **POST /api/chats/:chatType** – Send message to AI
* **DELETE /api/chats/:chatId** – Delete a chat

## Chat System Features

* ✅ Real-time messaging
* ✅ Chat history with persistence
* ✅ New chat creation & deletion
* ✅ Auto-generated chat titles
* ✅ Message timestamps
* ✅ Loading and error states

## UI/UX

* ✅ Mobile-first responsive design
* ✅ Smooth animations and transitions
* ✅ Modern, professional healthcare aesthetic
* ✅ Accessible navigation

## Customization

* **Add new AI types:** Update `chatType` in backend models and frontend types
* **Styling:** Modify Tailwind classes in `src/index.css` or extend Tailwind config
* **AI Integration:** Backend handles AI responses; modify `/routes/chats.js` for logic

## Deployment

* Platforms: Vercel, Netlify, AWS Amplify, Heroku
* Ensure environment variables are set in your deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

