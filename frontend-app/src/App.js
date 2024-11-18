import React from 'react';
import EventList from './components/EventList';
import EventCreate from './components/EventCreate';
import EventRegister from './components/EventRegister';
import EventDetails from './components/EventDetails';
import Form from './components/Form';

function App() {
  return (
    <div>
      <h1>Мероприятия</h1>
      <EventList />
      <EventCreate />
      <EventRegister />
      <EventDetails />
      <Form />
    </div>
  );
}

export default App;