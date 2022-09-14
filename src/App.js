import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { createBlog, initializeBlogs, deleteBlog } from './reducers/blogReducer'
import './index.css'


const App = () => {
  // const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    // setBlogs.concat(blog)
    // blogService 
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.concat(returnedBlog))
    //   })
  }


  const removeBlog = async (blogId, blogUser) => {
    // console.log('User ', user)
    // console.log('App side user.username', user.username)
    // console.log('Blog element side ', blogUser)
    if(user.username === blogUser){
      // await blogService.remove(blogId)
      dispatch(deleteBlog(blogId))
      // setBlogs(blogs.filter((blog) => blog.id !== blogId))
    }

  }



  useEffect(() => {
    dispatch(initializeBlogs())
    // blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  if (user === null) {
    return (
      <div>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          message={message}
          setMessage={setMessage}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Toggleable>
      {<BlogList removeBlog={removeBlog}/>}

    </div>
  )
}

export default App
