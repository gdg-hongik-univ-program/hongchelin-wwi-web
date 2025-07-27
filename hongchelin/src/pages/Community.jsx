import Button from "../components/Button";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import Items from "../components/Items"
import Header_writing from "../components/Header_writing";
import { useNavigate } from "react-router-dom";

const Community = () =>{
    const nav = useNavigate();
    return (
        <div>
            <Header_writing text="맛집 정보 게시판"/>
            <div>
                <Button type="community">
                    검색
                </Button>
                <Button type="community" onClick={() => nav("/writing")}>
                    글쓰기
                </Button>
            </div>
            <div>
                <Items />
            </div>

            <Footer />
        </div>
    )
}

export default Community;
