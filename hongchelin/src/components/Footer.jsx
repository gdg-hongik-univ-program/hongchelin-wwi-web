import "../components/Footer.css"
import Button from "./Button"
import Home from "../assets/Home.png"
import Community from "../assets/Community.png"
import MyPage from "../assets/MyPage.png"
import Vote from "../assets/Vote.png"
import { useNavigate } from "react-router-dom"


function Footer() {
    const nav = useNavigate();

    return(
        <div className="Footer">
         <Button type="footer" onClick={() => nav("/")}>
            <img src={Home} alt="Home img" width="36px" height="36px"/>
            HOME
         </Button>
         <Button type="footer" onClick={() => nav("/community")}>
            <img src={Community} alt="Community img" width="36px" height="36px" />
            COMMUNITY
         </Button>
         <Button type="footer" onClick={() => nav("/vote")}>
            <img src={Vote} alt="Vote img" width="36px" height="36px" />
            VOTE
         </Button>
         <Button type="footer" onClick={() => nav("/mypage")}>
            <img src={MyPage} alt="MyPage img" width="36px" height="36px" />
            MYPAGE
         </Button>
        </div>
    )
}

export default Footer;
