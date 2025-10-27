import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";

export default function PostDetails() {
  let { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(id);
  let { getSinglePost } = useContext(PostContext);
  async function getPostDetails(id) {
    let response = await getSinglePost(id);
    setSinglePost(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getPostDetails(id);
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <PostCard post={singlePost} />
        </div>
      )}
    </div>
  );
}
