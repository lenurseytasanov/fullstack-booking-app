import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './eventResult.scss'

const EventResult = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const currentEvent = events.find(e => e.id === Number(eventId));
    
    const allParticipants = JSON.parse(localStorage.getItem('participants') || '[]');
    const eventParticipants = allParticipants.filter(p => p.eventId === Number(eventId));

    setEvent(currentEvent);
    setParticipants(eventParticipants);
  }, [eventId]);

  return (
    <div className="layout-container">
      <div className="content-wrapper">
        <div className="participant-grid">
          {participants.map(participant => (
            <div key={participant.id}>
              <div className="grid-row">
                <p className="label">ФИО</p>
                <p className="value">{participant.name}</p>
              </div>
              <div className="grid-row">
                <p className="label">E-mail</p>
                <p className="value">{participant.email}</p>
              </div>
              <div className="grid-row">
                <p className="label">Телефон</p>
                <p className="value">{participant.phone}</p>
              </div>

              {Object.entries(participant.additionalAnswers).map(([question, answer]) => (
                <div className="grid-row" key={question}>
                  <p className="label">{question}</p>
                  <p className="value">{answer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="info-container">
          <div className="info-content">
            <p className="info-title">
              Получено {new Date().toLocaleString('ru-RU')}
            </p>
            <p className="info-subtitle">
              Ответ получен вовремя
            </p>
          </div>
          <button className="download-button">
            <span>Скачать PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventResult;
