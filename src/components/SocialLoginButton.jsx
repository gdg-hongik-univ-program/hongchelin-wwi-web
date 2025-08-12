import { useEffect } from "react";

const KakaoLoginButton = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_JAVASCRIPT_KEY"); // ✅ 본인의 카카오 앱 JavaScript 키로 교체
    }
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/oauth/kakao", // ✅ 실제 등록한 redirect URI
    });
  };

  return (
    <button
      onClick={loginWithKakao}
      className="bg-yellow-300 text-black px-4 py-2 rounded w-full"
    >
      카카오로 로그인
    </button>
  );
};

export default KakaoLoginButton;
