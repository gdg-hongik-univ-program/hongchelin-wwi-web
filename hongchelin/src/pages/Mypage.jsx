import Footer from "../components/Footer";
import ImageBox from "../components/ImageBox";
import Badge from "../components/Badge"
import Header_writing from "../components/Header_writing";
import Profile from "../components/Profile";

function MyPage() {
  const userId = 1;

  return (
    <div className="MyPage">
      <Header_writing text="마이페이지" />
      <Profile userId={userId} />
      <Badge />
      <ImageBox />
      <Footer />
    </div>
  );
}

export default MyPage;
