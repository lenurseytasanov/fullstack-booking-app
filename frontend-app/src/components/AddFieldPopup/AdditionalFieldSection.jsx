import { useState } from "react";
import "./addFieldPopup.css";

export default function AdditionalFieldSection() {
	const [activeType, setActiveType] = useState("text");
	const [options, setOptions] = useState(['']);

	const fieldTypes = [
		{ id: "text", label: "Текстовое поле" },
		{ id: "multiple", label: "Множественный выбор" },
		{ id: "advanced", label: "Расширенная настройка" },
	];

	const addOption = () => {
		setOptions([...options, '']);
	};

	const removeOption = (index) => {
		const newOptions = options.filter((_, i) => i !== index);
		setOptions(newOptions);
	};

	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};
	

	const renderFieldContent = () => {
		switch (activeType) {
			case "text":
				return (
					<div className="field-form">
						<label className="field-label">Название поля:</label>
						<input type="text" className="field-input" />
					</div>
				);
			case "multiple":
				return (
					<div className="field-form">
						<label className="field-label">Название поля:</label>
						<input type="text" className="field-input" />

						<div className="options-table-container">
							<table className="options-table">
								<thead>
									<tr>
										<th>Варианты ответа</th>
										<th>Редактирование</th>
									</tr>
								</thead>
								<tbody>
									{options.map((option, index) => (
										<tr key={index}>
											<td>
												<input
													type="text"
													value={option}
													onChange={(e) => handleOptionChange(index, e.target.value)}
													className="field-input-option"
												/>
											</td>
											<td>
												<button
													className="icon-button"
													onClick={() => removeOption(index)}
													disabled={options.length === 1}
												>
													<img
														src="/delete.svg"
														alt="Delete"
														style={{ opacity: options.length === 1 ? '0.5' : '1' }}
													/>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<button className="icon-button add-button" onClick={addOption}>
							<img src="/add.svg" alt="Add" />
						</button>
					</div>
				);
				case "advanced":
					return (
					  <div className="field-form">
						 <label className="field-label">Название поля:</label>
						 <input type="text" className="field-input" />
						 
						 <div className="options-table-container">
							<table className="options-table">
							  <thead>
								 <tr>
									<th>Варианты ответа</th>
									<th>Количество</th>
									<th>Редактирование</th>
								 </tr>
							  </thead>
							  <tbody>
								 {options.map((option, index) => (
									<tr key={index}>
									  <td>
										 <input
											type="text"
											value={option}
											onChange={(e) => handleOptionChange(index, e.target.value)}
											className="field-input-option"
										 />
									  </td>
									  <td>
										 <input
											type="text"
											value={option}
											onChange={(e) => handleOptionChange(index, e.target.value)}
											className="field-input-option"
										 />
									  </td>
									  <td>
										 <button 
											className="icon-button" 
											onClick={() => removeOption(index)}
											disabled={options.length === 1}
										 >
											<img 
											  src="/delete.svg" 
											  alt="Delete" 
											  style={{ opacity: options.length === 1 ? '0.5' : '1' }}
											/>
										 </button>
									  </td>
									</tr>
								 ))}
							  </tbody>
							</table>
						 </div>
						 <button className="icon-button add-button " onClick={addOption}>
							<img src="/add.svg" alt="Add" />
						 </button>
					  </div>
					);
			default:
				return null;
		}
	};

	return (
		<div>
			<ul className="field-types">
				{fieldTypes.map((type) => (
					<li
						key={type.id}
						className={`field-type-item ${activeType === type.id ? "active" : ""}`}
						onClick={() => setActiveType(type.id)}
					>
						{type.label}
					</li>
				))}
			</ul>
			{renderFieldContent()}
		</div>
	);
}
