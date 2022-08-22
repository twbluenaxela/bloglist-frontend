import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, removeBlog }) => {
  console.log('Blogs, ',blogs)

  const addLike = async (blog, likeCount) => {
    const blogId = blog.id
    await blogService.update(blogId, {...blog, likes: likeCount + 1})
    console.log('Added a like!')
  }

  return (
    <div>
      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} deleteBlog={removeBlog} addLike={addLike} />
      ))}
    </div>
  );
};

export default BlogList