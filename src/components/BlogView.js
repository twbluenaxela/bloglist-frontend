import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { createBlog, deleteBlog } from "../reducers/blogReducer";

const BlogView = () => {

    const blogFormRef = useRef();
    const dispatch = useDispatch();
  
    const user = useSelector((state) => {
        return state.login;
      });

  const removeBlog = async (blogId, blogUser) => {
    // console.log('User ', user)
    // console.log('App side user.username', user.username)
    // console.log('Blog element side ', blogUser)
    if (user.username === blogUser) {
      // await blogService.remove(blogId)
      dispatch(deleteBlog(blogId));
      // setBlogs(blogs.filter((blog) => blog.id !== blogId))
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    // setBlogs.concat(blog)
    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.concat(returnedBlog))
    //   })
  };

  return (
    <div>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
      {<BlogList removeBlog={removeBlog} />}
    </div>
  );
};

export default BlogView;
