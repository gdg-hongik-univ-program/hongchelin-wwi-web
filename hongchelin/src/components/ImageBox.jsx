import { useNavigate } from "react-router-dom";
import { getMyPosts } from "../api/users";
import { useEffect, useState } from "react";
import "./ImageBox.css";

const ImageBox = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMyPosts(0,2);
        const list = Array.isArray(data?.content) ? data.content : (Array.isArray(data) ? data : []);
        setPosts(list);
      } catch (error) {
        console.error("내 게시글 불러오기 실패:", error);
        setPosts([]);
      }finally {
        setLoading(false)
      }
    };
    fetchPosts();
  }, []);

  const goDetail = (id) => {
    if (id == null) return;
    nav(`/posts/${id}`);
  };

  return (
    <div className="image">
      <h4>나만의 홍슐랭 게시판</h4>

      <div className="image-box-wrapper">
        {loading ? (
          <div>불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="image-box no-image">게시글을 작성해보세요 !</div>
        ) : (
          posts.map((post) => (
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
                <div className="no-image-title">{post.title || "제목 없음"}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageBox;
