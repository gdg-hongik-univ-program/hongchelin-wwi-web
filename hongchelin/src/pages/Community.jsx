import Button from "../components/Button";
import Footer from "../components/Footer";
import Items from "../components/Items"
import Header_writing from "../components/Header_writing";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { PostsStateContext } from "../App";
import "./Community.css";
import usePostTitle from "../hooks/usePostTitle";

const Community = () =>{
    const mockPost = {
        id : 1,
        createdDate: "2025-08-04",
        title: "발바리네",
        content: "진짜 맛있어요 !",
        rating: "5"
    }
    const nav = useNavigate();
    usePostTitle("맛집 정보 게시판")
    const posts = useContext(PostsStateContext);
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    
    const getFilteredData = () => {
        if (search === ""){
            return posts;
        }
        return posts.filter((posts) => {
            return(
            posts.content.toLowerCase().includes(search.toLowerCase()) ||
            posts.title.toLowerCase().includes(search.toLowerCase())
            );
        })
    }

    const filteredPosts = getFilteredData();

    return (
        <div>
            <Header_writing text="맛집 정보 게시판"/>
            <div className="Community-search">
                <input
                value={search}
                onChange={onChangeSearch}
                placeholder="🔍 검색어를 입력하세요"/>
                
                <Button type="community" onClick={() => nav("/writing")}>
                    게시글 작성하기
                </Button>
            </div>
            <div>
                <Items
                id= {mockPost.id}
                createdDate={mockPost.createdDate}
                content={mockPost.content} />
            </div>
            <div>
                <Items posts={filteredPosts}/>
            </div>
            <Footer />
        </div>
    )
}

export default Community;
