import React, { useEffect } from 'react'
import User from '../Components/User/User'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {

    //Navigation
    const navigate = useNavigate();

    const user = useSelector((state) => state.userInfo.value);

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
    }, [user]);

    return (
        <>
            <User />
        </>
    )
}

export default Home
