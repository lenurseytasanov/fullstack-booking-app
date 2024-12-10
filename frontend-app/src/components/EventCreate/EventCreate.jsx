import React, { useState } from 'react';
import "../../styles/eventCreate.css";
import AddFieldPopup from '../AddFieldPopup/AddFieldPopup';
import { Button } from "@mui/base";

const EventCreate = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [additionalFields, setAdditionalFields] = useState([]);

	const handleAddField = (field) => {
		setAdditionalFields([...additionalFields, field]);
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
					<input type="text" className="field-input" />
				</div>

				<div className="field-group">
					<div className="file-upload-container">
						<label className="field-label">Загрузить файлы:</label>
						<button type="button" className="upload-button">Выбрать файл</button>
					</div>
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