import { useNavigate } from "react-router-dom";
import Writing from "./Writing";
import { createCommunityPost } from "../api/community";

const WritingPage = () => {
  const nav = useNavigate();
  const handleSubmit = async (postData) => {
    try {
      await createCommunityPost(postData);
      alert("게시글이 등록되었습니다 !");
      nav("/community");
    } catch (error) {
      console.error("등록 실패:", error);
      console.log("FINAL URL:", (error?.config?.baseURL || "") + (error?.config?.url || ""));
      console.log("REQ DATA:", error?.config?.data);
      console.log("STATUS/DATA:", error?.response?.status, error?.response?.data);
      alert(`게시글 등록 실패 (${error?.response?.status || "네트워크"})`);
    }
  };

  return <Writing mode="create" onSubmit={handleSubmit} />;
};

export default WritingPage;
