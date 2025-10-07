import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import DietAI from './pages/DietAI';
import SkinCareAI from './pages/SkinCareAI';
import WellBeingAI from './pages/WellBeingAI';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/diet-ai" element={<DietAI />} />
            <Route path="/skincare-ai" element={<SkinCareAI />} />
            <Route path="/wellbeing-ai" element={<WellBeingAI />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;