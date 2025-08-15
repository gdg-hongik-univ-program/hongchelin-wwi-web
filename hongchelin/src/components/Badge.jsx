import "./Badge.css"
import { BADGES } from "../constants/BadgeImage";

const Badge = () => {
  return (
    <div className="badge">
      {BADGES.map((badge) => (
        <img
          key={badge.id}
          src={badge.src}
          alt={badge.alt}
          className="badge-img"
        />
      ))}
    </div>
  );
};

export default Badge;
