import { useState } from "react";
import Name from "./Name";
import NicknameModal from "./NicknameModal";
import ProfileImageModal from "./ProfileImageModal";
import { updateUserNickname } from "../api/post";
import { updateUserProfileImage } from "../api/post";

const Profile = () => {
  const [nickname, setNickname] = useState("기존닉네임");
  const [profileImage, setProfileImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (newNickname) => {
    try {
      await updateUserNickname(newNickname);
      setNickname(newNickname);
      closeModal();
    } catch (err) {
      console.error("닉네임 저장 실패:", err);
      alert("닉네임 저장에 실패했습니다.");
    }
  };

  const handleImageSave = async(file) => {
    try{
      await updateUserProfileImage(file);
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
      setIsImageModalOpen(false);
    } catch(error){
      console.error("프로필 이미지 저장 실패: ", error);
      alert("프로필 이미지 저장에 실패했습니다.")
    }
  }

  return (
  <>
    <Name nickname={nickname} profileImage={profileImage} onEditClick={openModal} />
    <img 
    src={profileImage}
    alt="프로필"
    width={100}
    height={100}
    onClick={() => setIsImageModalOpen(true)}
    style={{ borderRadius: "50%", cursor: "pointer", marginTop: "10px" }}
    />

    {isModalOpen && (
      <NicknameModal onClose={closeModal} onSave={handleSave} />
    )}

    {isImageModalOpen && (
      <ProfileImageModal onClose={() => setIsImageModalOpen(false)} onSave={handleImageSave} />
    )}
  </>

  );
};

export default Profile;
