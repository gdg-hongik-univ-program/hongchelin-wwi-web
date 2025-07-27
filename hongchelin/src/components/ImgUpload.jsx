import { useState } from 'react';

const ImageUpload = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);  // 임시 URL 생성
    setPreview(imageUrl);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '300px', marginTop: '10px' }} />}
    </div>
  );
};

export default ImageUpload;
