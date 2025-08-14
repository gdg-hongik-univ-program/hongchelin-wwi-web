import "./Name.css";

const Name = ({ nickname, profileImage, onAvatarClick }) => {
  return (
    <div className="Name">
      <img
      src={profileImage}
      alt="프로필사진"
      className="profile-img"
      onClick={onAvatarClick}
      />
      <h3>{nickname}</h3>
    </div>
  );
};

export default Name;
