import { useContext, useEffect, useState } from "react";
import { _includes } from "./../../../node_modules/zod/v4/core/api";
import commentPic from "../../assets/picture.webp";
import postPic from "../../assets/react.svg";
import { Link } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import moment from "moment/moment";

export default function PostCard({ post , callback }) {

  const [showComments, setShowComments] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(2);
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState("")
  let {addComment , deletePosts} = useContext(PostContext)

  useEffect(() => {
    setComments(post.comments)
  } , [])

  async function handleAddComment (e){
    e.preventDefault()
    const response = await addComment({content:commentContent , post: post._id})
    setComments(response)
  }

   async function handleDeletePost(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering link navigation
    
    // Ask for confirmation
 
    
    try {
      await deletePosts(post._id); // Pass the post ID
    callback()
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    }
  }

  return (
    <div className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6 relative">
      <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="cursor-pointer text-red-500 bg-slate-300 px-3 py-1 top-0 right-0 absolute">x</button>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Confirm!</h3>
    <p className="py-4">Are you sure you want to delete this post</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
                <button onClick={handleDeletePost} className="btn">Delete</button>

      </form>
    </div>
  </div>
</dialog>


      <Link to={`/postDetails/${post?._id}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={post?.user?.photo} alt="User" />
            </div>
          </div>
          <div>
            <p className="font-bold">{post?.user?.name}</p>
            <p className="text-sm text-gray-400">{moment(post?.createdAt).calendar()}</p>
          </div>
        </div>

        <p className="mb-3">{post?.body}</p>

        <img
          src={post?.image ? post.image : postPic}
          className="rounded-lg mb-4 w-full h-[400px]"
          alt="Post"
        />
      </Link>
      <div className="flex gap-3 text-sm text-gray-500">
        <button className="btn btn-ghost btn-sm">👍 Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment {comments.length}
        </button>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

      {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Existing Comments */}
          {comments.slice(0, commentVisibility).map((comment) => (
            <div key={comment?._id}>
              <div className="mb-2 flex justify-between gap-3 items-center">
                <div className="">
                  <div className=" avatar">
                    <div className="w-8 h-8 rounded-full ">
                      <img
                        src={
                          comment.commentCreator.photo.includes("undefined")
                            ? commentPic
                            : comment.commentCreator.photo
                        }
                        alt={comment.commentCreator.name}
                      />
                    </div>
                  </div>
                </div>

                <div className=" w-full">
                  <p className="text-sm">{comment.commentCreator.name} </p>

                  <div className="chat-bubble  w-full">{comment?.content}</div>
                </div>
              </div>
            </div>
          ))}
            {comments.length > commentVisibility &&   <div className="text-center">
            <button
              onClick={() => setCommentVisibility(commentVisibility + 2)}
              className="btn btnt-ransparent my-2"
            >
              Load More Comments
            </button>
          </div>}
        

          {/* New Comment Input */}
          <form onSubmit={(e) => handleAddComment(e)} className="flex  gap-5 content-between items-center">
            <input
              type="text"
              name="content"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button className="px-3 py-2 bg-blue-400 text-white rounded-xl">
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
