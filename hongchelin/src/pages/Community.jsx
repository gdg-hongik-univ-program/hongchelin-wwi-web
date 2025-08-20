import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Items from "../components/Items";
import Header_writing from "../components/Header_writing";
import "./Community.css";
import usePostTitle from "../hooks/usePostTitle";
import { getCommunityPosts } from "../api/community";

const Community = () => {
  const nav = useNavigate();
  usePostTitle("맛집 정보 게시판");

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (query = "") => {
    try {
      setLoading(true);
      const data = await getCommunityPosts({ query, page: 0, size: 20 });
      setPosts(Array.isArray(data) ? data : (data?.content || []));

    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
      setPosts([]); // 에러 났을 때도 안전하게 초기화
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    fetchPosts(search.trim());
  };

  return (
    <div>
      <Header_writing text="맛집 정보 게시판" />
      <div className="Community-search">
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="🔍 검색어를 입력하세요"
        />
        <Button type="search" onClick={handleSearch}>
          검색
        </Button>
        <Button type="community" onClick={() => nav("/writing")}>
          게시글 작성하기
        </Button>
      </div>

      <div>
        {loading ? (
          <div>불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            검색 결과가 없어요. 다른 키워드를 입력해보세요.
          </div>
        ) : (
          posts.map((post) => (
            <Items
              key={post.id}
              id={post.id}
              title={post.title}
              createdDate={post.createdDate}
              content={post.content}
              restaurantName={post.restaurantName}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Community;
