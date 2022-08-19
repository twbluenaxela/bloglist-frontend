import { useState } from "react"
import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({})
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
      const value = event.target.value;
      setNewBlog({
        ...newBlog,
        [event.target.name]: value
      })
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog('')
        // setTitle('')
        // setAuthor('')
        // setUrl('')
    }

    return(
        <div>
            <form onSubmit={addBlog} >
      {message !== "" && <Notification message={message} type={'success'} />}
      <h2>create new</h2>
      <div>
        title: 
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author: 
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url: 
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>

        </div>
    )
}

export default BlogForm