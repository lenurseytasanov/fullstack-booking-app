import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import EventCreate from './components/EventCreate/EventCreate';
import EventRegister from './components/EventRegister/EventRegister';
import EventResult from './components/EventResult/EventResult';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/create" element={<Layout><EventCreate /></Layout>} />
        <Route path="/results/:eventId" element={<Layout><EventResult /></Layout>} />
        <Route path="/register/:eventId" element={<Layout><EventRegister /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;