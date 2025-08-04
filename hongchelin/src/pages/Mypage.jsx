// import { useState } from "react";
import Footer from "../components/Footer";
import FeedImg from "../components/FeedImg";
import Name from "../components/Name";
import Header_writing from "../components/Header_writing"
import Information from "../components/Information";

function MyPage(){
    return(
        <div className="MyPage">
            <Header_writing text="마이페이지"/>
            <div>
                <Name />
            </div>
            <FeedImg />
            <Information />
            <Footer />
        </div>

    )
}

export default MyPage;