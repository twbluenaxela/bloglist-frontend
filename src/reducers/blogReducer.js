import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const initialState = null

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const { appendBlog } = blogSlice.actions

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer