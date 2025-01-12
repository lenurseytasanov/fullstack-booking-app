import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFieldPopup from '../AddFieldPopup/AddFieldPopup';
import LinksPopup from '../LinksPopup/LinksPopup';
import { Button } from "@mui/base";
import "./eventCreate.scss";
import api from '../../axios';

const EventCreate = () => {
	const navigate = useNavigate();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [additionalFields, setAdditionalFields] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [showLinksPopup, setShowLinksPopup] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		eventTitle: '',
		description: '',
		participantCount: '',
		eventDate: '',
		eventTime: ''
	});
	const [generatedLinks, setGeneratedLinks] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleAddField = (field) => {
		setAdditionalFields([...additionalFields, field]);
	};

	const handleFileSelect = (event) => {
		const files = Array.from(event.target.files);
		setSelectedFiles(prevFiles => [...prevFiles, ...files]);
	};

	const handleFileRemove = (index) => {
		setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
	};

	const handleFileUpload = async (file) => {
		try {
		  const formData = new FormData();
		  formData.append('file', file);
	 
		  const response = await api.post('/api/v1/files', formData, {
			 headers: {
				'Content-Type': 'multipart/form-data'
			 }
		  });
		  
		  return response.data;
		} catch (error) {
		  console.error('Детали ошибки загрузки:', {
			 status: error.response?.status,
			 data: error.response?.data
		  });
		  return null;
		}
	 };
	 
	 const handleSubmit = async (e) => {
		e.preventDefault();
		
		const uploadedFiles = await Promise.all(
		  selectedFiles.map(file => handleFileUpload(file))
		);
	
		const eventDateTime = new Date(`${formData.eventDate}T${formData.eventTime}`);
	
		const eventData = {
		  adminName: formData.name,
		  adminEmail: formData.email,
		  name: formData.eventTitle,
		  description: formData.description,
		  files: uploadedFiles.filter(file => file !== null).map(file => file.fileId),
		  meetings: [
			 {
				availablePlaces: parseInt(formData.participantCount),
				startsAt: eventDateTime.toISOString()
			 }
		  ],
		  formFields: [
			 { name: "ФИО", required: true },
			 { name: "E-mail", required: true },
			 { name: "Номер телефона", required: true },
			 ...additionalFields.map(field => ({
				name: field.type === 'multiple' ? 
				  `${field.label}/////${field.options.join('/////')}` : 
				  field.type === 'textarea' ?
				  `${field.label}/////textarea` :
				  field.label,
				required: true
			 }))
		  ]
		};
	 
	 
		try {
		  const response = await api.post('/api/v1/events', eventData);
		  const newEventId = response.data.id;
		  const links = {
			 register: `/register/${newEventId}`,
			 results: `/results/${newEventId}`,
			 code: newEventId
		  };
	 
		  localStorage.setItem('showLinksPopup', 'true');
		  localStorage.setItem('popupLinks', JSON.stringify(links));
		
		  navigate('/');
		} catch (error) {
		  console.error('Ошибка при создании мероприятия:', error);
		  console.log('Ответ сервера:', error.response?.data);
		  alert('Не удалось создать мероприятие');
		}
	 };
	 


	 const renderField = (field, index) => {
		const fieldLabel = field.label.split('/////')[0];
		
		return (
		  <div className="field-group" key={index}>
			 <label className="field-label">{fieldLabel}</label>
			 {field.type === "text" && (
				<input type="text" className="field-input user-input" readOnly />
			 )}
			 {field.type === "multiple" && (
				<div className="options-container">
				  {field.options.map((option, i) => (
					 <label key={i}>
						<input
						  type="radio"
						  className="option-input"
						  name={fieldLabel}
						  value={option}
						  disabled={true}
						/>
						{option}
					 </label>
				  ))}
				</div>
			 )}
			 {field.type === "textarea" && (
				<textarea 
				  className="field-input field-textarea user-input" 
				  readOnly 
				/>
			 )}
		  </div>
		);
	 };
	 
	return (
		<div className="event-create-container">
			<form className="event-form" onSubmit={handleSubmit}>
				<section className="form-section">
					<h2 className="event-section-title">Описание мероприятия</h2>

					<div className="field-group">
						<label className="field-label">Как Вас зовут?</label>
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
						<label className="field-label">Ваш E-mail:</label>
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
						<label className="field-label">Название мероприятия:</label>
						<input
							type="text"
							name="eventTitle"
							value={formData.eventTitle}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>

					<div className="field-group">
						<label className="field-label">Количество участников:</label>
						<input
							type="number"
							name="participantCount"
							value={formData.participantCount}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>

					<div className="field-group">
						<label className="field-label">Дата мероприятия:</label>
						<input
							type="date"
							name="eventDate"
							value={formData.eventDate}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>

					<div className="field-group">
						<label className="field-label">Время начала мероприятия:</label>
						<input
							type="time"
							name="eventTime"
							value={formData.eventTime}
							onChange={handleInputChange}
							className="field-input"
							required
						/>
					</div>

					<div className="field-group">
						<label className="field-label">Описание мероприятия:</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							className="field-input field-textarea"
							required
						/>
					</div>

					<div className="field-group">
						<div className="file-upload-container">
							<label className="field-label">Загрузить файлы:</label>
							<input
								type="file"
								multiple
								onChange={handleFileSelect}
								style={{ display: 'none' }}
								id="file-upload"
							/>
							<label htmlFor="file-upload" className="upload-button">
								Выбрать файл
							</label>
						</div>
						{selectedFiles.length > 0 && (
							<div className="selected-files">
								{selectedFiles.map((file, index) => (
									<div key={index} className="file-item">
										<span>{file.name}</span>
										<button
											type="button"
											className="remove-file"
											onClick={() => handleFileRemove(index)}
										>
											✕
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</section>

				<section className="form-section">
					<h2 className="event-section-title">Содержимое анкеты</h2>

					<div className="field-group">
						<label className="field-label">ФИО</label>
						<input type="text" className="field-input user-input" readOnly />
					</div>

					<div className="field-group">
						<label className="field-label">E-mail:</label>
						<input type="text" className="field-input user-input" readOnly />
					</div>

					<div className="field-group">
						<label className="field-label">Номер телефона:</label>
						<input type="text" className="field-input user-input" readOnly />
					</div>

					{additionalFields.map((field, index) => renderField(field, index))}

					<button
						type="button"
						className="upload-button"
						onClick={() => setIsPopupOpen(true)}
					>
						Добавить поле анкеты
					</button>

					{isPopupOpen && (
						<AddFieldPopup
							onClose={() => setIsPopupOpen(false)}
							onAddField={handleAddField}
						/>
					)}
					<Button type="submit" className="add-field-button">
						Создать анкету
					</Button>
					{showLinksPopup && (
						<LinksPopup
							links={generatedLinks}
							onClose={() => setShowLinksPopup(false)}
						/>
					)}
				</section>
			</form>
		</div>
	);
};

export default EventCreate;
