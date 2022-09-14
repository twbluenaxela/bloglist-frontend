import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const initialState = []

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
            return state
        },
        setBlogs(state, action) {
            return action.payload
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter((blog) => blog.id !== id)
        }
    }
})

export const { appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export default blogSlice.reducer