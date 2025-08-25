import { useState, useRef } from 'react';
import './ImgUpload.css';
import { FaImage, FaTrashAlt } from 'react-icons/fa';

const ImageUpload = ({onUpload}) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onUpload?.(imageUrl,file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    fileInputRef.current.value = null;
    onUpload?.(null,null);
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
