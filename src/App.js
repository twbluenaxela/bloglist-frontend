import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from "./components/BlogForm";
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from "./services/blogs";
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef()

  // const addBlog = async (blogObject) => {
  //   // event.preventDefault()
  //   blogFormRef.current.toggleVisibility()
  //   console.log('creating new blog...', title, author, url);
  //   try {

  //     const blog = await blogService.create({
  //       title,
  //       author,
  //       url
  //     })
  //     blogService.setToken(user.token)
  //     setBlogs(blogs.concat(blog))
  //     setNewBlog('')
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     setMessage(`a new blog ${blog.title} by ${blog.author} added`);
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);

  //   } catch (exception) {
  //     setMessage('Error creating blog')
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 5000)
  //   }
    
  // }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <Toggleable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm
      createBlog={addBlog}
        />
      </Toggleable>
      <BlogList blogs={blogs}/>
      
    </div>
  );
};

export default App;
