import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
} from "./reducers/blogReducer";
import { logout } from "./reducers/loginReducer";
import "./index.css";
import {
  Routes,
  Route,
  useMatch,
  Navigate,
  Link
} from "react-router-dom";
import Users from "./components/Users";
import BlogView from "./components/BlogView";
import axios from "axios";
import User from "./components/User";
import { Navbar, Nav } from "react-bootstrap";

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
  const blogs = useSelector((state) => {
    return state.blogs
  })

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
  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch 
  ? blogs.find((b) => b.id === blogMatch.params.id)
  : null;
  console.log('Matched blog', matchedBlog);

  const padding = {
    padding: 5
  }

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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Toggle aria-controls='responsive-navbar-var' />
        <Navbar.Collapse id='responsive-navbar-nav' >
          <Nav className="me-auto" >
            <Nav.Link href='#' as="span" >
            <Link to="/" style={padding} >blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as="span" >
            <Link to='/users' style={padding} >users</Link>
            </Nav.Link>
            <Nav.Link href='#' as="span" >
            <p>{user !== null ? user.name : loggedUser.name} logged in</p>
            </Nav.Link>
            <Nav.Link href='#' as="span" >
            <button onClick={handleLogout}>logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        
      </div>
      <h2>blog app</h2>
      <Notification />
      
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<BlogView />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path='/blogs/:id' element={<Blog blog={matchedBlog} />} />
      </Routes>
    </div>
  );
};

export default App;
