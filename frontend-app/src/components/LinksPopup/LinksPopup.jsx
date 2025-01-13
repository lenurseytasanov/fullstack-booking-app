import "./linksPopup.scss";
import React, { useEffect, useCallback } from "react";
import LinksForm from "../LinkForm/LinkForm";

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
        <h2 className="section-title">Мероприятие успешно создано!</h2>
        <div className="field-form">
          <div className="links-group">
            <p>Ссылка для регистрации:</p>
            <LinksForm value={`https://fullstack-booking-app-nine.vercel.app${links.register}`} />
          </div>
          <div className="links-group">
            <p>Код:</p>
            <LinksForm value={links.code} />
          </div>
          <div className="links-group">
            <p>Ссылка на результаты:</p>
            <LinksForm value={`https://fullstack-booking-app-nine.vercel.app${links.results}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
