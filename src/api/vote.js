import api from "./axiosInstance";

// 후보 목록 가져오기
export const getCandidates = async () => {
  const { data } = await api.get("/votes/candidates");
  return data; // [{ id, name, description, imageUrl }, ...]
};

// 투표 제출 (최대 3개)
export const submitVote = async ({ pollId, selectedIds }) => {
  const { data } = await api.post(`/votes/${pollId}/submit`, { selectedIds });
  return data;
};

// 관리자: 후보 등록 (사진 업로드 + 설명)
export const createCandidate = async (form) => {
  const fd = new FormData();
  fd.append("name", form.name);
  fd.append("description", form.description || "");
  fd.append("image", form.imageFile); // <input type="file" />
  // 필요 시 pollId 등 추가: fd.append("pollId", form.pollId)
  const { data } = await api.post("/votes/candidates", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
