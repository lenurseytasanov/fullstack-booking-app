import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button } from "@mui/base";
import './eventRegister.scss'

const EventRegister = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        additionalAnswers: {}
    });

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        const currentEvent = events.find(e => e.id === parseInt(eventId));
        if (currentEvent) {
            setEvent(currentEvent);
        }
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdditionalFieldChange = (fieldLabel, value) => {
        setFormData(prev => ({
            ...prev,
            additionalAnswers: {
                ...prev.additionalAnswers,
                [fieldLabel]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const participantData = {
            id: Date.now(),
            eventId: Number(eventId),
            ...formData,
            registrationDate: new Date().toISOString()
        };

        const participants = JSON.parse(localStorage.getItem(`participants_${eventId}`) || '[]');
        participants.push(participantData);
        localStorage.setItem(`participants_${eventId}`, JSON.stringify(participants));

        navigate('/');
    };

    if (!event) return <div>Мероприятие не найдено</div>;

    return (
        <div className="event-create-container">
            <h1 className="event-create-title">{event.eventTitle}</h1>
            <form className="event-form" onSubmit={handleSubmit}>
                <div className="field-group">
                    <label className="field-label">Описание мероприятия:</label>
                    <textarea 
                        name="description"
                        value={event.description}
                        className="field-input field-textarea"
                        readOnly
                    />
                </div>

                {event.files && event.files.length > 0 && (
                    <div className="field-group">
                        <label className="field-label">Файлы мероприятия:</label>
                        <div className="selected-files">
                            {event.files.map((file, index) => (
                                <div key={index} className="file-item">
                                    <span>{file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="field-group">
                    <label className="field-label">ФИО</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="field-input" 
                        required
                    />
                </div>

                <div className="field-group">
                    <label className="field-label">E-mail:</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="field-input"
                        required
                    />
                </div>

                <div className="field-group">
                    <label className="field-label">Номер телефона:</label>
                    <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="field-input"
                        required
                    />
                </div>

                {event.additionalFields && event.additionalFields.map((field, index) => (
                    <div className="field-group" key={index}>
                        <label className="field-label">{field.label}</label>
                        {field.type === "text" && (
                            <input
                                type="text"
                                onChange={(e) => handleAdditionalFieldChange(field.label, e.target.value)}
                                className="field-input"
                            />
                        )}
                        {field.type === "multiple" && (
                            <div className="options-table-container form-table-container">
                                <table className="options-table">
                                    <tbody>
                                        {field.options.map((option, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name={field.label}
                                                        value={option}
                                                        onChange={(e) => handleAdditionalFieldChange(field.label, e.target.value)}
                                                    />
                                                    <label>{option}</label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {field.type === "advanced" && (
                            <div className="options-table-container form-table-container">
                                <table className="options-table">
                                    <thead>
                                        <tr>
                                            <th>Выбор</th>
                                            <th>Вариант ответа</th>
                                            <th>Количество</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {field.options.map((option, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name={field.label}
                                                        value={option.answer}
                                                        onChange={(e) => handleAdditionalFieldChange(field.label, e.target.value)}
                                                    />
                                                </td>
                                                <td>{option.answer}</td>
                                                <td>{option.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}

                <Button type="submit" className="add-field-button">
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
};

export default EventRegister;
