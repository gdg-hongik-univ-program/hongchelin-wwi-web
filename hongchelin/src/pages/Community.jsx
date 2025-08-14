import Button from "../components/Button";
import Footer from "../components/Footer";
import Items from "../components/Items"
import Header_writing from "../components/Header_writing";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
import { PostsStateContext } from "../App";
import "./Community.css";
import usePostTitle from "../hooks/usePostTitle";
import { mockPost } from "../../mock/mockData";

const Community = () =>{
    // const post = mockPost;
    const nav = useNavigate();
    usePostTitle("맛집 정보 게시판");

    const contextPosts = useContext(PostsStateContext);
    const posts = contextPosts.length > 0 ? contextPosts : mockPost;

    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    
    const filteredPosts = useMemo(() => {
        const normalized = (s) => (s ? String(s).toLowerCase() : "");
        const list = posts || [];

        const result =
        search.trim() === ""
            ? list
            : list.filter((post) => {
                const t = normalized(post.title);
                const c = normalized(post.content);
                const l = normalized(post.location);
                const q = normalized(search);
                return t.includes(q) || c.includes(q) || l.includes(q);
            });

        return [...result].sort((a, b) => {
        const da = new Date(a.createdDate).getTime();
        const db = new Date(b.createdDate).getTime();
        return db - da;
        });
    }, [posts, search]);

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
                {filteredPosts.length === 0 ? (
                <div className="empty-state">
                    검색 결과가 없어요. 다른 키워드를 입력해보세요.
                </div>
                ) : (
                filteredPosts.map((post) => (
                    <Items
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    createdDate={post.createdDate}
                    content={post.content}
                    location={post.location}
                    />
                ))
                )}
            </div>
            {/* <div>
                <Items posts={filteredPosts}/>
            </div> */}
            <Footer />
        </div>
    )
}

export default Community;
