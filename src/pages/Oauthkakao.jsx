// src/pages/OauthKakao.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OauthKakao() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (!code) {
      alert("인가 코드가 없습니다.");
      return navigate("/login");
    }

    const getToken = async () => {
      try {
        // ✅ 백엔드에 인가 코드 전달
        const res = await axios.post("/api/auth/kakao", {
          code,
        });

        const token = res.data.token;

        // ✅ 토큰 저장
        localStorage.setItem("token", token);

        alert("카카오 로그인 성공!");
        navigate("/home"); // 원하는 경로로 이동
      } catch (err) {
        console.error("카카오 로그인 실패", err);
        alert("카카오 로그인에 실패했습니다.");
        navigate("/login");
      }
    };

    getToken();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      카카오 로그인 처리 중입니다...
    </div>
  );
}
