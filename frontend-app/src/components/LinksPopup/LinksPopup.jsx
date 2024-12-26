import { useEffect, useCallback } from "react";
import "./linksPopup.scss";

export default function LinksPopup({ onClose, links }) {
  const handleEscapeKey = useCallback((event) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  const handleOutsideClick = (event) => {
    if (event.target.className === "field-addition-container") {
      onClose();
    }
  };

  return (
    <div className="field-addition-container" onClick={handleOutsideClick}>
      <div className="field-addition-section">
        <button className="close-button" onClick={onClose} />
        <h2 className="section-title">Ссылки на мероприятие</h2>
        <div className="field-form">
          <p>Ссылка для регистрации: http://localhost:3000{links.register}</p>
          <p>Код анкеты: {links.code}</p>
          <p>Ссылка на результаты: http://localhost:3000{links.results}</p>
        </div>
      </div>
    </div>
  );
}
