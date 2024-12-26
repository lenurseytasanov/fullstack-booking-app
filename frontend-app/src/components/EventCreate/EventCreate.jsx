import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFieldPopup from '../AddFieldPopup/AddFieldPopup';
import LinksPopup from '../LinksPopup/LinksPopup';
import { Button } from "@mui/base";
import "./eventCreate.scss";

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
		description: ''
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

	const handleSubmit = (e) => {
		e.preventDefault();
	 
		const eventData = {
		  id: Date.now(),
		  ...formData,
		  additionalFields,
		  files: selectedFiles.map(file => ({
			 name: file.name,
			 url: URL.createObjectURL(file)
		  }))
		};
	 
		const events = JSON.parse(localStorage.getItem('events') || '[]');
		events.push(eventData);
		localStorage.setItem('events', JSON.stringify(events));
	 
		const links = {
		  register: `/register/${eventData.id}`,
		  results: `/results/${eventData.id}`,
		  code: `${eventData.id}`
		};
	 
		localStorage.setItem('showLinksPopup', 'true');
		localStorage.setItem('popupLinks', JSON.stringify(links));
		
		navigate('/');
	 };
	 

	const renderField = (field, index) => {
		return (
			<div className="field-group" key={index}>
				<label className="field-label">{field.label}</label>
				{field.type === "text" && (
					<input type="text" className="field-input user-input" readOnly />
				)}
				{field.type === "multiple" && (
					<div className="options-table-container form-table-container">
						<table className="options-table user-table">
							<thead>
								<tr>
									<th>Варианты ответа</th>
								</tr>
							</thead>
							<tbody>
								{field.options.map((option, i) => (
									<tr key={i}>
										<td>
											<input
												type="text"
												value={option}
												readOnly
												className="field-input-option user-input"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				{field.type === "advanced" && (
					<div className="options-table-container form-table-container">
						<table className="options-table ">
							<thead>
								<tr>
									<th>Варианты ответа</th>
									<th>Количество</th>
								</tr>
							</thead>
							<tbody>
								{field.options.map((option, i) => (
									<tr key={i}>
										<td>
											<input
												type="text"
												value={option.answer}
												readOnly
												className="field-input-option user-input"
											/>
										</td>
										<td>
											<input
												type="text"
												value={option.quantity}
												readOnly
												className="field-input-option user-input"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
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
							type="text"
							name="eventTitle"
							value={formData.participantCount}
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
