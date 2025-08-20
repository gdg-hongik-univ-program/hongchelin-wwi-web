import "./Badge.css";
import { BADGES } from "../constants/BadgeImage";
import { setActiveBadge } from "../api/users";

const Badge = () => {
  const handleSelectBadge = async (badgeId) => {
    try {
      await setActiveBadge(badgeId);
      alert("대표 배지가 변경되었습니다!");
    } catch (err) {
      console.error("배지 설정 실패:", err);
      alert("대표 배지 설정에 실패했습니다.");
    }
  };

  return (
    <div className="badge">
      {BADGES.map((badge) => (
        <img
          key={badge.id}
          src={badge.src}
          alt={badge.alt}
          className="badge-img"
          onClick={() => handleSelectBadge(badge.id)}
        />
      ))}
    </div>
  );
};

export default Badge;
