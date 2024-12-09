import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        value: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    },
    reducers: {
        userData: (state, action) => {
            state.value = action.payload
        },
    },
})


export const { userData } = userSlice.actions

export default userSlice.reducer
