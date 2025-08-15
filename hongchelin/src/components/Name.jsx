import "./Name.css";

const Name = ({ nickname, profileImage, badge, onAvatarClick }) => {
  return (
    <div className="Name">
      <img
      src={profileImage}
      alt="프로필사진"
      className="profile-img"
      onClick={onAvatarClick}
      />
      <img
      src={badge}
      alt="배지"
      className="badge-img"
      onClick={onAvatarClick}
      />
      <h3>{nickname}</h3>
    </div>
  );
};

export default Name;
