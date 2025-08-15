import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getPostById, deletePost, createComment } from "../api/post";
import Button from "../components/Button";
import { mockPost } from "../../mock/mockData";
import { PostsStateContext } from "../App";
import "./PostDetail.css"

const PostDetail = () => {
  const { postId } = useParams();
  const nav = useNavigate();

  const contextPosts = useContext(PostsStateContext) || [];
  const fallbackPosts = contextPosts.length > 0 ? contextPosts : mockPost;

  const [post, setPost] = useState(
    fallbackPosts.find((p) => String(p.id) === String(postId)) || null
  );
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    const needFetch = !post;
    if (!needFetch) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(postId);
        setPost(data);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      } finally {
        setLoading(false);
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

    const handleEdit = () => {
    nav(`/writing/edit/${post.id}`, {state: post})
  }

  if (loading) return <div>불러오는 중...</div>
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="PostDetail">
      <div>
        <Button type= "back" onClick={() => nav(-1)} style={{marginTop : "10px"}}>뒤로가기</Button>
      </div>

      <div className="info">
        <img
          src={post.profileImage}
          alt={`${post.nickname} 프로필`}
          className="profile-image"
        />
        <div className="info-text">
          <p className="nickname">{post.nickname}</p>
          <p className="created-date">
            {new Date(post.createdDate).toLocaleDateString("ko-KR")}{" "}
            {new Date(post.createdDate).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>

      <div className="title">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
      <div className="detail">
        <p>📍 위치: {post.location}</p>
        <p>🍽️ 추천메뉴: {post.recommendedMenu}</p>
        <p>⭐️ 별점: {post.rating} / 5</p>
        {post.imageUrl && <img src={post.imageUrl} alt="첨부 이미지" width="300" />}
      </div>

      <div className="postDetail">
        <Button onClick={handleEdit}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </div>

      <section style={{ marginTop: "40px" }}>
        <h3>💬 댓글 작성</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{ width: "90%", height: "80px", padding: "10px", marginTop: "10px" }}
        />
        <Button onClick={handleCommentSubmit} style={{ marginTop: "10px" }}>
          댓글 등록
        </Button>
      </section>
    </div>
  );

};

export default PostDetail;
