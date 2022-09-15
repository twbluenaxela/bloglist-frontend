import Blog from "./Blog";
import blogService from "../services/blogs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const BlogList = ({ removeBlog }) => {
  // const [blogList, setBlogList] = useState([...blogs])
  const dispatch = useDispatch();
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });
  // useEffect(() => {
  //   if(blogs) {
  //     let sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  //     dispatch(initializeBlogs())
  //     // setBlogList(sortedBlogs)
  //   }
  // },[])

  // const addLike = async (blog) => {
  //   const blogId = blog.id
  //   dispatch(likeBlog(blogId))

  //   // const blogIndex = blogs.findIndex(blog => blog.id === blogId)
  //   // //TODO, make it update on the client side after its finished updating on the backend.
  //   // await blogService.update(blogId, { ...blog, likes: likeCount + 1 })
  //   // console.log('Added a like!')
  //   // blogs[blogIndex].likes = likeCount + 1
  //   // console.log('Updated blog', blogs[blogIndex])
  //   // const resorted = [...blogs].sort((a,b) => b.likes - a.likes)
  //   // setBlogList(resorted)
  //   // sortedBlogs = resorted
  //   // console.log('Checking if sortedblogs was updated...', sortedBlogs)
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
