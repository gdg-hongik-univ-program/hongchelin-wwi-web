import Button from "./Button";
import "./Writing.css"
import FilledStar from "../assets/FilledStar.png"
import EmptyStar from "../assets/EmptyStar.png"
import Header_writing from "./Header_writing";
import ImageUpload from "./ImgUpload";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStringedDate} from "../util/getStringedDate"

const Writing = ({initData, onSubmit}) =>{
    const nav = useNavigate();
    const [input, setInput] = useState({
        title: "",
        createdDate: new Date(),
        content: "",
        recommendedMenu: "",
        location: "",
    })

    const [searchKeyword, setSearchKeyword] = useState("");

    const [rating, setRating] = useState(0);
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? FilledStar : EmptyStar}
                    alt={`${i} star`}
                    onClick={() => setRating(i)}
                    style={{ width: "32px", height: "32px", cursor: "pointer", marginRight: "5px" }}
                />
            );
        }
        return stars;
    };

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate))
            })
        }
    }, [initData])

    const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if(name === "createdDate"){
        value = new Date(value);
    }
    setInput({
        ...input,
        [name] : value,
    })
    }

    const onClickSubmitButton = () =>{
        onSubmit({...input, rating})
    }


    return (
        <div className="Writing">
            <div>
                <Header_writing text="새로운 게시글 작성하기"/>
            </div>
            <section>
                <h4>제목</h4>
                <input 
                name="title"
                value={input.title}
                onChange={onChangeInput}
                placeholder="제목을 입력해주세요"
                required
                />
            </section>

            <section className="date_section">
                <h4>📅날짜</h4>
                <input
                name="createdDate"
                onChange={onChangeInput}
                value={getStringedDate(input.createdDate)}
                type="date"/>
            </section>

            <section className="date_section">
                <h4>📍위치</h4>
                <input 
                type="text"
                placeholder="가게 이름을 입력해주세요"
                value={searchKeyword}
                onChange={(e)=>setSearchKeyword(e.target.value)}
                style={{marginBottom: "10px"}}
                required/>
            </section>

            <section className="">
                <h4>🍽️추천메뉴</h4>
                <input
                name="recommendedMenu"
                value={input.recommendedMenu}
                onChange={onChangeInput}
                placeholder="추천메뉴를 입력해주세요"
                required/>
            </section>

            <section>
                <h4>내용</h4>
                <textarea 
                name="content"
                value={input.content}
                onChange={onChangeInput}
                placeholder="내용을 입력해주세요"/>
            </section>

            <section>
                <h4>📷사진 추가</h4>
                <ImageUpload />
            </section>

            <section>
                <h4>⭐️별점</h4>
                <div>{renderStars()}</div>
            </section>
            
            <div className="Buttons">
                <Button type="cancel" onClick={() => nav(-1)}>
                    취소하기
                </Button>
                <Button type="submit" onClick={onClickSubmitButton}>
                    작성완료
                </Button>
            </div>
        </div>
    )
}

export default Writing;