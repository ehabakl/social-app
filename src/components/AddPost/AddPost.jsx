import React, { useContext, useState } from 'react'
import { PostContext } from './../../Context/PostContext';
import { is } from 'zod/v4/locales';

export default function AddPost({callback}) {
 const {addPosts} = useContext(PostContext)

 const [isLoading, setIsLoading] = useState(false)
    async function handleAddPosts(e){
        e.preventDefault()
        setIsLoading(true)
        let formData = new FormData
        let body = e.target.body.value
        let image = e.target.image.files[0]
        formData.append("body" ,body)
        formData.append("image" ,image)
        let response = await addPosts(formData)
        console.log(response)
        callback?.()
        setIsLoading(false)

    }
  return (
    <div  className='w-1/2 mx-auto'>
        <h2 className='text-blue-800 text-3xl my-5'>Add Post</h2>
      <form onSubmit={(e) => handleAddPosts(e)}>
           <input
          name='body'
          type="text"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-xl"
          placeholder="Type Your Post..."
        />
           <input
           name='image'
          type="file"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-xl"
          placeholder="Insert your Image..."
        />
        <button type="submit" className='bg-blue-800 text-white px-3 py-2 rounded-xl cursor-pointer'>
          {isLoading ? "Loading..." : " Add Post"}
            
        </button>
      </form>
    </div>
  )
}