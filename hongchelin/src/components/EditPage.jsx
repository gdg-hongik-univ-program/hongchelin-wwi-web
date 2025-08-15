import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Writing from "./Writing";
import { getPostById, updatePost } from "../api/post";


function parseToDateSafe(v) {
  if (!v) return new Date();
  if (v instanceof Date && !isNaN(v.getTime())) return v;
  const asNum = Number(v);
  if (!isNaN(asNum)) {
    const d = new Date(asNum);
    if (!isNaN(d.getTime())) return d;
  }
  const d2 = new Date(v);
  if (!isNaN(d2.getTime())) return d2;
  return new Date();
}


function normalizePost(data) {
  return {
    id: data.id,
    title: data.title ?? "",
    content: data.content ?? "",
    location: data.location ?? "",
    recommendedMenu: data.recommendedMenu ?? "",
    rating: typeof data.rating === "number" ? data.rating : 0,
    createdDate: parseToDateSafe(data.createdDate),
    imageUrl: data.imageUrl ?? "",
  };
}

const EditPage = () =>{
    const {postId} = useParams();
    const {state} = useLocation();
    const nav = useNavigate();

    const [initData, setInitData] = useState(state || null);
    const [loading, setLoading] = useState(!state);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!state) {
        const fetchData = async () => {
            try {
            setLoading(true);
            const data = await getPostById(postId);
            setInitData(normalizePost(data));
            } catch (err) {
            console.error("데이터 불러오기 실패:", err);
            setError("게시글을 불러오지 못했습니다.");
            } finally {
            setLoading(false);
            }
        };
        fetchData();
        }
    }, [postId, state]);

  const handleSubmit = async (updatedData) => {
    try {
      const payload = {
        ...updatedData,
        createdDate: new Date(updatedData.createdDate).toISOString(),
      };
      await updatePost(postId, payload);
      alert("게시글이 수정되었습니다");
      nav(`/posts/${postId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정 실패 !");
    }
  };

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>{error}</div>;
  if (!initData) return <div>게시글 데이터가 없습니다.</div>;

  return <Writing mode="edit" initData={initData} onSubmit={handleSubmit} />;
};

export default EditPage;