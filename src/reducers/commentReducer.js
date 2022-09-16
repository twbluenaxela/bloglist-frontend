import { createSlice } from "@reduxjs/toolkit";
import commentService from '../services/comments'

const initialState = []

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        appendComment(state, action) {
            console.log('Append comment payload ', action.payload)
            state.push(action.payload)
            // console.log('Appended comment. ', state)
            return state
        },
        setComments(state, action) {
            return action.payload
        },
    }
})

export const { appendComment, setComments } = commentSlice.actions

export const createComment = (comment, id) => {
    return async dispatch => {
        const commentObject = {
            content: comment
        }
        const newComment = await commentService.addComment(commentObject, id)
        console.log('New comment reducer side: ', newComment)
        
        dispatch(appendComment(newComment))
    }
}

export const fetchComments = (id) => {
    return async dispatch => {
        const comments = await commentService.getComments(id)
        dispatch(setComments(comments))

    }
}

export default commentSlice.reducer