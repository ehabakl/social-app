import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
  
  // Helper function to always get the latest headers
  const getAuthHeaders = () => ({
    token: localStorage.getItem("userToken"),
  });

  async function getSinglePost(id) {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers: getAuthHeaders() }
      );
      return data.post;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/profile-data`,
        { headers: getAuthHeaders() }
      );
      return data.user;
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      }
    }
  }

  async function getUserPosts(id) {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${id}/posts?limit=10`,
        { headers: getAuthHeaders() }
      );
      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }

  async function addComment(body) {
    try {
      const { data } = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        body,
        { headers: getAuthHeaders() }
      );
      toast.success("Comment added successfully");
      return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    }
  }

  async function addPosts(formData) {
    try {
      const { data } = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        formData,
        { headers: getAuthHeaders() }
      );
      toast.success("Post added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add post");
    }
  }

  async function deletePosts(id) {
    try {
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers: getAuthHeaders() }
      );
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post");
    }
  }

  return (
    <PostContext.Provider
      value={{
        getUserData,
        getUserPosts,
        getSinglePost,
        addComment,
        addPosts,
        deletePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
