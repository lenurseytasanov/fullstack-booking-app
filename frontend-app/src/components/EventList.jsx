import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Компонент для отображения списка мероприятий
 */
const EventList = () => {
  /**
   * Состояние для хранения списка мероприятий
   */
  const [events, setEvents] = useState([]);

  /**
   * Хук для получения списка мероприятий при монтировании компонента
   */
  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  /**
   * Рендер списка мероприятий
   */
  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;