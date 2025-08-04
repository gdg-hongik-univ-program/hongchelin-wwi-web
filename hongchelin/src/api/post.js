import api from "./axiosInstance";
// import axios from "axios";

export const getPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
}

export const getPostById = async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
}

export const createPost = async(postData) => {
    const response = await api.post("/posts", postData);
    return response.data;
}

export const updatePost = async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
}

export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
}

export const createComment = async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
}

export const updateUserNickname = async (newNickname) => {
    const response = await api.patch("/user", {name: newNickname});
    return response.data;
};

export const updateUserProfileImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.patch("/user/profile-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}