import "../components/Footer.css"
import Button from "./Button"
import Map from "../assets/Map.png"
import Community from "../assets/Community.png"
import MyPage from "../assets/MyPage.png"
import Vote from "../assets/Vote.png"
import { useNavigate } from "react-router-dom"


function Footer() {
    const nav = useNavigate();

    return(
        <div className="Footer">
         <Button type="footer" onClick={() => nav("/")}>
            <img src={Map} alt="Map img" width="40px" height="40px"/>
         </Button>
         <Button type="footer" onClick={() => nav("/community")}>
            <img src={Community} alt="Community img" width="40px" height="40px" />
         </Button>
         <Button type="footer" onClick={() => nav("/vote")}>
            <img src={Vote} alt="Vote img" width="40px" height="40px" />
         </Button>
         <Button type="footer" onClick={() => nav("/mypage")}>
            <img src={MyPage} alt="MyPage img" width="36px" height="36px" />
         </Button>
        </div>
    )
}

export default Footer;
