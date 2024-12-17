import React, { useState } from 'react';
import { Button } from "@mui/base";
import "../../styles/eventCreate.css";
import AddFieldPopup from '../AddFieldPopup/AddFieldPopup';
import "../../styles/eventCreate.css";

const EventRegister = () => {
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
			<h1 className="event-create-title">Тестовая анкета</h1>

			<form className="event-form">
				<div className="field-group">
					<label className="field-label">Описание мероприятия:</label>
					<textarea type="text" className="field-input field-textarea"/>

				</div>
				<div className="field-group">
					<div className="file-upload-container">
						<label className="field-label">Файлы к мероприятию:</label>


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

				<div className="field-group">
					<label className="field-label">ФИО</label>
					<input type="text" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">E-mail:</label>
					<input type="email" className="field-input" />
				</div>

				<div className="field-group">
					<label className="field-label">Номер телефона:</label>
					<input type="text" className="field-input" />
				</div>

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

export default EventRegister;