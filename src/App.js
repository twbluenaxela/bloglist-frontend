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
  useMatch,
} from "react-router-dom";
import Users from "./components/Users";
import BlogView from "./components/BlogView";
import axios from "axios";
import User from "./components/User";

const App = () => {
  // const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    axios.get("http://localhost:3003/api/users").then((response) => {
      console.log("Users: ", response.data);
      setUsers(response.data);
    });
  }, []);

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
      if (parsedUser !== null) {
        blogService.setToken(parsedUser.token);
      }
    }
  }, []);

  const match = useMatch("/users/:id");
  console.log("Match: ", match);
  // console.log("Users have been set in app: ", users);
  const matchedUser = match
    ? users.find((u) => u.id === match.params.id)
    : null;
  console.log("Matched user: ", matchedUser);

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
      <h2>blogs</h2>
      <Notification />
      <p>{user !== null ? user.name : loggedUser.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<BlogView />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </div>
  );
};

export default App;
