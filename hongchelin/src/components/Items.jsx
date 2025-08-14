import { useNavigate } from "react-router-dom";
import "./Items.css"

const Items = ({id, title, createdDate, content, location}) => {
    const nav = useNavigate();

    const handleClick = () => {
        nav(`/posts/${id}`)
    }

    return (
        <div className="item-card" onClick={handleClick}>
            <div className="item-header">
                <h3 className="item-title">{title}</h3>
                <span className="item-date">
                {new Date(createdDate).toLocaleDateString("ko-KR")}
                </span>
            </div>
            <h4 className="item-location">📍{location}</h4>
            <p className="item-content">{content}</p>
        </div>
    );
}

export default Items;