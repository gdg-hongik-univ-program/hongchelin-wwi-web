import { useState } from "react";
import Button from "./Button";
import NicknameModal from "./NicknameModal";
import ProfileImageModal from "./ProfileImageModal";
import "./Information.css";

const Information = () => {
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

  return (
    <div>
      <div className="Change">
        <Button type="change" onClick={() => setShowNicknameModal(true)}>
          닉네임 변경
        </Button>
        <Button type="change" onClick={()=> setShowProfileImageModal(true)}>
          프로필 사진 변경
        </Button>
      </div>

      {showNicknameModal && (
        <NicknameModal
          onClose={() => setShowNicknameModal(false)}
          onSave={() => {
            alert("저장되었습니다!");
            setShowNicknameModal(false);
          }}
        />
      )}

      {showProfileImageModal && (
        <ProfileImageModal
        onClose={()=> setShowProfileImageModal(false)}
        onSave={() => {
          alert("저장되었습니다!");
          setShowProfileImageModal(false);
        }}
        />
      )}
      
    </div>
  );
};

export default Information;
