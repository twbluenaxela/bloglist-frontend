import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import './index.css'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  if(type === 'error'){
    return <div className="error">{message}</div>;
  }else if (type === 'success'){
    return <div className="success">{message}</div>
  }
  
};

const BlogForm = ({
  newBlog, 
  blogs, 
  setBlogs, 
  setNewBlog, 
  user,
  message,
  setMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    console.log('creating new blog...', title, author, url);
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })
      blogService.setToken(user.token)
      setBlogs(blogs.concat(blog))
      setNewBlog('')
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);

    } catch (exception) {
      setMessage('Error creating blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    
  }

  return(
    <form onSubmit={createBlog} >
      {message !== "" && <Notification message={message} type={'success'} />}
      <h2>create new</h2>
      <div>
        title: 
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: 
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  message,
  setMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBloglistappUser",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {message !== "" && <Notification message={message} type={'error'} />}
      <h1>login</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // },[])

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
      <BlogForm
      newBlog={newBlog}
      blogs={blogs}
      setBlogs={setBlogs}
      setNewBlog={setNewBlog}
      user={user}
      message={message}
      setMessage={setMessage}
        />
      <BlogList blogs={blogs} user={user} />
    </div>
  );
};

export default App;
