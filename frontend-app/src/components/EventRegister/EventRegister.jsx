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
							label: field.name,
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

				const parsedEvent = {
					id: eventData.id,
					eventTitle: eventData.name,
					description: eventData.description,
					participantCount: eventData.meetings[0]?.availablePlaces || 0,
					startsAt: eventData.meetings[0]?.startsAt,
					files: eventData.files,
					meetings: eventData.meetings,
					additionalFields: eventData.formFields.map(parseFormField)
				};

				setEvent(parsedEvent);
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

	const handleFileDownload = async (fileId, fileName) => {
		try {
			const response = await axios.get(`/api/v1/files/${fileId}`, {
				responseType: 'blob'
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			if (error.response?.status === 404) {
				alert('Файл не найден');
			} else if (error.response?.status === 400) {
				alert('Некорректный запрос');
			} else {
				alert('Ошибка при скачивании файла');
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			 if (!event || !event.meetings || !event.meetings[0]) {
				  throw new Error('Данные о встрече недоступны');
			 }
  
			 const requestData = {
				  attributes: {
						"ФИО": formData.name,
						"E-mail": formData.email,
						"Номер телефона": formData.phone,
						...formData.additionalAnswers
				  },
				  meetingIds: [event.meetings[0].id]
			 };
  
			 const response = await axios.post(`/api/v1/events/${eventId}/participants`, requestData);
			 
			 alert('Вы успешно зарегистрировались!');
			 navigate('/');
		} catch (error) {
			 console.error('Детали ошибки:', error.response?.data || error.message);
			 
			 if (error.response?.status === 400) {
				  alert(`Ошибка валидации: ${error.response.data?.message || 'Проверьте правильность заполнения полей'}`);
			 } else {
				  alert(`Ошибка при регистрации: ${error.response?.data?.message || error.message}`);
			 }
		}
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
								<span className="info-label">Осталось свободных мест</span>
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
						<div className="event-info-card">
							<div className="info-icon">📎</div>
							<div className="info-content">
								<span className="info-label">Файлы мероприятия</span>
								<div className="files-list">
									{event.files.map((file, index) => (
										<div
											key={index}
											className="file-link"
											onClick={() => handleFileDownload(file.fileId, file.name)}
										>
											<span className="info-value">{file.name}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

				</section>

				<section className="form-section">
					<h2 className="event-section-title">Заполните анкету</h2>

					{event.additionalFields
						.sort((a, b) => {
							const fieldOrder = {
								'ФИО': 1,
								'E-mail': 2,
								'Номер телефона': 3,
								'text': 4,
								'multiple': 5,
								'textarea': 6
							};

							if (fieldOrder[a.label] !== undefined) {
								return fieldOrder[a.label] - (fieldOrder[b.label] || fieldOrder[b.type]);
							}
							return fieldOrder[a.type] - fieldOrder[b.type];
						})
						.map((field, index) => (
							<div className="field-group" key={index}>
								{(field.label === "ФИО" || field.label === "E-mail" || field.label === "Номер телефона") ? (
									<>
										<label className="field-label">{field.label}</label>
										<input
											type={field.label === "E-mail" ? "email" : field.label === "Номер телефона" ? "tel" : "text"}
											name={field.label === "ФИО" ? "name" : field.label === "E-mail" ? "email" : "phone"}
											value={formData[field.label === "ФИО" ? "name" : field.label === "E-mail" ? "email" : "phone"]}
											onChange={handleInputChange}
											className="field-input"
											placeholder={
												field.label === "ФИО" ? "Иванов Иван Иванович" : 
												field.label === "E-mail" ? "example@mail.ru" : 
												"+7 (999) 999-99-99"
											}
											required
										/>
									</>
								) : field.type === "text" && (
									<>
										<label className="field-label">{field.label}</label>
										<input
											type="text"
											onChange={(e) => handleAdditionalFieldChange(field.label, e.target.value)}
											className="field-input"
											placeholder=" "
										/>
									</>
								)}
								{field.type === "multiple" && (
									<>
										<label className="field-label">{field.label.split('/////')[0]}</label>
										<div className="options-container">
											{field.options.map((option, i) => (
												<label key={i}>
													<input
														type="radio"
														className="option-input"
														name={field.label}
														value={option}
														onChange={(e) => handleAdditionalFieldChange(`${field.label}`, e.target.value)}
													/>
													{option}
												</label>
											))}
										</div>
									</>
								)}

								{field.type === "textarea" && (
									<>
										<label className="field-label">{field.label}</label>
										<textarea
											onChange={(e) => handleAdditionalFieldChange(`${field.label}/////textarea/////textarea`, e.target.value)}
											className="field-input field-textarea"
											placeholder=" "
										/>
									</>
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
