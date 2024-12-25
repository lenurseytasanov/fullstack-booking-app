import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
		 <div className="event-create-container">
			  <h1>Результаты регистрации: {event?.eventTitle}</h1>
			  
			  {participants.map(participant => (
					<div key={participant.id} className="participant-card">
						 <h3>{participant.name}</h3>
						 <p>Email: {participant.email}</p>
						 <p>Телефон: {participant.phone}</p>
						 
						 {/* Дополнительные ответы */}
						 {Object.entries(participant.additionalAnswers).map(([question, answer]) => (
							  <p key={question}>{question}: {answer}</p>
						 ))}
						 
						 <p>Дата регистрации: {new Date(participant.registrationDate).toLocaleString()}</p>
					</div>
			  ))}
		 </div>
	);
};

export default EventResult;
