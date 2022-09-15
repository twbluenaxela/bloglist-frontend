import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  if(!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom:5
  }

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


  </div>  
)
}

export default Blog