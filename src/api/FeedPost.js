import axios from "axios";

const endPoint = process.env.REACT_APP_BACKEND_DOMAIN;

export const GetAllPosts = async () => {
  return await axios.get(`${endPoint}/posts`);
};

export const ShareThePost = async (sharedPost) => {
  return await axios.post(`${endPoint}/posts`, sharedPost);
};
export const LikePost = async (likes, id) => {
  return await axios.patch(`${endPoint}/posts/${id}`, likes);
};

export const CommentPost = async (comment, id) => {
  return await axios.patch(`${endPoint}/posts/${id}`, comment);
};

export const DeletePost = async (id) => {
  return await axios.delete(`${endPoint}/posts/${id}`);
};
