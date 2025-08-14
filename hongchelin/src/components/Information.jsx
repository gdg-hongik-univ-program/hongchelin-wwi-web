import Button from "./Button";
import "./Information.css";

const Information = ({
  onOpenNicknameModal = () => console.warn("[Information] onOpenNicknameModal 없음"),
  onOpenProfileImageModal = () => console.warn("[Information] onOpenProfileImageModal 없음"),
}) => {
  return (
    <div>
      <div className="Change">
        <Button type="change" onClick={() => onOpenNicknameModal()}>
          닉네임 변경
        </Button>
        <Button type="change" onClick={() => onOpenProfileImageModal()}>
          프로필 사진 변경
        </Button>
      </div>
    </div>
  );
};

export default Information;
