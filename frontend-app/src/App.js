import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import EventCreate from './components/EventCreate/EventCreate';
import EventRegister from './components/EventRegister';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Начальный экран */}
          <Route path="/" element={<WelcomeScreen />} />
          
          {/* Экран создания новой анкеты */}
          <Route path="/create" element={<EventCreate />} />
          
          {/* Экран с существующей анкетой по коду */}
          <Route path="/form/:formId" element={<EventDetails />} />
          
          {/* Экран регистрации на мероприятие */}
          <Route path="/register" element={<EventRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;