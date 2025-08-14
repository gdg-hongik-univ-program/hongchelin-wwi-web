// src/components/Profile.jsx
import { useEffect, useRef, useState } from "react";
import Name from "./Name";
import Information from "./Information";
import NicknameModal from "./NicknameModal";
import ProfileImageModal from "./ProfileImageModal";
import { getMyPage, updateUserNickname, updateUserProfileImage } from "../api/post";

const Profile = ({ userId }) => {
  const [nickname, setNickname] = useState("기존닉네임");
  const [profileImage, setProfileImage] = useState("");
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const tempObjectUrlRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyPage(userId);
        setNickname(data.nickname ?? "닉네임");
        setProfileImage(data.profileImageUrl ?? "");
      } catch (err) {
        console.error("마이페이지 조회 실패:", err);
      }
    })();
  }, [userId]);

  const handleNicknameSave = async (newNickname) => {
    try {
      await updateUserNickname(userId, newNickname);
      setNickname(newNickname);
      setIsNicknameModalOpen(false);
    } catch (err) {
      console.error("닉네임 저장 실패:", err);
      alert(err.response?.data?.message || "닉네임 저장에 실패했습니다.");
    }
  };

  const handleImageSave = async (file) => {
    try {
      const res = await updateUserProfileImage(userId, file);

      if (res?.profileImageUrl) {
        if (tempObjectUrlRef.current) {
          URL.revokeObjectURL(tempObjectUrlRef.current);
          tempObjectUrlRef.current = null;
        }
        setProfileImage(res.profileImageUrl);
      } else {
        if (tempObjectUrlRef.current) URL.revokeObjectURL(tempObjectUrlRef.current);
        const tmp = URL.createObjectURL(file);
        tempObjectUrlRef.current = tmp;
        setProfileImage(tmp);
      }

      setIsImageModalOpen(false);
    } catch (error) {
      console.error("프로필 이미지 저장 실패:", error);
      alert(error.response?.data?.message || "프로필 이미지 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    return () => {
      if (tempObjectUrlRef.current) URL.revokeObjectURL(tempObjectUrlRef.current);
    };
  }, []);

  const displayImage = profileImage || "/images/avatar_placeholder.png";

  return (
    <>
      <Name
        nickname={nickname}
        profileImage={displayImage}
        onAvatarClick={() => setIsImageModalOpen(true)}
      />

      <Information
        onOpenNicknameModal={() => setIsNicknameModalOpen(true)}
        onOpenProfileImageModal={() => setIsImageModalOpen(true)}
      />

      {isNicknameModalOpen && (
        <NicknameModal
          onClose={() => setIsNicknameModalOpen(false)}
          onSave={handleNicknameSave}
        />
      )}

      {isImageModalOpen && (
        <ProfileImageModal
          onClose={() => setIsImageModalOpen(false)}
          onSave={handleImageSave}
        />
      )}
    </>
  );
};

export default Profile;
