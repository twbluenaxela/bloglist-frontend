import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import blogService from '../services/blogs'
import axios from "axios"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState([])



  if(!blog) {
    return null
  }

  useEffect(() => {
    axios.get(`http://localhost:3003/api/blogs/${blog.id}/comments`).then((response) => {
      console.log('Comments: ', response.data)
      setComments(response.data)
    }
    )
  },[])

  const clickLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const clickRemoveBlog = () =>{
    // event.preventDefault()
    const blogId = blog.id
    // const blogUser = blog.user.username
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(deleteBlog(blogId))
    }

  }

  // blog.user.name = blog.user.name ? blog.user.name : ''
  // blog.user ??= ''
  // blog.user.name ??= ''


return (
  <div className='blog-container'>
    <h1>{blog.title} by {blog.author}</h1>
    <div>
      <p className="url">{blog.url}</p>
      <div className="likes">
        likes {blog.likes}
        <button onClick={clickLike} className='like-button'>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      <button onClick={clickRemoveBlog} >remove</button>
    </div>
    <div>
      <h3>comments</h3>
        <ul>
        {comments.map(comment => <li key={comment.content}>{comment.content}</li>)}
        </ul>
    </div>
  </div>  
)
}

export default Blog