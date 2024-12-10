import { useState } from 'react';

export const fieldTypes = [
  { id: "text", label: "Текстовое поле" },
  { id: "multiple", label: "Множественный выбор" },
  { id: "advanced", label: "Расширенная настройка" },
];

export const UseFieldState = () => {
  const [activeType, setActiveType] = useState("text");
  const [textFieldName, setTextFieldName] = useState("");
  const [multipleFieldName, setMultipleFieldName] = useState("");
  const [multipleOptions, setMultipleOptions] = useState(['']);
  const [advancedFieldName, setAdvancedFieldName] = useState("");
  const [advancedOptions, setAdvancedOptions] = useState([{ answer: '', quantity: '' }]);

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

  const handleAdvancedOptionAdd = () => {
    setAdvancedOptions([...advancedOptions, { answer: '', quantity: '' }]);
  };

  const handleAdvancedOptionRemove = (index) => {
    const newOptions = advancedOptions.filter((_, i) => i !== index);
    setAdvancedOptions(newOptions);
  };

  const handleAdvancedOptionChange = (index, field, value) => {
    const newOptions = [...advancedOptions];
    newOptions[index][field] = value;
    setAdvancedOptions(newOptions);
  };

  return {
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
  };
};
