import "../../styles/addFieldPopup.css";
import { fieldTypes, UseFieldState } from "./UseFieldState.jsx";

export default function AdditionalFieldSection() {
	const {
		activeType,
		setActiveType,
		textFieldName,
		setTextFieldName,
		multipleFieldName,
		setMultipleFieldName,
		multipleOptions,
		advancedFieldName,
		setAdvancedFieldName,
		advancedOptions,
		handleMultipleOptionAdd,
		handleMultipleOptionRemove,
		handleMultipleOptionChange,
		handleAdvancedOptionAdd,
		handleAdvancedOptionRemove,
		handleAdvancedOptionChange
	} = UseFieldState();

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

			case "advanced":
				return (
					<div className="field-form">
						<label className="field-label">Название поля:</label>
						<input
							type="text"
							className="field-input"
							value={advancedFieldName}
							onChange={(e) => setAdvancedFieldName(e.target.value)}
						/>

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
									{advancedOptions.map((option, index) => (
										<tr key={index}>
											<td>
												<input
													type="text"
													value={option.answer}
													onChange={(e) => handleAdvancedOptionChange(index, 'answer', e.target.value)}
													className="field-input-option"
												/>
											</td>
											<td>
												<input
													type="text"
													value={option.quantity}
													onChange={(e) => handleAdvancedOptionChange(index, 'quantity', e.target.value)}
													className="field-input-option"
												/>
											</td>
											<td>
												<button
													className="icon-button"
													onClick={() => handleAdvancedOptionRemove(index)}
													disabled={advancedOptions.length === 1}
												>
													<img
														src="/delete.svg"
														alt="Delete"
														style={{ opacity: advancedOptions.length === 1 ? '0.5' : '1' }}
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
							className="icon-button add-button new-add-button"
							onClick={(e) => {
								e.preventDefault(); 
								handleAdvancedOptionAdd();
							}}
						>
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
						data-type={type.id}
					>
						{type.label}
					</li>
				))}
			</ul>
			{renderFieldContent()}
		</div>
	);
}
