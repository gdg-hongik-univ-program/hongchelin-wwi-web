import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";

import hongchelinLogo from "../asset/hongchelin-logo.png";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_KAKAO_JAVASCRIPT_KEY");
    }
  }, []);

  const handleLogin = async () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await api.post("/api/login", { id, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("로그인 성공!");
      window.location.href = "/home";
    } catch (error) {
      console.error("로그인 실패", error);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/oauth/kakao",
    });
  };

  const loginWithNaver = () => {
    const clientId = "YOUR_NAVER_CLIENT_ID";
    const redirectUri = encodeURIComponent("http://localhost:5173/oauth/naver");
    const state = Math.random().toString(36).substring(2);
    const naverAuthUrl =
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {/* 로고 + 설명 */}
        <div className="mb-6">
          <img src={hongchelinLogo} alt="홍슐랭 로고" className="h-12" />
          <p className="mt-1 text-sm text-gray-600">홍대생을 위한 맛집 투표 서비스</p>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col gap-3 mb-6">
          <button 
            onClick={loginWithKakao} 
            className="w-full h-10 rounded-md bg-[#FEE500] text-black font-bold text-sm hover:opacity-90 transition"
          >
            카카오톡 로그인
          </button>
          <button 
            onClick={loginWithNaver} 
            className="w-full h-10 rounded-md bg-[#03C75A] text-white font-bold text-sm hover:opacity-90 transition"
          >
            네이버 로그인
          </button>
          <button 
            className="w-full h-10 rounded-md bg-gray-300 text-black font-medium text-sm hover:opacity-90 transition"
          >
            구글 로그인
          </button>
        </div>

        {/* 아이디, 비밀번호 + 로그인 버튼 */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full h-10 rounded-md bg-gray-200 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 rounded-md bg-gray-200 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleLogin}
            className="w-full h-10 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 active:bg-red-800 transition"
          >
            로그인
          </button>
        </div>

        {/* 하단 링크 */}
        <div className="mt-4 flex justify-between text-xs text-gray-600 underline">
          <a href="#">아이디 찾기</a>
          <a href="#">비밀번호 찾기</a>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}
