import React from 'react'
import NavOne from '../Components/Nav/NavOne'
import { Outlet } from 'react-router-dom'

export default function () {
    return (
        <>
            <NavOne />
            <Outlet />
        </>
    )
}
