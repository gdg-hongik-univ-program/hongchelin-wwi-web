// src/pages/PostDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, deletePost, createComment } from "../api/post";
import Button from "../components/Button";

const PostDetail = () => {
  const { postId } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("postId:", postId);
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        console.log("받아온 post:", data);
        setPost(data);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await deletePost(postId);
      alert("게시글이 삭제되었습니다.");
      nav("/community");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      await createComment(postId, { content: comment });
      alert("댓글이 등록되었습니다.");
      setComment("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  if (!post) return <div>불러오는 중...</div>;

  return (
    <div className="PostDetail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>📍 위치: {post.location}</p>
      <p>🍽️ 추천메뉴: {post.recommendedMenu}</p>
      <p>⭐️ 별점: {post.rating}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="첨부 이미지" width="300" />}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button onClick={() => nav(`/writing/edit/${post.id}`)}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
        <Button onClick={() => nav(-1)}>뒤로가기</Button>
      </div>

      {/* 💬 댓글 작성 영역 */}
      <section style={{ marginTop: "40px" }}>
        <h3>💬 댓글 작성</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{ width: "100%", height: "80px", padding: "10px", marginTop: "10px" }}
        />
        <Button onClick={handleCommentSubmit} style={{ marginTop: "10px" }}>
          댓글 등록
        </Button>
      </section>
    </div>
  );

};

export default PostDetail;
