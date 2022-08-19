import { useState } from "react"
import blogService from '../services/blogs'

// const BlogExtraInfo = ({url, likes, user}) => (
//   <div>
//     <p>{url}</p>
//     <p>{likes}</p>
//     <p>{user}</p>
//   </div>
// )

const Blog = ({ blog }) => {
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
    </div>
    : '' }

  </div>  
)
}

export default Blog