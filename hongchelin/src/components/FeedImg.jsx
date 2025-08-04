import { useNavigate } from "react-router-dom";
import "./FeedImg.css";

const ImageBox = ({ post }) => {
  const nav = useNavigate();

  return (
    <div className="image">
      <h4>
      나만의 홍슐랭 게시판
      </h4>
      <div className="image-box-wrapper">
        {!post || !post.imageUrl ? (
          <div className="image-box no-image">
            게시글을 작성해보세요 !
          </div>
        ) : (
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
        )}
      </div>
    </div>

  );
};

export default ImageBox;
