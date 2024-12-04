import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Компонент для отображения деталей мероприятия
 */
const EventDetails = () => {
  /**
   * Состояние для хранения деталей мероприятия
   */
  const [event, setEvent] = useState({});

  /**
   * Хук для получения деталей мероприятия при монтировании компонента
   */
  useEffect(() => {
    const eventId = window.location.pathname.split('/').pop();
    axios.get(`/api/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  /**
   * Рендер деталей мероприятия
   */
  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Дата: {event.date}</p>
      <p>Время: {event.time}</p>
    </div>
  );
};

export default EventDetails;