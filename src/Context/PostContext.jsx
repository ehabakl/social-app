import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  // async function getAllPosts() {
  //   console.log(headers);
  //   try {
  //     let { data } = await axios.get(
  //       `https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
  //       {
  //         headers,
  //       }
  //     );
  //     console.log(data, "from context");

  //     return data.posts;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function getSinglePost(id) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers,
        }
      );

      return data.post;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserData() {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/profile-data`,
        {
          headers,
        }
      );

      return data.user;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserPosts(id) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${id}/posts?limit=10`,
        {
          headers,
        }
      );

      console.log(data, "from getUserPosts");
      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }

  async function addComment(body) {
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        body,
        {
          headers,
        }
      );
      toast.success("comment added Successfully ");

      console.log(data, "new comments");
      return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("failed to add comment");
    }
  }

  async function addPosts(formData) {
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        formData,
        {
          headers,
        }
      );
      toast.success("Post added Successfully ");

      console.log(data, "adding Posts");
      //  return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("failed to add Post");
    }
  }
  async function deletePosts(id) {
    try {
      let { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers,
        }
      );
      toast.success("Post deleted Successfully ");

      console.log(data, "del Posts");
      //  return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("failed to delete Post");
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
