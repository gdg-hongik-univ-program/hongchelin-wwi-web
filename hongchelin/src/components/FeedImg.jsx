import { useNavigate } from "react-router-dom";

const ImageBox = ({ post }) => {
  const nav = useNavigate();

  if (!post || !post.imageUrl) {
    return (
      <div className="image-box no-image">
        게시글을 작성해보세요 !
      </div>
    );
  }

  return (
    <div
      className="image-box"
      onClick={() => nav(`/post/${post.id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={post.imageUrl}
        alt="게시글 이미지"
        className="image-preview"
      />
    </div>
  );
};

export default ImageBox;
