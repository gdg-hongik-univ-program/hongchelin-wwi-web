import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Community = () =>{
    const nav = useNavigate();
    return (
        <div>
            <Header/>
            community
            <Button type="community" onClick={() => nav("/writing")}>
                글쓰기
            </Button>
            <Footer />
        </div>
    )
}

export default Community;
