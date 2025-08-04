import "./Name.css";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

const Name = ({nickname, profileImage, onEditClick}) => {
  // const nav = useNavigate();

  return (
    <div className="Name">
      <img src={profileImage}
      alt="프로필사진"
      className="profile-img"
      onClick={onEditClick}
      />
      <h3>{nickname}</h3>
    </div>
  );
};

export default Name;
