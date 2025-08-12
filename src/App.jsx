// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VotePage from "./pages/VotePage";                   // ← 앞서 만든 투표 페이지
import AdminCandidateForm from "./pages/AdminCandidateForm"; // ← 후보 등록 페이지(관리자)

function App() {
  return (
    <Router>
      {/* 선택: 간단 네비게이션 (원하면 삭제해도 됨) */}
      <nav className="p-3 flex gap-4">
        <Link to="/vote">투표</Link>
        <Link to="/admin">후보등록</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </nav>

      <Routes>
        {/* 기본 "/"로 들어오면 투표 페이지로 */}
        <Route path="/" element={<Navigate to="/vote" replace />} />

        {/* 투표/관리자 */}
        <Route path="/vote" element={<VotePage />} />
        <Route path="/admin" element={<AdminCandidateForm />} />

        {/* 인증 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 그 외는 투표로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/vote" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
