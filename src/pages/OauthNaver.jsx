import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NaverRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      alert("네이버 로그인에 실패했습니다.");
      navigate("/login");
      return;
    }

    const sendCodeToBackend = async () => {
      try {
        const response = await axios.post("/api/auth/naver", {
          code,
          state,
        });

        const token = response.data.token;
        localStorage.setItem("token", token);

        alert("네이버 로그인 성공!");
        navigate("/home"); // 원하는 페이지로 이동
      } catch (error) {
        console.error("네이버 로그인 실패", error);
        alert("네이버 로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    sendCodeToBackend();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-700">
      네이버 로그인 처리 중입니다...
    </div>
  );
}
