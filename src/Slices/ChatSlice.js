import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chatMsg',
    initialState: {
        value: localStorage.getItem('chatMsg') ? JSON.parse(localStorage.getItem('chatMsg')) : null,
    },
    reducers: {
        chatData: (state, action) => {
            state.value = action.payload
        },
    },
})


export const { chatData } = chatSlice.actions

export default chatSlice.reducer
