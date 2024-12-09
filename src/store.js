import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Slices/UserSlice'
import { chatSlice } from './Slices/ChatSlice'


export default configureStore({
    reducer: {
        userInfo: userSlice.reducer,
        chatMsg: chatSlice.reducer
    },
})
