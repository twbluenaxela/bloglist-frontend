import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayMessage, setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({})
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    const title = newBlog.title
    setNewBlog('')
    dispatch(setNotification({ message: `${title} successfully added`, timer: 3 }))
    // dispatch(setNotification(`))
    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }

  return(
    <div>
      <form onSubmit={addBlog} >
        <h2>create new</h2>
        <div>
        title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            className="title"
            onChange={handleChange}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            className="author"
            onChange={handleChange}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            className="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="create" >create</button>
      </form>

    </div>
  )
}

export default BlogForm