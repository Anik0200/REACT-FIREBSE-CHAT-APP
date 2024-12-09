import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUsersSlash } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCheck } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import './NavOne.css';

function NavOne() {

    //Navigation
    const navigate = useNavigate();

    //Redux
    const user = useSelector((state) => state.userInfo.value);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }


    return (
        <>
            <nav className='NavOne'>

                <div className="btns">
                    <Link to={'/allusers'} className='btn'>
                        <FaUserCheck />
                    </Link>

                    <Link to={'/frndReq'} className='btn'>
                        <FaUserPlus />
                    </Link>

                    <Link to={'/firends'} className='btn'>
                        <BsFillPeopleFill />
                    </Link>

                    <Link className='btn'>
                        <div className="main">
                            <img src={user?.photoURL} alt="" />
                        </div>
                    </Link>

                    <Link to={'/blocked'} className='btn'>
                        <FaUsersSlash />
                    </Link>

                    <Link to={'/message'} className='btn'>
                        <RiMessage3Fill />
                    </Link>

                    <button onClick={handleLogout} className='btn'>
                        <IoLogOut />
                    </button>
                </div>

            </nav>
        </>
    )
}

export default NavOne
