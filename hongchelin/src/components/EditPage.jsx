import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Writing from "./Writing";
import { getPostById, updatePost } from "../api/post";

const EditPage = () =>{
    const {postId} = useParams();
    const nav = useNavigate();
    const [initData, setInitData] = useState(null);

    useEffect(()=>{
        const fetch = async () => {
            try {
                const data = await getPostById(postId);
                setInitData(data);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error)
            }
        };
        fetch();
    }, [postId]);

    const handleSubmit = async (updatedData) => {
        try {
            await updatePost(postId, updatedData);
            alert("게시글이 수정되었습니다");
            nav(`/posts/${postId}`);
        } catch (error) {
            console.error("수정 실패:", error);
            alert("수정 실패 !");
        }
    };

    return initData && <Writing initData={initData} onSubmit={handleSubmit} />;
}

export default EditPage;