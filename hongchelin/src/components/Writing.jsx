import Button from "./Button";
import "./Writing.css"
import FilledStar from "../assets/FilledStar.png"
import EmptyStar from "../assets/EmptyStar.png"
import Header_writing from "./Header_writing"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStringedDate} from "../util/getStringedDate"

const Writing = ({initData, onSubmit}) =>{
    const nav = useNavigate();
    const [input, setInput] = useState({
        createdDate: new Date(),
        content: "",
    })

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
        onSubmit(input)
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
                value={input.content}
                onChange={onChangeInput}
                placeholder="제목을 입력해주세요"/>
            </section>

            <section className="date_section">
                <h4>날짜</h4>
                <input
                name="createdDate"
                onChange={onChangeInput}
                value={getStringedDate(input.createdDate)}
                type="date"/>
            </section>

            <section className="date_section">
                <h4>위치</h4>
                <input/>
                {/* 지도 API 연결하기 */}
            </section>

            <section className="">
                <h4>추천메뉴</h4>
                <input/>
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
                <h4>별점</h4>
                <div>{renderStars()}</div>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= 5){
                            setRating(value);
                        }
                    }}
                    placeholder="1~5 사이의 숫자를 입력하세요"/>
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