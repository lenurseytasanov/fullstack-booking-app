import React, { useState } from 'react';

/**
 * Компонент для работы с формами
 */
const Form = () => {
  /**
   * Состояние для хранения данных формы
   */
  const [data, setData] = useState({});

  /**
   * Функция для обработки изменений в форме
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  /**
   * Функция для отправки формы
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  /**
   * Рендер формы
   */
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя:
        <input type="text" name="name" value={data.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={data.email} onChange={handleChange} />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;