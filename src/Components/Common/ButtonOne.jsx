import React from 'react'

function ButtonOne({ ButtonOneText, ButtonOneClick }) {
    return (
        <>
            <div>
                <button onClick={ButtonOneClick} className='py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-5 text-[12px] lg:text-[15px]

                        rounded-md bg-primary text-gray-600 hover:scale-105 hover:text-white duration-500'>

                    {ButtonOneText}
                </button>
            </div>
        </>
    )
}

export default ButtonOne
