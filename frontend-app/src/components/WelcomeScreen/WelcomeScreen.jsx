import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/base";
import { useState } from 'react';
import '../../styles/WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [formCode, setFormCode] = useState('');

  const handleCreateForm = () => {
    navigate('/create');
  };

  const handleFormCodeSubmit = () => {
    navigate(`/register/${formCode}`);
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
