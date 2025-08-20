// import api from "./axiosInstance";

// export const getPosts = async () => {
//     const res = await api.get("/posts");
//     return res.data;
// }

// export const getPostById = async (postId) => {
//     const res = await api.get(`/posts/${postId}`);
//     return res.data;
// }

// export const createPost = async (postData) => {
//   const payload = {
//     title: postData.title,
//     content: postData.content,
//     location: postData.location,
//     recommendedMenu: postData.recommendedMenu,
//     createdDate: new Date(postData.createdDate ?? new Date()).toISOString(),
//     rating: postData.rating ?? 0,
//     imageUrl: postData.imageUrl ?? null,
//   };

//   console.log(
//     "[createPost] POST",
//     (api.defaults.baseURL || "") + "/posts",
//     payload
//   );

//   const res = await api.post("/posts", payload, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.data;
// };

// export const updatePost = async (postId, postData) => {
//     const res = await api.put(`/posts/${postId}`, postData);
//     return res.data;
// }

// export const deletePost = async (postId) => {
//     const res = await api.delete(`/posts/${postId}`);
//     return {status: res.status};
// }

// export const createComment = async (postId, commentData) => {
//     const res = await api.post(`/posts/${postId}/comments`, commentData);
//     return res.data;
// }

// export const getMyPage = async () => {
//     const res = await api.get(`/api/users/me`);
//     return res.data;
// }

// export const updateUserNickname = async (newNickname) => {
//     const res = await api.put(`/api/users/me/nickname`, {
//         nickname: newNickname,
//     });
//     return res.data;
// };

// export const updateUserProfileImage = async (imageFile) => {
//     const formData = new FormData();
//     formData.append("file", imageFile);

//     const res = await api.post(`/api/users/me/profile-image`, formData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });
//     return res.data;
// }

// export const getMyPosts = async ({page = 0, size = 12} = {}) => {
//     const res = await api.get("api/users/me/posts", {params: {page, size}});
//     return res.data;
// }

// export const setActiveBadge = async (badgeId) => {
//     const res = await api.put(`/api/users/me/badges/active/${badgeId}`);
//     return { status: res.data};
// }

