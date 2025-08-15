import { useNavigate } from "react-router-dom";
import { mockPost } from "../../mock/mockData";
import "./ImageBox.css";

const ImageBox = ({ posts }) => {
  const nav = useNavigate();

  const list = (Array.isArray(posts) && posts.length > 0 ? posts : mockPost).slice(-2);

  const goDetail = (id) => {
    if (id == null) return;
    nav(`/posts/${id}`);
  };

  return (
    <div className="image">
      <h4>나만의 홍슐랭 게시판</h4>

      <div className="image-box-wrapper">
        {list.length === 0 ? (
          <div className="image-box no-image">게시글을 작성해보세요 !</div>
        ) : (
          list.map((post) => (
            <div
              key={post.id}
              className={`image-box ${post.imageUrl ? "" : "no-image"}`}
              onClick={() => goDetail(post.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goDetail(post.id)}
              style={{ cursor: "pointer" }}
            >
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title || "게시글 이미지"}
                  className="image-preview"
                />
              ) : (
                <div className="no-image-title">{post.title}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageBox;
