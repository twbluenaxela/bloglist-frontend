import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = `${baseUrl}/${id}`
  const response = await axios.put(blogUrl, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const like = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = `${baseUrl}/${id}`
  const request = await axios.get(`${baseUrl}/${id}`, config)
  const blogToVoteOn = request.data
  console.log('Blog to like:', blogToVoteOn)
  const updatedBlog= { ...blogToVoteOn, likes: blogToVoteOn.likes + 1 }
  console.log('Updated blog: ', updatedBlog)
  const response = await axios.put(blogUrl, updatedBlog, config)
  return response.data

}

export default { getAll, setToken, create, update, remove, like }