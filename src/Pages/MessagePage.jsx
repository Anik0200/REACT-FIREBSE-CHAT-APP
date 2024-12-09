import React, { useState } from 'react'
import MsgBox from '../Components/MsgBox/MsgBox'
import MsgSideBar from '../Components/MsgSideBar/MsgSideBar'

const MessagePage = () => {
    return (
        <>
            <div className="flex">
                <MsgSideBar />
                <MsgBox />
            </div>
        </>
    )
}

export default MessagePage
