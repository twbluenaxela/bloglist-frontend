import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  console.log('Blogs, ',blogs)

  const handleDelete = async (event) => {

  }

  return (
    <div>
      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} deleteBlog={handleDelete} />
      ))}
    </div>
  );
};

export default BlogList