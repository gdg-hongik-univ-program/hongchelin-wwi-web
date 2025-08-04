import { useState, useRef } from 'react';
import './ImgUpload.css';
import { FaImage, FaTrashAlt } from 'react-icons/fa';

const ImageUpload = () => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); // input 조작용

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    fileInputRef.current.value = null; // 파일 input 초기화
  };

  return (
    <div className="image-upload-container">
      {!preview ? (
        <label className="upload-box">
          <FaImage className="upload-icon" />
          <span>사진 추가하기</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
            ref={fileInputRef}
          />
        </label>
      ) : (
        <div className="preview-wrapper">
          <img src={preview} alt="미리보기" className="preview-image" />
          <button className="delete-button" onClick={handleRemoveImage}>
            <FaTrashAlt /> 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
