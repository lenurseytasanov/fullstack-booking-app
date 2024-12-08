import { Button } from "@mui/base";
import { useEffect, useCallback } from "react";
import AdditionalFieldSection from "./AdditionalFieldSection";
import "./addFieldPopup.css";

export default function AddFieldPopup({ onClose }) {
  const handleEscapeKey = useCallback((event) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  const handleOutsideClick = (event) => {
    if (event.target.className === "field-addition-container") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <div className="field-addition-container" onClick={handleOutsideClick}>
      <div className="field-addition-section">
        <button className="close-button" onClick={onClose} />
        <h2 className="section-title">Добавление дополнительного поля</h2>
        <AdditionalFieldSection />
        <Button className="add-field-button">Добавить поле</Button>
      </div>
    </div>
  );
}
