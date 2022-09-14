import Blog from './Blog'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const BlogList = ({ removeBlog }) => {
  // const [blogList, setBlogList] = useState([...blogs])
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return [...state.blogs]
  })
  // useEffect(() => {
  //   if(blogs) {
  //     let sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  //     dispatch(initializeBlogs())
  //     // setBlogList(sortedBlogs)
  //   }
  // },[])

  const addLike = async (blog, likeCount) => {
    const blogId = blog.id

    const blogIndex = blogList.findIndex(blog => blog.id === blogId)
    //TODO, make it update on the client side after its finished updating on the backend.
    await blogService.update(blogId, { ...blog, likes: likeCount + 1 })
    console.log('Added a like!')
    blogList[blogIndex].likes = likeCount + 1
    console.log('Updated blog', blogList[blogIndex])
    const resorted = [...blogList].sort((a,b) => b.likes - a.likes)
    setBlogList(resorted)
    // sortedBlogs = resorted
    // console.log('Checking if sortedblogs was updated...', sortedBlogs)
  }


  return (
    <div>
      {blogs
        .map((blog) => (
          <Blog key={blog.id} blog={blog} deleteBlog={removeBlog} addLike={addLike} />
        ))}
    </div>
  )
}

export default BlogList