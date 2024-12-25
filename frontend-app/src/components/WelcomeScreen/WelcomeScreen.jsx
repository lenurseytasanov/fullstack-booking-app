import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@mui/base";
import { useState } from 'react';
import './welcomeScreen.scss';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [formCode, setFormCode] = useState('');
  const { eventId } = useParams();
  const handleCreateForm = () => {
    navigate('/create');
  };

  const handleFormCodeSubmit = (code) => {
	const events = JSON.parse(localStorage.getItem('events') || '[]');
	const event = events.find(e => e.id === parseInt(eventId));
	if (event) {
	  navigate(`/register/${eventId}`);
	} else {
	  alert('Мероприятие не найдено');
	}
 };


  return (
	<div className="welcome-container">
      <div className="welcome-section">
        <p className="welcome-heading-style">Добро пожаловать!</p>
        <div className="form-prompt-container">
          <div className="form-layout-container">
            <p className="form-title-text-style">Введите код анкеты:</p>
            <div className="input-container">
              <input 
                type="text" 
                value={formCode}
                onChange={(e) => setFormCode(e.target.value)}
                className="form-input"
              />
              <Button className="primary-button" onClick={handleFormCodeSubmit}>
                Перейти
              </Button>
            </div>
          </div>
        </div>
        <Button className="welcome-button" onClick={handleCreateForm}>
          Создать новую анкету
        </Button>
      </div>
    </div>
  );
}
