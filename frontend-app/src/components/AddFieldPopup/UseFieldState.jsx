import { useState } from 'react';

export const fieldTypes = [
	{ id: "text", label: "Текстовое поле" },
	{ id: "multiple", label: "Множественный выбор" },
	{ id: "textarea", label: "Развернутый ответ" }
 ];
 
 export const UseFieldState = () => {
	const [activeType, setActiveType] = useState("text");
	const [textFieldName, setTextFieldName] = useState("");
	const [multipleFieldName, setMultipleFieldName] = useState("");
	const [multipleOptions, setMultipleOptions] = useState(['']);
	const [textareaFieldName, setTextareaFieldName] = useState("");
 
	const handleMultipleOptionAdd = () => {
	  setMultipleOptions([...multipleOptions, '']);
	};
 
	const handleMultipleOptionRemove = (index) => {
	  const newOptions = multipleOptions.filter((_, i) => i !== index);
	  setMultipleOptions(newOptions);
	};
 
	const handleMultipleOptionChange = (index, value) => {
	  const newOptions = [...multipleOptions];
	  newOptions[index] = value;
	  setMultipleOptions(newOptions);
	};
 
	return {
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
	};
 };
 