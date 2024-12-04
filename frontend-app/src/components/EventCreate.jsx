import React, { useState } from 'react';
import axios from 'axios';

/**
 * Компонент для создания нового мероприятия
 */
const EventCreate = () => {
  /**
   * Состояние для хранения имени мероприятия
   */
  const [name, setName] = useState('');

  /**
   * Состояние для хранения описания мероприятия
   */
  const [description, setDescription] = useState('');

  /**
   * Состояние для хранения даты мероприятия
   */
  const [date, setDate] = useState('');

  /**
   * Состояние для хранения времени мероприятия
   */
  const [time, setTime] = useState('');

  /**
   * Функция для отправки формы создания мероприятия
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/events', {
      name,
      description,
      date,
      time,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  /**
   * Рендер формы создания мероприятия
   */
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
      </label>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventCreate;