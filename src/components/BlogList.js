import Blog from './Blog'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'

const BlogList = ({ blogs, removeBlog }) => {
  const [blogList, setBlogList] = useState([...blogs])
  useEffect(() => {
    // const fetchBlogs = () => {
    //     if(blogs){
    //       let sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    //       setBlogList(sortedBlogs)
    //     }
    // }
    // fetchBlogs()
    if(blogs) {
      let sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
      setBlogList(sortedBlogs)
    }
  },[])

  // useMemo(() => )
  // console.log('Blogs, ',blogs)

  // let sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  // console.log('Sorted blogs', sortedBlogs)


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
      {blogList
        .map((blog) => (
          <Blog key={blog.id} blog={blog} deleteBlog={removeBlog} addLike={addLike} />
        ))}
    </div>
  )
}

export default BlogList