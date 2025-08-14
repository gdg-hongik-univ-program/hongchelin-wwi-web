import api from "./axiosInstance";
// import axios from "axios";

export const getPosts = async () => {
    const res = await api.get("/posts");
    return res.data;
}

export const getPostById = async (postId) => {
    const res = await api.get(`/posts/${postId}`);
    return res.data;
}

export const createPost = async(postData) => {
    const res = await api.post("/posts", postData);
    return res.data;
}

export const updatePost = async (postId, postData) => {
    const res = await api.put(`/posts/${postId}`, postData);
    return res.data;
}

export const deletePost = async (postId) => {
    const res = await api.delete(`/posts/${postId}`);
    return {status: res.status};
}

export const createComment = async (postId, commentData) => {
    const res = await api.post(`/posts/${postId}/comments`, commentData);
    return res.data;
}

export const getMyPage = async (userId) => {
    const res = await api.get(`/api/mypage/${userId}`);
    return res.data;
}

export const updateUserNickname = async (userId, newNickname) => {
    const res = await api.patch(`/api/mypage/${userId}/nickname`, {
        nickname: newNickname,
    });
    return res.data;
};

export const updateUserProfileImage = async (userId, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await api.patch(`/api/mypage/${userId}/profile`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}