import { useState } from "react";
import Button from "./Button";

const ProfileImageModal = ({ onClose, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!selectedFile) {
      alert("파일을 선택하세요.");
      return;
    }
    onSave(selectedFile);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>프로필 사진 변경</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewURL && <img src={previewURL} alt="미리보기" width="150" height="150" style={{ borderRadius: "50%", marginTop: "10px" }} />}
        <div className="modal-buttons">
          <Button onClick={onClose} type="nickname">취소</Button>
          <Button onClick={handleSave} type="nickname">저장</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;
