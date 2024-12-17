import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import EventCreate from './components/EventCreate/EventCreate';
import EventRegister from './components/EventRegister/EventRegister';
import EventResult from './components/EventResult/EventResult';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Начальный экран */}
          <Route path="/" element={<WelcomeScreen />} />
          
          {/* Экран создания новой анкеты */}
          <Route path="/create" element={<EventCreate />} />
          
          {/* Экран с результатом записи участников */}
          <Route path="/form/:formId" element={<EventResult />} />
          
          {/* Экран регистрации на мероприятие */}
          <Route path="/register/:formId" element={<EventRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;