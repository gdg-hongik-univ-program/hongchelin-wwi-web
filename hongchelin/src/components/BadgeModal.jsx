// src/components/BadgeModal.jsx
import { useEffect } from "react";
import { BADGES } from "../constants/BadgeImage";
import "./BadgeModal.css";
import Button from "./Button";

const BadgeModal = ({ onClose, onSave, initialBadgeId }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handlePick = (badge) => {
    onSave(badge);   // 선택 즉시 저장
    onClose();       // 닫기
  };

  return (
    <div className="badge-modal-backdrop" onClick={onClose}>
      <div className="badge-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="badge-modal-title">배지 선택</h3>
        <div className="badge-grid">
          {BADGES.map((badge) => (
            <button
              key={badge.id}
              className={`badge-cell ${initialBadgeId === badge.id ? "is-active" : ""}`}
              onClick={() => handlePick(badge)}
              aria-label={badge.alt}
            >
              <img src={badge.src} alt={badge.alt} />
            </button>
          ))}
        </div>
        <Button type="nickname" onClick={onClose}>취소</Button>
      </div>
    </div>
  );
};

export default BadgeModal;
