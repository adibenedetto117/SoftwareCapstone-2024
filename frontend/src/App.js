import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EquipmentPage from './components/EquipmentPage';
import ProtectedRoute from './components/ProtectedRoute';
import HowToSignUp from './components/HowToSignUp';
import Chatbot from './components/Chatbot';
import TrainingPlansPage from './components/TrainingPlansPage';
import NutritionGuide from './components/NutritionGuide'; // Import Nutrition Guide
import GearGuide from './components/EssentialGear'; // Import Gear Guide
import RaceDayPreparation from './components/RaceDayPrep'; // Import Race Day Preparation

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/products"
          element={<ProtectedRoute component={EquipmentPage} />}
        />
        <Route path="/how-to-sign-up" element={<HowToSignUp />} />
        <Route path="/training-plans" element={<TrainingPlansPage />} />
        <Route path="/nutrition-guide" element={<NutritionGuide />} /> {/* Nutrition Guide Route */}
        <Route path="/gear-guide" element={<GearGuide />} /> {/* Gear Guide Route */}
        <Route path="/race-day-preparation" element={<RaceDayPreparation />} /> {/* Race Day Prep Route */}
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
