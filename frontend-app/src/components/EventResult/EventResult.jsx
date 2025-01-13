import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './eventResult.scss'
import axios from 'axios';

const EventResult = () => {
	const { eventId } = useParams();
	const [event, setEvent] = useState(null);
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch event data
				const eventResponse = await axios.get(`/api/v1/events/${eventId}`);
				const eventData = eventResponse.data;
				setEvent({
					title: eventData.name,
					adminName: eventData.adminName,
					adminEmail: eventData.adminEmail,
					description: eventData.description,
					participantCount: eventData.meetings[0]?.availablePlaces || 0,
					eventDate: new Date(eventData.meetings[0]?.startsAt).toLocaleString('ru-RU', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})
				});

				const participantsResponse = await axios.get(`/api/v1/events/${eventId}/participants`);
				setParticipants(participantsResponse.data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};

		fetchData();
	}, [eventId]);


	return (
		<div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root">
			<div className="layout-container">
				<div className="content-wrapper">
					<div className="layout-content-container">
						<div className="event-title">
							<p>{event?.title || 'Загрузка...'}</p>
						</div>

						<h2 className="section-title">Создатель анкеты</h2>
						<div className="creator-info">
							<div className="avatar" style={{ backgroundImage: `url("https://cdn2.iconfinder.com/data/icons/health-care-rounded-7/512/xxx009-1024.png")` }}></div>
							<div className="creator-details">
								<p className="name">{event?.adminName}</p>
								<p className="position">{event?.adminEmail}</p>
							</div>
						</div>

						<div className="event-stats">
							<div className="stat-item full-width">
								<p className="label">Дата мероприятия</p>
								<p className="value">{event?.eventDate}</p>
							</div>
							<div className="stat-item full-width">
								<p className="label">Количество регистраций</p>
								<p className="value">{participants?.length} чел.</p>
							</div>
							<div className="stat-item full-width">
								<p className="label">Свободные места</p>
								<p className="value">{event?.participantCount} / {event?.participantCount + participants?.length}</p>
							</div>
						</div>

						<h2 className="section-title">Список участников</h2>
						{participants.map((participant, index) => (
							<div key={participant.id}>
								<div className="participant-card">
									<div className="avatar" style={{ backgroundImage: `url("https://cdn2.iconfinder.com/data/icons/health-care-rounded-6/512/xxx024-1024.png")` }}></div>
									<div className="participant-details">
										<p className="name">{participant.attributes["ФИО"]}</p>
										<p className="email">{participant.attributes["E-mail"]}, {participant.attributes["Номер телефона"]}</p>
									</div>
								</div>

								<div className="event-stats">
									{Object.entries(participant.attributes).map(([key, value]) => {
										if (key !== "ФИО" && key !== "E-mail" && key !== "Номер телефона") {
											return (
												<div key={key} className="stat-item full-width">
													<p className="label">{key.split('/////')[0]}</p>
													<p className="value">{value}</p>
												</div>
											);
										}
										return null;
									})}
								</div>
							</div>
						))}

					</div>
				</div>
			</div>
		</div>
	);
};

export default EventResult;
