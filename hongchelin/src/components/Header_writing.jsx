import Button from "./Button";
import "./Header_writing.css"
import { useNavigate } from "react-router-dom"

const Header_writing = ({text}) => {
    const nav = useNavigate();

    return (
        <header className="Header_writing">
            <div>
                <Button type="writing" onClick={()=>nav(-1)}>
                    뒤로가기
                </Button>
                <h1>
                    {text}
                </h1>
            </div>
        </header>
    )

}

export default Header_writing;