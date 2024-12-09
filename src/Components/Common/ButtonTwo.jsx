import React from 'react'

const ButtonTwo = ({ ButtonTwoText, ButtonTwoClick }) => {
    return (
        <>
            <div>
                <button onClick={ButtonTwoClick} className='py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-5 text-[12px] lg:text-[15px]

                         rounded-md bg-red-400 text-gray-600 hover:scale-105 hover:text-white duration-500'>

                    {ButtonTwoText}
                </button>
            </div>
        </>
    )
}

export default ButtonTwo
