import { useNavigate } from "react-router-dom";
import Writing from "./Writing";
import { createPost } from "../api/post";

const WritingPage = () => {
    const nav = useNavigate();
    const handleSubmit = async (postData) => {
        try{
            await createPost(postData);
            alert("게시글이 등록되었습니다 !");
            nav("/community");
        } catch (error){
            console.error("등록 실패:", error);
            alert("게시글 등록에 실패했습니다.")
        }
    };
    
    return <Writing onSubmit={handleSubmit} />;
}

export default WritingPage;