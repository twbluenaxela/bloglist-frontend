import { createSlice } from '@reduxjs/toolkit'
const initialState = null
let notificationTimer = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayMessage(state, action) {
            const message = action.payload
            if (message) {
                state = message
            }
            return state
        },
        removeMessage(state, action) {
            state = null
            return null
        }
    }
})

export const setNotification = ({ message, timer }) => {
    return async dispatch => {
        if (notificationTimer) {
            clearTimeout(notificationTimer)
        }

        dispatch(displayMessage(message))
        notificationTimer = setInterval(() => {
            dispatch(removeMessage())
        }, timer * 1000)
    }
}

export const { displayMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer