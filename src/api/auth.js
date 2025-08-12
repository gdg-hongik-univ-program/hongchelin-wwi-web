import axios from "axios";

// 로그인
export const login = async ({ id, password }) => {
  const res = await axios.post("/api/login", { id, password });
  return res.data;
};

// 회원가입
export const signUp = async ({ name, id, password, email }) => {
  const res = await axios.post("/api/signup", {
    name,
    id,
    password,
    email,
  });
  return res.data;
};

// 이메일 인증번호 전송
export const sendVerificationEmail = async (email) => {
  const res = await axios.post("/api/auth/email/send", { email });
  return res.data;
};

// 이메일 인증번호 확인
export const verifyCode = async (email, code) => {
  const res = await axios.post("/api/auth/email/verify", { email, code });
  return res.data;
};

// 카카오 로그인: 인가코드로 JWT 요청
export const kakaoLogin = async (code) => {
  const res = await axios.post("/api/oauth/kakao", { code });
  return res.data; // 보통 { token: "JWT-토큰" }
};

// 네이버 로그인도 동일하게
export const naverLogin = async (code, state) => {
  const res = await axios.post("/api/oauth/naver", { code, state });
  return res.data;
};
