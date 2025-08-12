import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import OauthKakao from "../pages/OauthKakao"; // ✅ 카카오 리디렉션 처리 컴포넌트 import
import OauthNaver from "../pages/OauthNaver"; // ✅ 네이버 리디렉션 처리 컴포넌트 import

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/kakao" element={<OauthKakao />} /> {/* ✅ 카카오 */}
        <Route path="/oauth/naver" element={<OauthNaver />} /> {/* ✅ 네이버 */}
        {/* 다른 페이지들도 여기에 추가 가능 */}
      </Routes>
    </Router>
  );
}
