import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likeCount, setLikeCount] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom:5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const blogId = blog.id
    await blogService.update(blogId, {...blog, likes: likeCount + 1})
    setLikeCount(likeCount + 1)
    console.log('Added a like!')
  }

  const removeBlog = async (event) =>{
    event.preventDefault()
    const blogId = blog.id
    const blogUser = blog.user.name
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await deleteBlog(blogId, blogUser)
    }

  }

  // blog.user.name = blog.user.name ? blog.user.name : ''
  blog.user ??= ''
  blog.user.name ??= ''


return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>view</button>
    { visible 
    ? 
    <div>
      <p>{blog.url}</p>
      <div>
        likes {likeCount}
        <button onClick={addLike}>like</button>
      </div>
      <p>{blog.user.name}</p>
      <button onClick={removeBlog} >remove</button>
    </div>
    : '' }

  </div>  
)
}

export default Blog