import api from "./post";

export const getUsers = async () => {
  const res = await api.get("/users"); // 실제 주소: http://localhost:8080/api/users
  return res.data;
};
