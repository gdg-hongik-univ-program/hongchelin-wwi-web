import "./Name.css";
import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

const Name = () => {
  // const nav = useNavigate();
  const [preview, setPreview] = useState(null);
  const [nickname, setNickname] = useState("");
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="Name">
      <div className="profile-box">
        <div className="image-box" onClick={handleImageClick}>
          {preview ? (
            <img src={preview} alt="preview" className="preview-image" />
          ) : (
            <span>사진 추가</span>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />

        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="nickname-input"
        />
      </div>
    </div>
  );
};

export default Name;
