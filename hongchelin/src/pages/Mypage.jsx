//import { useState } from "react";
import FeedImg from "../components/FeedImg";
// import Footer from "../pages/Footer";
import Name from "../components/Name";

function MyPage(){
    return(
        <div className="MyPage">
            <h1>My Page</h1>
            <Name />
            <FeedImg />
        </div>

    )
}

export default MyPage;