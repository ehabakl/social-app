import React from "react";
import { PostContext } from "../../Context/PostContext";

import PostCard from "./../PostCard/PostCard";

import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";
import axios from "axios";

import {
  useQuery,
 
} from '@tanstack/react-query'

export default function Home() {
  // const [allPosts, setAllPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)
  // let { getAllPosts } = useContext(PostContext);

  // async function getPosts() {
  //   let response = await getAllPosts();
  //   console.log(response);
  //   setAllPosts(response);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

function getAllPosts() {
    let headers = {
    token: localStorage.getItem("userToken"),
  };
  return axios.get("https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt", { headers })
}
 let {data , error , isError , isFetching , isLoading} =  useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts
  })
  return (
    <>
      <div className="container mx-auto">
        {isError ? <h1 className="text-red-500 text-center text-2xl"> {error.message} </h1> : ""}
        {isLoading ? <Loader /> :
        <>
        <AddPost />
         <div className="flex justify-center items center">
          <div className="w-full">
            {data?.data?.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
        </>
        }
       
      </div>
    </>

  );
}
