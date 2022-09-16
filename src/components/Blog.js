import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { createComment, fetchComments } from '../reducers/commentReducer'

const Blog = ({ blog }) => {
  if(!blog) {
    return null
  }


  const [comment, setComment] = useState('')
  // const [comments, setComments] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    // axios.get(`http://localhost:3003/api/blogs/${blog.id}/comments`).then((response) => {
    //   console.log('Comments: ', response.data)
    //   setComments(response.data)
    // }
    // )
    dispatch(fetchComments(blog.id))
  },[])

  const comments = useSelector((state) => {
    return [...state.comments].filter(c => {
      console.log('Store: comments blog id ', c.blog.id)
      console.log('Blog ids', blog.id)
      return (c.blog.id ? c.blog.id : c.blog) === blog.id
    })
  })
  console.log('Comments: ', comments)

  const clickLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const clickRemoveBlog = () => {
    // event.preventDefault()
    const blogId = blog.id
    // const blogUser = blog.user.username
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(deleteBlog(blogId))
    }

  }

  // const handleChange = (event) => {
  //   const value = event.target.value
  //   setComment(value)
  // }

  const addAComment = async (event) => {
    event.preventDefault()

    if(comment){
      // const commentObj = {
      //   content: comment
      // }
      dispatch(createComment(comment, blog.id))
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
        <form onSubmit={addAComment}>
          <input type="text" value={comment} name='comment' onChange={({ target }) => setComment(target.value)} />
          <button type='submit'>add</button>
        </form>
        <ul>
          {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog