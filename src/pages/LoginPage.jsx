import React, { useState } from "react";
import axios from "axios";

import hongchelinLogo from "../asset/hongchelin-logo.png";
import serviceImage from "../asset/service.png";

import kakaoLogo from "../asset/kakaotalk-logo.png";
import naverLogo from "../asset/naver-logo.png";
import googleLogo from "../asset/google-logo.png";

import idImage from "../asset/ID.png";
import pwImage from "../asset/PASSWORD.png";
import loginImage from "../asset/login.png";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        id,
        password,
      });

      const token = response.data.token;

      // JWT 토큰을 localStorage에 저장
      localStorage.setItem("token", token);

      alert("로그인 성공!");
      // 로그인 후 페이지 이동
      window.location.href = "/home"; // 또는 리디렉트하고 싶은 경로로 변경
    } catch (error) {
      console.error("로그인 실패", error);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* 로고와 설명 */}
        <div className="flex items-center gap-3 mb-6">
          <img src={hongchelinLogo} alt="홍슐랭 로고" className="h-12" />
          <img src={serviceImage} alt="서비스 설명" className="h-6" />
        </div>

        {/* 소셜 로그인 (아직 기능 없음) */}
        <div className="flex flex-col gap-4 mb-6">
          <button className="flex justify-center items-center h-12 bg-transparent">
            <img src={kakaoLogo} alt="카카오 로그인" className="h-full object-contain" />
          </button>
          <button className="flex justify-center items-center h-12 bg-transparent">
            <img src={naverLogo} alt="네이버 로그인" className="h-full object-contain" />
          </button>
          <button className="flex justify-center items-center h-12 bg-transparent">
            <img src={googleLogo} alt="구글 로그인" className="h-full object-contain" />
          </button>
        </div>

        {/* 아이디, 비밀번호 입력 */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <img src={idImage} alt="아이디 입력창" className="w-full h-10 object-contain" />
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="absolute top-0 left-0 w-full h-10 bg-transparent px-3 py-1 text-sm text-gray-800 focus:outline-none"
            />
          </div>

          <div className="relative">
            <img src={pwImage} alt="비밀번호 입력창" className="w-full h-10 object-contain" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute top-0 left-0 w-full h-10 bg-transparent px-3 py-1 text-sm text-gray-800 focus:outline-none"
            />
          </div>

          <button className="w-full" onClick={handleLogin}>
            <img
              src={loginImage}
              alt="로그인 버튼"
              className="w-full h-10 object-contain hover:opacity-90"
            />
          </button>
        </div>

        {/* 하단 링크 */}
        <div className="flex justify-between text-xs text-gray-600 underline">
          <a href="#">아이디 찾기</a>
          <a href="#">비밀번호 찾기</a>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}
