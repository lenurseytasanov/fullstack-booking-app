import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button } from "@mui/base";
import './eventRegister.scss'
import axios from 'axios';

const EventRegister = () => {
	const { eventId } = useParams();
	const navigate = useNavigate();
	const [event, setEvent] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		description: '',
		additionalAnswers: {}
	});

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(`/api/v1/events/${eventId}`);
				const eventData = response.data;

				const parseFormField = (field) => {
					const parts = field.name.split('/////');
					if (parts.length > 1) {
						if (parts[1] === 'textarea') {
							return {
								label: parts[0],
								type: 'textarea',
								required: field.required
							};
						}
						return {
							label: parts[0],
							type: 'multiple',
							required: field.required,
							options: parts.slice(1)
						};
					}
					return {
						label: field.name,
						type: 'text',
						required: field.required
					};
				};

				setEvent({
					id: eventData.id,
					eventTitle: eventData.name,
					description: eventData.description,
					participantCount: eventData.meetings[0]?.availablePlaces || 0,
					startsAt: eventData.meetings[0]?.startsAt,
					files: eventData.files,
					additionalFields: eventData.formFields.map(parseFormField)
				});
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};

		fetchEvent();
	}, [eventId]);


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleAdditionalFieldChange = (fieldLabel, value) => {
		setFormData(prev => ({
			...prev,
			additionalAnswers: {
				...prev.additionalAnswers,
				[fieldLabel]: value
			}
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const participantData = {
			id: Date.now(),
			eventId: Number(eventId),
			...formData,
			registrationDate: new Date().toISOString()
		};

		const participants = JSON.parse(localStorage.getItem(`participants_${eventId}`) || '[]');
		participants.push(participantData);
		localStorage.setItem(`participants_${eventId}`, JSON.stringify(participants));

		navigate('/');
	};

	if (!event) return <div>Мероприятие не найдено</div>;

	return (
		<div className="event-create-container">
			<form className="event-form" onSubmit={handleSubmit}>
				<section className="form-section">
					<h2 className="event-section-title">{event.eventTitle}</h2>

					<div className="event-info-container">
						<div className="event-info-card">
							<div className="info-icon">🗓️</div>
							<div className="info-content">
								<span className="info-label">Дата и время</span>
								<span className="info-value">
									{`${new Date(event.startsAt).toLocaleString('ru-RU', {
										day: 'numeric',
										month: 'long',
										year: 'numeric'
									}).slice(0, -3)} в ${new Date(event.startsAt).toLocaleString('ru-RU', {
										hour: '2-digit',
										minute: '2-digit'
									})}`}
								</span>
							</div>
						</div>

						<div className="event-info-card">
							<div className="info-icon">👥</div>
							<div className="info-content">
								<span className="info-label">Количество мест</span>
								<span className="info-value">{event.participantCount}</span>
							</div>
						</div>

						<div className="event-info-card description-card">
							<div className="info-icon">📝</div>
							<div className="info-content">
								<span className="info-label">Описание</span>
								<p className="info-value description-text">{event.description}</p>
							</div>
						</div>
					</div>


					{event.files && event.files.length > 0 && (
						<div className="field-group">
							<label className="field-label">Файлы мероприятия:</label>
							<div className="selected-files">
								{event.files.map((file, index) => (
									<div key={index} className="file-item">
										<a href={file.url} download={file.name}>
											<span>{file.name}</span>
										</a>
									</div>
								))}
							</div>
						</div>
					)}
				</section>

				<section className="form-section">
					<h2 className="event-section-title">Заполните анкету</h2>

					<div className="field-group">
						<label className="field-label">ФИО</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>

					<div className="field-group">
						<label className="field-label">E-mail:</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>

					<div className="field-group">
						<label className="field-label">Номер телефона:</label>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>


					{event.additionalFields && event.additionalFields.map((field, index) => (
						<div className="field-group" key={index}>
							<label className="field-label">{field.label}</label>
							{field.type === "text" && (
								<input
									type="text"
									onChange={(e) => handleAdditionalFieldChange(field.label, e.target.value)}
									className="field-input"
								/>
							)}
							{field.type === "multiple" && (
								<div className="options-container">
									{field.options.map((option, i) => (
										<label key={i}>
											<input
												type="radio"
												className="option-input"
												name={field.label}
												value={option}
												onChange={(e) => handleAdditionalFieldChange(field.label, e.target.value)}
											/>
											{option}
										</label>
									))}
								</div>
							)}
							{field.type === "textarea" && (
								<div className="field-group">
									<textarea
										onChange={(e) => handleAdditionalFieldChange(field.label.split('/////')[0], e.target.value)}
										className="field-input field-textarea"
										placeholder=""
									/>
								</div>
							)}
						</div>
					))}
					<Button type="submit" className="add-field-button">
						Зарегистрироваться
					</Button>
				</section>
			</form>
		</div>
	);
}
export default EventRegister;
