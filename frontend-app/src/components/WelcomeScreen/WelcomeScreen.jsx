import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@mui/base";
import { useState, useEffect } from 'react';
import LinksPopup from '../LinksPopup/LinksPopup';
import './welcomeScreen.scss';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [formCode, setFormCode] = useState('');
  const { eventId } = useParams();
  const [showLinksPopup, setShowLinksPopup] = useState(false);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    const shouldShowPopup = localStorage.getItem('showLinksPopup');
    if (shouldShowPopup === 'true') {
      const popupLinks = JSON.parse(localStorage.getItem('popupLinks'));
      setLinks(popupLinks);
      setShowLinksPopup(true);
      localStorage.removeItem('showLinksPopup');
      localStorage.removeItem('popupLinks');
    }
  }, []);
  const handleCreateForm = () => {
    navigate('/create');
  };

  const handleFormCodeSubmit = () => {
	const events = JSON.parse(localStorage.getItem('events') || '[]');
	const event = events.find(e => e.id === parseInt(formCode));
	
	if (event) {
	  navigate(`/register/${formCode}`);
	} else {
	  alert('Мероприятие не найдено!');
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
		{showLinksPopup && (
        <LinksPopup 
          links={links}
          onClose={() => setShowLinksPopup(false)}
        />
      )}
    </div>
  );
}
