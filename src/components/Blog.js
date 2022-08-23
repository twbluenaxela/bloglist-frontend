import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog, addLike }) => {
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

  // const addLike = async () => {
  //   const blogId = blog.id
  //   await blogService.update(blogId, {...blog, likes: likeCount + 1})
  //   setLikeCount(likeCount + 1)
  //   console.log('Added a like!')
  // }

  const likeBlog = async(event) => {
    event.preventDefault()
    await addLike(blog, likeCount)
    setLikeCount(likeCount + 1)
  }

  const removeBlog = async (event) =>{
    event.preventDefault()
    const blogId = blog.id
    const blogUser = blog.user.username
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await deleteBlog(blogId, blogUser)
    }

  }

  // blog.user.name = blog.user.name ? blog.user.name : ''
  blog.user ??= ''
  blog.user.name ??= ''


return (
  <div style={blogStyle} className='blog-container'>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility} className='view-button'>view</button>
    { visible 
    ? 
    <div>
      <p className="url">{blog.url}</p>
      <div className="likes">
        likes {likeCount}
        <button onClick={likeBlog}>like</button>
      </div>
      <p>{blog.user.name}</p>
      <button onClick={removeBlog} >remove</button>
    </div>
    : '' }

  </div>  
)
}

export default Blog