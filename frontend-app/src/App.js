import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import EventCreate from './components/EventCreate/EventCreate';
import EventRegister from './components/EventRegister/EventRegister';
import EventResult from './components/EventResult/EventResult';

const Layout = ({ children, title }) => (
	<>
	  <Header title={title} />
	  {children}
	</>
 );
 
 function App() {
	return (
	  <Router>
		 <Routes>
			<Route path="/" element={<WelcomeScreen />} />
			<Route path="/create" element={
			  <Layout title={{parent: "Навигация", name: "Создание анкеты"}}>
				 <EventCreate />
			  </Layout>
			} />
			<Route path="/results/:eventId" element={
			  <Layout title={{parent: "Навигация", name: "Результаты регистрации"}}>
				 <EventResult />
			  </Layout>
			} />
			<Route path="/register/:eventId" element={
			  <Layout title={{parent: "Навигация", name: "Запись на мероприятие"}}>
				 <EventRegister />
			  </Layout>
			} />
		 </Routes>
	  </Router>
	);
 }

export default App;