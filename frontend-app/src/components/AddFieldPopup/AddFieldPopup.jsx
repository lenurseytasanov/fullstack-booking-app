import { Button } from "@mui/base";
import { useEffect, useCallback } from "react";
import { fieldTypes, UseFieldState } from "./UseFieldState.jsx";
import "./addFieldPopup.scss";

export default function AddFieldPopup({ onClose, onAddField }) {
	const {
		activeType,
	  setActiveType,
	  textFieldName,
	  setTextFieldName,
	  multipleFieldName,
	  setMultipleFieldName,
	  multipleOptions,
	  textareaFieldName,
	  setTextareaFieldName,
	  handleMultipleOptionAdd,
	  handleMultipleOptionRemove,
	  handleMultipleOptionChange
	} = UseFieldState();

	const handleEscapeKey = useCallback((event) => {
		if (event.key === "Escape") {
			onClose();
		}
	}, [onClose]);

	const handleOutsideClick = (event) => {
		if (event.target.className === "field-addition-container") {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [handleEscapeKey]);

	const handleSubmit = () => {
		let fieldData;
		switch (activeType) {
			case "text":
				fieldData = {
					type: "text",
					label: textFieldName,
					value: ""
				};
				break;
			case "multiple":
				fieldData = {
					type: "multiple",
					label: multipleFieldName,
					options: multipleOptions
				};
				break;
			case "textarea":
				fieldData = {
					type: "textarea",
					label: `${textareaFieldName}/////textarea`,
					value: ""
				};
				break;
			default:
				return null;
		}
		onAddField(fieldData);
		onClose();
	};



	const renderFieldContent = () => {
		switch (activeType) {
			case "text":
				return (
					<div className="field-form">
						<label className="field-label">Название поля:</label>
						<input
							type="text"
							className="field-input"
							value={textFieldName}
							onChange={(e) => setTextFieldName(e.target.value)}
						/>
					</div>
				);


			case "multiple":
				return (
					<div className="field-form">
						<label className="field-label">Название поля:</label>
						<input
							type="text"
							className="field-input"
							value={multipleFieldName}
							onChange={(e) => setMultipleFieldName(e.target.value)}
						/>

						<div className="options-table-container">
							<table className="options-table">
								<thead>
									<tr>
										<th>Варианты ответа</th>
										<th>Редактирование</th>
									</tr>
								</thead>
								<tbody>
									{multipleOptions.map((option, index) => (
										<tr key={index}>
											<td>
												<input
													type="text"
													value={option}
													onChange={(e) => handleMultipleOptionChange(index, e.target.value)}
													className="field-input-option"
												/>
											</td>
											<td>
												<button
													className="icon-button"
													onClick={() => handleMultipleOptionRemove(index)}
													disabled={multipleOptions.length === 1}
												>
													<img
														src="/delete.svg"
														alt="Delete"
														style={{ opacity: multipleOptions.length === 1 ? '0.5' : '1' }}
													/>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<button
							type="button"
							className="icon-button add-button"
							onClick={(e) => {
								e.preventDefault();
								handleMultipleOptionAdd();
							}}
						>
							<img src="/add.svg" alt="Add" />
						</button>
					</div>
				);

			case "textarea":
				return (
					<div className="field-form">
						<label className="field-label">Название поля:</label>
						<input
							type="text"
							className="field-input"
							value={textareaFieldName}
							onChange={(e) => setTextareaFieldName(e.target.value)}
						/>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="field-addition-container" onClick={handleOutsideClick}>
			<div className="field-addition-section">
				<button className="close-button" onClick={onClose} />
				<h2 className="section-title">Добавление дополнительного поля</h2>
				<div>
					<ul className="field-types">
						{fieldTypes.map((type) => (
							<li
								key={type.id}
								className={`field-type-item ${activeType === type.id ? "active" : ""}`}
								onClick={() => setActiveType(type.id)}
								data-type={type.id}
							>
								{type.label}
							</li>
						))}
					</ul>
					{renderFieldContent()}
				</div>
				<Button className="add-field-button" onClick={handleSubmit}>Добавить поле</Button>
			</div>
		</div>
	);
}
