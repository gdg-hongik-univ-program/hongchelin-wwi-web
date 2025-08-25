import Footer from "../components/Footer";
import ImageBox from "../components/ImageBox";
import Header_writing from "../components/Header_writing";
import Profile from "../components/Profile";
import { useEffect, useState } from "react";
import { getMyPosts } from "../api/users";
import Badge from "../components/Badge";
// import BadgeModal from "../components/BadgeModal";

function MyPage() {
  const userId = 1;
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    getMyPosts(0,12).then(page=>{
      const list = Array.isArray(page?.content) ? page.content : (Array.isArray(page) ? page : []);
      setMyPosts(list);
    }).catch(()=>setMyPosts([]))
  },[]);

  return (
    <div className="MyPage">
      <Header_writing text="마이페이지" />
      <Profile userId={userId} />
      <Badge/>
      <ImageBox/>
      <Footer />
    </div>
  );
}

export default MyPage;
