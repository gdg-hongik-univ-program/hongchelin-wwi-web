import Button from "./Button";
import "./Header_writing.css";
// import { useNavigate } from "react-router-dom";

const Header_writing = ({text}) => {
    // const nav = useNavigate();

    return (
        <header className="Header_writing">
            <div>
                <h2>
                    {text}
                </h2>
            </div>
        </header>
    )

}

export default Header_writing;
