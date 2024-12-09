import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import app from './firebase.config'
import { ToastContainer, toast } from 'react-toastify';
import Home from './Pages/Home'
import LayOuteOne from './LayOuts/LayOuteOne'
import AllUserPage from './Pages/AllUserPage'
import FrndReqPage from './Pages/FrndReqPage'
import AllFriendsPage from './Pages/AllFriendsPage'
import AllBlockedUser from './Pages/AllBlockedUSer'
import MessagePage from './Pages/MessagePage'


function App() {

    const route = createBrowserRouter(createRoutesFromElements(
        <Route>

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<LayOuteOne />} >
                <Route index element={<Home />} />
                <Route path='/allusers' element={<AllUserPage />} />
                <Route path='/frndReq' element={<FrndReqPage />} />
                <Route path='/firends' element={<AllFriendsPage />} />
                <Route path='/blocked' element={<AllBlockedUser />} />
                <Route path='/message' element={<MessagePage />} />
            </Route>

        </Route>
    ))

    return (
        <>
            <RouterProvider router={route} />
            <ToastContainer />
        </>
    )
}

export default App
