import React, { useState } from 'react';
import axios from 'axios';

/**
 * Компонент для регистрации на мероприятие
 */
const EventRegister = () => {
  /**
   * Состояние для хранения ID мероприятия
   */
  const [eventId, setEventId] = useState('');

  /**
   * Состояние для хранения имени пользователя
   */
  const [name, setName] = useState('');

  /**
   * Состояние для хранения электронной почты пользователя
   */
  const [email, setEmail] = useState('');

  /**
   * Функция для отправки формы регистрации на мероприятие
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/events/${eventId}/register`, {
      name,
      email,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  /**
   * Рендер формы регистрации на мероприятие
   */
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event ID:
        <input type="text" value={eventId} onChange={(event) => setEventId(event.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default EventRegister;