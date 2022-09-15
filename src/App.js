import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  initializeBlogs,
  deleteBlog,
} from "./reducers/blogReducer";
import { logout } from "./reducers/loginReducer";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Users from "./components/Users";
import BlogView from "./components/BlogView";

const App = () => {
  // const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [user, setUser] = useState(null)

  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.login;
  });

  const loggedUserJSON = window.localStorage.getItem("loggedBloglistappUser");
  // console.log('Current logged user: ', loggedUserJSON)
  let loggedUser;
  if (loggedUserJSON !== null) {
    loggedUser = JSON.parse(loggedUserJSON);
  }

  // if(user){
  // window.localStorage.setItem(
  //   'loggedBloglistappUser',
  //   JSON.stringify(user)
  // )
  // blogService.setToken(user.token)
  // }



  

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    // blogService.getAll().then((blogs) => setBlogs(blogs))
  }, []);

  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    // console.log('Logged user JSON', loggedUserJSON)
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      console.log("Parsed user", parsedUser);
      // setUser(user)
      if (parsedUser !== null) {
        blogService.setToken(parsedUser.token);
      }
    }
  }, []);

  if (user === null && !loggedUser) {
    return (
      <div>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
          setMessage={setMessage}
        />
        {}
      </div>
    );
  }

  return (
    <div>
      <Router>
        <h2>blogs</h2>
        <Notification />
        <p>{user !== null ? user.name : loggedUser.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<BlogView />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
