import api from "./axiosInstance";

const rawPrefix = import.meta.env.VITE_API_PREFIX ?? "";
const API_PREFIX = rawPrefix ? (rawPrefix.startsWith("/") ? rawPrefix : `/${rawPrefix}`) : "";


const USERS_PATH = `${API_PREFIX}/users`;
const ME_PATH = `${USERS_PATH}/me`;


if (import.meta.env.DEV) {
  console.log("[USER API]", {
    baseURL: api.defaults.baseURL,
    API_PREFIX,
    USERS_PATH,
    ME_PATH,
  });
}


export const getMyProfile = async () => {
  const res = await api.get(ME_PATH);
  return res.data;
};


export const updateMyNickname = async (nickname) => {
  const res = await api.put(`${ME_PATH}/nickname`, { nickname });
  return res.data;
};


export const updateMyProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(`${ME_PATH}/profile-image`, formData);
  return res.data;
};


export const getMyPosts = async (page = 0, size = 12) => {
  const res = await api.get(`${ME_PATH}/posts`, { params: { page, size } });
  return res.data;
};


export const setActiveBadge = async (badgeId) => {
  const res = await api.put(`${ME_PATH}/badges/active/${badgeId}`);
  return res.data;
};
