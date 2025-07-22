import Hong from "../assets/홍슐랭로고.png"
import "../components/Header.css"

const Header = () =>{
    return(
        <div className="Header">
            <img src={Hong} alt="main image"/>
            <h1>홍슐랭</h1>
        </div>
    )
}

export default Header;