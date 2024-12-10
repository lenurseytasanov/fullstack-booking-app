import React, { useState } from 'react';
import AddFieldPopup from '../AddFieldPopup/AddFieldPopup';
import "../../styles/eventCreate.css";
import { Button } from "@mui/base";

const EventCreate = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [additionalFields, setAdditionalFields] = useState([]);

	const handleAddField = (field) => {
		setAdditionalFields([...additionalFields, field]);
	};
	const [selectedFiles, setSelectedFiles] = useState([]);

	const handleFileSelect = (event) => {
		const files = Array.from(event.target.files);
		setSelectedFiles(prevFiles => [...prevFiles, ...files]);
	};

	const handleFileRemove = (index) => {
		setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
	};


	return (
		<div className="event-create-container">
			<h1 className="event-create-title">Новая анкета</h1>

			<form className="event-form">
				<h2 className="event-section-title">Описание мероприятия</h2>

				<div className="field-group">
					<label className="field-label">Как Вас зовут?</label>
					<input type="text" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">Ваш E-mail:</label>
					<input type="email" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">Название мероприятия:</label>
					<input type="text" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">Описание мероприятия:</label>
					<textarea type="text" className="field-input field-textarea" />
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
				<h2 className="event-section-title">Содержимое анкеты</h2>

				<div className="field-group">
					<label className="field-label">ФИО</label>
					<input type="text" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">E-mail:</label>
					<input type="text" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">Номер телефона:</label>
					<input type="text" className="field-input" />
				</div>

				{/* {additionalFields.map((field, index) => renderField(field, index))} */}

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
				<Button className="add-field-button" onClick={handleAddField}>
					Создать анкету
				</Button>
			</form>
		</div>
	);
};

export default EventCreate;