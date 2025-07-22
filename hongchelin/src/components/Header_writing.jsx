import Button from "./Button";
import "./Header_writing.css"
import { useNavigate } from "react-router-dom"

const Header_writing = () => {
    const nav = useNavigate();

    return (
        <header className="Header_writing">
            <div>
                <Button type="writing" onClick={()=>nav(-1)}>
                    뒤로가기
                </Button>
                <h1>
                    새로운 게시글 작성하기
                </h1>
            </div>
        </header>
    )

}

export default Header_writing;