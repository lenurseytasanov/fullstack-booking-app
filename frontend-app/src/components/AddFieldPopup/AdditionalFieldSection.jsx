import { useState } from "react";
import "./addFieldPopup.css";

export default function AdditionalFieldSection() {
  const [activeType, setActiveType] = useState("text");

  const fieldTypes = [
    { id: "text", label: "Текстовое поле" },
    { id: "multiple", label: "Множественный выбор" },
    { id: "advanced", label: "Расширенная настройка" },
  ];

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
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
          </div>
        );
      case "advanced":
        return (
          <div className="field-form">
            <label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
				<label className="field-label">Название поля:</label>
            <input type="text" className="field-input" />
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
