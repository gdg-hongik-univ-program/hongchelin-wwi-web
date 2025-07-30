import React, { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // 이메일 인증번호 발송
  const handleSendCode = async () => {
    const hongikEmailRegex = /^[^\s@]+@g\.hongik\.ac\.kr$/;

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!hongikEmailRegex.test(email)) {
      alert("홍익대학교 이메일(@g.hongik.ac.kr)만 입력 가능합니다.");
      return;
    }

    try {
      const code = "123456"; // 실제 서버에서 받아야 함
      setSentCode(code);
      setVerificationCode(""); // 이전 입력 초기화
      setIsVerified(false); // 이전 인증 상태 초기화
      alert("인증번호가 이메일로 전송되었습니다.");
    } catch (err) {
      console.error("전송 실패", err);
      alert("인증번호 발송에 실패했습니다.");
    }
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    if (verificationCode === sentCode) {
      setIsVerified(true);
      alert("이메일 인증 완료!");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        name,
        id,
        password,
        email,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("회원가입 완료! 로그인되었습니다.");
      // window.location.href = "/home"; // 원하는 경로로 이동
    } catch (err) {
      console.error("회원가입 실패", err);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-xs">
        {/* 입력 폼 */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="이름(닉네임?)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>

        {/* 재학생 인증 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">재학생 인증하기</h3>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="이메일 입력창"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="인증번호 입력하기"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="bg-gray-200 px-4 py-2 rounded"
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={handleSendCode}
                className="bg-gray-300 px-4 py-2 rounded text-sm"
              >
                인증번호발송
              </button>
              <button
                onClick={handleVerifyCode}
                className="bg-gray-300 px-4 py-2 rounded text-sm"
              >
                인증하기
              </button>
            </div>

            {isVerified && (
              <p className="text-green-600 text-xs font-medium">
                인증 완료되었습니다.
              </p>
            )}
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSignup}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded w-full"
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}
