import React from 'react'
import './User.css';
import { useSelector } from 'react-redux';

export default function User() {

    const user = useSelector((state) => state.userInfo.value);


    return (
        <>
            <section className="group-main">
                <div className="group shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">

                    <div className="logo overflow-hidden">
                        <img src={user?.photoURL} className='w-full h-full' />
                    </div>

                    <div className="z-10 group-hover:-translate-y-10 transition-all duration-500 mb-[50px]">
                        <span className="text-1xl md:text-2xl font-semibold">{user?.displayName}</span>
                        <p className='text-sm md:text-[18px]'>{user?.email}</p>
                    </div>

                </div>

            </section>
        </>
    )
}
