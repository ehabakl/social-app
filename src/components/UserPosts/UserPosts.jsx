import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../Context/PostContext';

import Loader from "../Loader/Loader";
import PostCard from '../PostCard/PostCard';
import AddPost from './../AddPost/AddPost';

export default function UserPosts() {

  let {getUserData , getUserPosts} = useContext(PostContext);
  const [userPosts, setUserPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getUserPostData(){
    let response = await getUserData();
    let data = await getUserPosts(response._id);
    console.log(data, "user posts data");
    setUserPosts(data.reverse());  
    setIsLoading(false)
    console.log(userPosts , "up")
  }



  useEffect(() => {
    getUserPostData()
  } , [])
  return (
    <div>
      <div className="container mx-auto">
        {isLoading ? <Loader /> : 
            <>
            <AddPost callback={getUserPostData} />
        <div className="flex justify-center align-items">
          <div className="w-full">
   {userPosts.map((post) => <PostCard callback = {getUserPostData} key={post._id} post={post} />)}

          </div>
        </div>

            </>
            }

      </div>
    </div>
  )
}
