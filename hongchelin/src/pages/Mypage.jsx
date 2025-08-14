import Footer from "../components/Footer";
import FeedImg from "../components/FeedImg";
import Header_writing from "../components/Header_writing";
import Profile from "../components/Profile";

function MyPage() {
  const userId = 1; // TODO: 실제 로그인 유저 ID로 교체

  return (
    <div className="MyPage">
      <Header_writing text="마이페이지" />
      <Profile userId={userId} />
      <FeedImg />
      <Footer />
    </div>
  );
}

export default MyPage;
