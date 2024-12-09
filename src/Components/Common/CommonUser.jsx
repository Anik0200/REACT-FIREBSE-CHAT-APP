import React from 'react'

function CommonUser({ userImage, userName }) {
    return (
        <>
            <div className="flex gap-5 items-center">

                <div className="w-[35px] h-[35px]  md:w-[40px] md:h-[40px]  lg:w-[50px] lg:h-[50px]

                     overflow-hidden bg-gray-300 border-2 border-primary rounded-full">
                    <img src={userImage} alt="" />
                </div>

                <h2 className='text-[18px] md:text-xl  lg:text-2xl font-medium text-gray-500 first-letter:capitalize'>
                    {userName}
                </h2>
            </div>
        </>
    )
}

export default CommonUser
